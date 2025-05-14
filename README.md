# Excuse Mate 🙈

**Excuse Mate** is your ultimate AI-powered assistant for generating creative, humorous, or believable excuses. Whether you're late to a meeting, forgot to reply, or just need a clever reason — Excuse Mate has your back.

---

## 🚀 Features

- 🎭 Multiple tone options: funny, serious, passive-aggressive, and more
- 🗂️ Categories for all situations: work, school, relationships, etc.
- ✨ AI-generated excuses tailored to your message
- 🏆 Premium plan with advanced excuse crafting
- 🌙 Clean UI with dark mode support

---

## 💻 Tech Stack

- **Frontend:** React, Next.js, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API Routes, Prisma, MongoDB, Clerk
- **AI:** Gemini API
- **Payments:** Stripe integration for subscriptions

---

## 🧪 Test Subscription

To test the **Pro plan subscription**, use the following test credit card in the Stripe checkout:

4242 4242 4242 4242
MM/YY: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits

> ⚠️ This card is for **test mode only** and **won’t charge real money**.

---

## 📦 Installation

```bash
git clone https://github.com/LukaStojkovic/excuse-mate.git
cd excuse-mate
npm install
npm run dev
```

## Environment Variables Example

DATABASE_URL=your_mongo_connection_string
OPENAI_API_KEY=your_openai_key
NEXTAUTH_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
