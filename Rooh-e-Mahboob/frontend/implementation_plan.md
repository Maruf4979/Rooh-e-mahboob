# Integration Plan: Full-Stack E-commerce (Database, Auth, Payments)

This plan outlines the steps to transform "Sidra Attar Wala" from a frontend-focused application using static data into a fully functional, production-ready e-commerce platform.

## Proposed Tech Stack

1.  **Database & ORM**: **PostgreSQL** + **Prisma ORM**. Prisma provides excellent type safety with TypeScript and makes database migrations seamless. (Recommended DB host: Supabase, Neon, or Vercel Postgres).
2.  **Authentication**: **Auth.js (NextAuth.js)**. The industry standard for Next.js applications. It integrates natively with Prisma to store users and sessions.
3.  **Payments**: **Stripe**. We will use Stripe Checkout for secure payment processing and Stripe Webhooks to securely update order statuses in our database.
4.  **Global State (Cart)**: **Zustand**. A lightweight, fast state management library ideal for handling the shopping cart across the application without the heavy boilerplate of Redux.

---

> [!IMPORTANT]
> ## User Review Required
> Please review the chosen tech stack and the phases below. Integrating these features will require setting up external accounts (Stripe, a Database provider, and Google Cloud for Auth).

> [!NOTE]
> ## Open Questions
> 1.  **Authentication**: Do you prefer allowing users to sign in via Google/social accounts, or do you require traditional Email/Password login? (OAuth like Google is highly recommended for security and less friction).
> 2.  **Database Hosting**: Do you have a preference for where to host the PostgreSQL database? (I recommend **Supabase** or **Neon** as they have great free tiers for development).
> 3.  **Admin Panel**: Do you want an admin dashboard built to manage products and view orders, or should we focus solely on the customer-facing side first?

---

## Proposed Changes & Phases

### Phase 1: Database Foundation (Prisma & PostgreSQL)
*   Initialize Prisma in the project (`npx prisma init`).
*   Design the Database Schema (`schema.prisma`):
    *   **User**: For authentication.
    *   **Product**: To replace `app/data/products.ts`. Will include fields like `name`, `price`, `description`, `category`, `stock`, `images`.
    *   **Order** & **OrderItem**: To track customer purchases and link them to Stripe transaction IDs.
*   Write a seed script to migrate your existing mock data from `products.ts` into the real database.

### Phase 2: Global Cart State (Zustand)
*   Install `zustand`.
*   Create a global `useCartStore` hook to handle:
    *   Adding/removing items.
    *   Adjusting quantities.
    *   Calculating totals.
    *   Persisting the cart in `localStorage` so users don't lose items when they refresh.

### Phase 3: Authentication (Auth.js)
*   Install `next-auth` and `@auth/prisma-adapter`.
*   Configure NextAuth in the App Router (`app/api/auth/[...nextauth]/route.ts`).
*   Create UI components for Sign In / Sign Out, and update the Header to show the user's profile icon when logged in.
*   Protect specific routes (like `/checkout` or `/profile`) so only logged-in users can access them.

### Phase 4: Payment Integration (Stripe)
*   Install `stripe` (backend) and `@stripe/stripe-js` (frontend).
*   Create an API route (`/api/checkout_sessions`) that reads the user's cart and creates a secure Stripe Checkout Session.
*   Create a Webhook endpoint (`/api/webhooks/stripe`) to listen for successful payments from Stripe and automatically update the `Order` status in the database to "Paid".

### Phase 5: UI & Data Integration
*   Replace static imports of `products.ts` with Prisma queries in Server Components (e.g., `const products = await prisma.product.findMany()`).
*   Build the Checkout page that connects the Cart, User Auth, and the Stripe Checkout button.
*   Build a "My Orders" page for users to view their past purchases.

---

## Verification Plan

### Automated/Local Testing
*   Verify Prisma migrations run successfully and data is seeded.
*   Test Auth.js locally using mock providers or a test Google OAuth client.
*   Use the Stripe CLI to forward webhooks to the local development server to test successful and failed payment flows.

### Manual Verification
*   User can browse products fetched from the DB.
*   User can add items to the cart, and the cart persists on reload.
*   User can log in/out.
*   User can proceed to Stripe checkout in test mode, complete a test payment, and see the order status update in the database.
