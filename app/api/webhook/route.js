import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import prisma from "@/app/libs/prismadb";

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (!session?.metadata?.userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    try {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription
      );

      await prisma.userSubscription.create({
        data: {
          userId: session.metadata.userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            new Date(subscription.start_date * 1000).setMonth(
              new Date(subscription.start_date * 1000).getMonth() + 1
            )
          ),
        },
      });
    } catch (err) {
      console.error("Error creating subscription:", err);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object;

    if (!invoice.subscription) {
      console.warn("No subscription found on invoice:", invoice.id);
      return NextResponse.json({}, { status: 200 });
    }

    try {
      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription
      );

      await prisma.userSubscription.update({
        where: { stripeSubscriptionId: subscription.id },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            new Date(subscription.start_date * 1000).setMonth(
              new Date(subscription.start_date * 1000).getMonth() + 1
            )
          ),
        },
      });
    } catch (err) {
      console.error("Error updating subscription:", err);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({}, { status: 200 });
}
