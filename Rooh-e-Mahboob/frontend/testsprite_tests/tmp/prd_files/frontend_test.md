# Product Requirements Document (PRD) - Sidra Attar E-commerce Testing

## 1. Product Purpose
Sidra Attar is a premium e-commerce web application specializing in high-end fragrances. The platform provides a modern, "glassmorphism"-inspired, and high-contrast user interface tailored for luxury shopping. It aims to offer a seamless, secure, and intuitive end-to-end purchasing experience—from browsing products and user authentication to managing profiles, tracking orders, and completing checkouts with multiple payment options.

## 2. Target Audience
- Customers looking to purchase premium attars/fragrances online.
- Users who value a polished, secure, and visually appealing shopping experience.

## 3. Key Features to Test

### 3.1 Authentication & Authorization
- **Sign-up & Sign-in Forms:** Validate email/password registration and login flows.
- **Google OAuth Integration:** Ensure seamless login using third-party Google credentials.
- **UI Adjustments:** Verify that the main site header and footer are completely hidden on authentication pages to maintain the focused premium design.
- **Protected Routes:** Ensure unauthorized users are redirected appropriately when attempting to access the checkout or account management pages.

### 3.2 User Profile Management
- **Profile Picture Uploads:** Test integration with InsForge storage bucket. Ensure users can upload, preview, and update their profile pictures.
- **Account Details:** Verify that users can view and update their personal information accurately.
- **Order History:** Ensure users can access a comprehensive list of their past orders with correct status and details.

### 3.3 Shopping & Product Discovery
- **Product Grid:** Verify that products load correctly on the home page and category routes, with accurate pricing and high-quality images.
- **Information Architecture:** Test the "About Us" page (Mission and Vision) for accessibility via both the desktop header and mobile hamburger menu.
- **UI/UX Consistency:** Ensure high-contrast text and icons are used across the application. Verify responsive behavior and smooth micro-animations.

### 3.4 Checkout & Order Management
- **Cart Functionality:** Add/remove items, update quantities, and calculate totals accurately.
- **Payment Methods:** Test multiple payment flows including Cash on Delivery (COD), UPI, and Credit/Debit Cards.
- **Order Synchronization:** Verify that orders are correctly recorded in the Supabase PostgreSQL database.
- **Visual Status Tracking:** Ensure the user is presented with a clear visual confirmation and status tracker upon successful order placement.

## 4. How It Should Work (Testing Scenarios)

1. **Guest Browsing Flow:** 
   - A user lands on the home page.
   - Browses the product grid.
   - Clicks on the hamburger menu (mobile) or header (desktop) to read the "About Us" page.
   - Adds an item to the cart and attempts to checkout.
   - System prompts the user to log in or register.

2. **Authentication Flow:**
   - User navigates to the sign-in page. The header and footer should not be visible.
   - User successfully logs in via Google OAuth.
   - User is redirected back to the checkout process or home page.

3. **Profile Management Flow:**
   - Logged-in user navigates to their profile page.
   - User uploads a new profile picture. System saves it securely in the InsForge bucket and updates the UI instantly.
   - User views past order history (if any).

4. **Checkout & Payment Flow:**
   - User proceeds to the checkout page with items in the cart.
   - User selects 'UPI' as the payment method and completes the transaction.
   - System displays an order confirmation page with a visual tracker.
   - Database (Supabase) correctly reflects the new order with all relevant details (user ID, items, total, status, payment method).
