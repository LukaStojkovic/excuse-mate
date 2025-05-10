import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/app/libs/prismadb";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const userSubscription = await prisma.userSubscription.findFirst({
      where: {
        userId,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return NextResponse.json({
        url: stripeSession.url,
      });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card", "paypal"],
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Excuse Mate Pro",
              description: "Unlimited access to all features",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return NextResponse.json({
      url: stripeSession.url,
    });
  } catch (err) {
    console.log("Stripe ERROR", err);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
