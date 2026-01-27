# FiberiseFit - Wellness E-Commerce Platform

## Project Overview

**FiberiseFit** is a modern, production-ready e-commerce platform built with Next.js 14, designed specifically for the wellness and health supplement industry. The platform integrates Firebase Authentication for secure phone-based OTP login and Shopify Storefront API for seamless product management and checkout. The application provides a comprehensive shopping experience with a focus on science-backed wellness products, featuring educational content, product showcases, and a streamlined checkout process.

---

## Current Features

### 🔐 Authentication & User Management
- **Firebase Phone OTP Authentication**
  - Phone number-based login with OTP verification
  - Default +91 country code for Indian market
  - Secure session management with Firebase Auth
  - Global authentication state management via React Context
  - Automatic user profile creation in Firestore
  - System email generation: `${firebaseUid}@fiberisefit.com`

### 🛍️ E-Commerce Functionality
- **Product Catalog**
  - Dynamic product fetching from Shopify Storefront API
  - Product listings with images, prices, and availability
  - Product detail pages with variant selection
  - Image galleries with thumbnail navigation
  - Product search and filtering capabilities

- **Shopping Cart**
  - Zustand-based cart state management
  - Add/remove items functionality
  - Quantity updates
  - Cart drawer with slide-out UI
  - Real-time cart total calculations
  - Cart persistence across sessions

- **Checkout Integration**
  - Shopify guest checkout integration
  - Firebase UID and system email injection into cart attributes
  - Secure checkout URL generation
  - Seamless redirect to Shopify hosted checkout
  - No Shopify account required for customers

### 📦 Order Management
- **Order History**
  - User-specific order retrieval from Shopify Admin API
  - Order filtering by Firebase UID and email
  - Order status tracking (fulfilled, pending, etc.)
  - Order details with items, quantities, and totals
  - Financial status display

### 🎨 User Interface & Design
- **Responsive Design**
  - Mobile-first approach with Tailwind CSS
  - Frosty glassmorphism navbar with scroll effects
  - Smooth animations with Framer Motion
  - Modern, clean aesthetic with wellness-focused branding

- **Homepage Sections**
  - Hero section with call-to-action
  - Featured products carousel
  - Meditation and wellness imagery
  - Video sections for product demonstrations
  - Reels/social media integration
  - Image-text storytelling sections
  - Journey and ritual sections
  - Energy reset content
  - Empowering messaging
  - Blog section
  - Full-width video sections
  - Testimonial carousel

- **Dedicated Pages**
  - **Science Page**: Educational content about product benefits
    - Cravings control information
    - Glucose management
    - Metabolism insights
    - SCFA (Short-Chain Fatty Acids) education
    - Prebiotic/Probiotic information
    - Gut barrier health
    - Benefits grid
    - Science-backed trust indicators

  - **LYTE Page**: Health tracking app showcase
    - Hero section
    - Product showcase
    - Four pillars feature (Nutrition, Calories, Sleep, SpO2)
    - App preview sections
    - Nutrition tracking details
    - Calorie leisure tracking
    - Comparison sections
    - Privacy policy page

  - **Contact Page**: Customer support and contact information
  - **Account Page**: User dashboard with order history

### 🔧 Technical Architecture
- **Frontend**
  - Next.js 14 (App Router)
  - TypeScript for type safety
  - React 18 with Server Components
  - Zustand for global state management
  - Tailwind CSS for styling
  - Framer Motion for animations
  - Lucide React for icons

- **Backend**
  - Next.js API Routes
  - Firebase Admin SDK for server-side operations
  - Firestore for user data storage
  - Shopify Storefront API integration
  - Shopify Admin API for order management

- **Security**
  - Firebase token verification on all protected routes
  - Secure API key management via environment variables
  - No exposed Shopify tokens in frontend
  - Server-side only Shopify API calls

---

## Tech Stack

### Core Framework
- **Next.js 14.2.35** - React framework with App Router
- **TypeScript 5.3.3** - Type-safe development
- **React 18.2.0** - UI library

### Styling & UI
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Framer Motion 10.16.16** - Animation library
- **GSAP 3.14.2** - Advanced animations
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### State Management
- **Zustand 4.4.7** - Lightweight state management

### Backend Services
- **Firebase 12.8.0** - Authentication and database
- **Firebase Admin 13.6.0** - Server-side Firebase operations
- **Shopify Storefront API** - Product catalog and cart management
- **Shopify Admin API** - Order management

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## Architecture

### File Structure
```
wellness/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── checkout/     # Checkout creation
│   │   ├── orders/       # Order history
│   │   ├── shopify/      # Shopify integration
│   │   └── user/         # User management
│   ├── account/          # User account page
│   ├── products/         # Product detail pages
│   ├── science/          # Science education page
│   ├── lyte/             # LYTE app showcase
│   └── contact/          # Contact page
├── components/            # React components
│   ├── sections/         # Page sections
│   ├── pages/            # Full page components
│   └── ui/               # UI primitives
├── contexts/             # React contexts
├── lib/                  # Utility libraries
│   ├── firebase/         # Firebase config
│   └── shopify/          # Shopify client
├── store/                # Zustand stores
└── public/               # Static assets
```

### Data Flow
1. **Authentication Flow**
   - User enters phone number → Firebase sends OTP → User verifies OTP → Firebase session created → Backend API creates/updates user profile in Firestore

2. **Shopping Flow**
   - Browse products → Add to cart (Zustand store) → Click checkout → Backend creates Shopify cart → Redirects to Shopify checkout → Order placed → Order synced to Firestore

3. **Order Retrieval**
   - User visits account page → Frontend requests orders with Firebase token → Backend verifies token → Fetches orders from Shopify Admin API → Filters by user's Firebase UID → Returns orders to frontend

---

## Upcoming Features

### 🚀 Phase 1: Enhanced User Experience
- [ ] **Wishlist Functionality**
  - Save favorite products for later
  - Quick add to cart from wishlist
  - Share wishlist with friends/family

- [ ] **Product Reviews & Ratings**
  - Customer review system
  - Star ratings display
  - Review moderation
  - Helpful/not helpful voting

- [ ] **Advanced Product Filtering**
  - Filter by price range
  - Filter by product category
  - Filter by benefits (e.g., gut health, metabolism)
  - Sort by price, popularity, newest

- [ ] **Product Recommendations**
  - "You may also like" suggestions
  - Recently viewed products
  - Personalized recommendations based on order history
  - Bundle deals and product combinations

### 📱 Phase 2: Mobile App Integration
- [ ] **Progressive Web App (PWA)**
  - Offline functionality
  - Push notifications for order updates
  - Add to home screen
  - App-like experience on mobile

- [ ] **LYTE App Deep Linking**
  - Direct links from website to LYTE app features
  - Shared authentication between web and app
  - Sync health data with product recommendations

### 💳 Phase 3: Payment & Checkout Enhancements
- [ ] **Multiple Payment Methods**
  - Razorpay integration for Indian market
  - UPI payment support
  - Wallet integration
  - EMI options

- [ ] **Saved Payment Methods**
  - Secure payment method storage
  - Quick checkout with saved cards
  - Payment method management in account

- [ ] **Checkout Optimization**
  - One-page checkout
  - Guest checkout improvements
  - Address autocomplete
  - Delivery time selection

### 📊 Phase 4: Analytics & Insights
- [ ] **Admin Dashboard**
  - Sales analytics and reporting
  - User behavior tracking
  - Product performance metrics
  - Order fulfillment tracking

- [ ] **Customer Analytics**
  - Order history analytics
  - Product recommendations based on purchase patterns
  - Health goal tracking integration
  - Progress visualization

### 🔔 Phase 5: Communication & Engagement
- [ ] **Email Notifications**
  - Order confirmation emails
  - Shipping updates
  - Delivery notifications
  - Abandoned cart reminders
  - Product restock alerts

- [ ] **SMS Notifications**
  - OTP delivery (already implemented)
  - Order status updates
  - Delivery notifications
  - Promotional messages (opt-in)

- [ ] **Push Notifications**
  - Browser push notifications
  - Order status updates
  - New product launches
  - Special offers and discounts

### 🎯 Phase 6: Personalization
- [ ] **User Profiles**
  - Health goals setting
  - Dietary preferences
  - Allergies and restrictions
  - Personalized product recommendations

- [ ] **Subscription Management**
  - Subscribe & save functionality
  - Auto-reorder subscriptions
  - Subscription management dashboard
  - Flexible delivery schedules

- [ ] **Loyalty Program**
  - Points system for purchases
  - Rewards and discounts
  - Referral program
  - VIP member benefits

### 📚 Phase 7: Content & Education
- [ ] **Blog System**
  - Wellness articles and guides
  - Product usage instructions
  - Customer success stories
  - Expert interviews

- [ ] **Video Content**
  - Product demonstration videos
  - Educational content library
  - Customer testimonials
  - How-to guides

- [ ] **Interactive Tools**
  - Health assessment quiz
  - Product recommendation tool
  - Dosage calculator
  - Progress tracker

### 🛠️ Phase 8: Technical Improvements
- [ ] **Performance Optimization**
  - Image optimization and lazy loading
  - Code splitting improvements
  - Caching strategies
  - CDN integration

- [ ] **SEO Enhancements**
  - Meta tags optimization
  - Structured data (Schema.org)
  - Sitemap generation
  - Open Graph tags

- [ ] **Accessibility**
  - WCAG 2.1 compliance
  - Screen reader optimization
  - Keyboard navigation improvements
  - Color contrast enhancements

- [ ] **Internationalization**
  - Multi-language support
  - Currency conversion
  - Regional product availability
  - Localized content

### 🔒 Phase 9: Security & Compliance
- [ ] **Enhanced Security**
  - Rate limiting on API routes
  - CSRF protection
  - XSS prevention
  - Security headers configuration

- [ ] **Compliance**
  - GDPR compliance
  - Data privacy controls
  - Cookie consent management
  - Terms of service and privacy policy pages

### 📦 Phase 10: Inventory & Fulfillment
- [ ] **Inventory Management**
  - Real-time stock updates
  - Low stock alerts
  - Backorder management
  - Pre-order functionality

- [ ] **Shipping Enhancements**
  - Multiple shipping options
  - Shipping calculator
  - Delivery date selection
  - Package tracking integration

- [ ] **Returns & Refunds**
  - Return request system
  - Refund processing
  - Return tracking
  - Exchange options

---

## Environment Variables Required

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin (Server-side only)
FIREBASE_SERVICE_ACCOUNT_KEY=

# Shopify Configuration
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=
NEXT_PUBLIC_SHOPIFY_SHOP_DOMAIN=
NEXT_PUBLIC_SHOPIFY_API_VERSION=

# Shopify Admin (Optional - for order management)
SHOPIFY_ADMIN_ACCESS_TOKEN=
```

---

## Deployment

The application is configured for production deployment with:
- Static page generation for optimal performance
- Dynamic API routes for real-time data
- Environment variable management
- Build optimization
- Error handling and logging

### Build Commands
```bash
npm run build    # Production build
npm start        # Start production server
npm run dev      # Development server
```

---

## Project Status

✅ **Production Ready** - Core features implemented and tested
🚧 **In Development** - Additional features being planned and implemented
📋 **Planned** - Features listed in upcoming phases

---

## Support & Documentation

- **Shopify Setup**: See `SHOPIFY_SETUP.md`
- **GST/Tax Configuration**: See `SHOPIFY_GST_REMOVAL.md`
- **API Documentation**: Inline comments in API routes
- **Component Documentation**: Component files include usage examples

---

*Last Updated: January 2025*
