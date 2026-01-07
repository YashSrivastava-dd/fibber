# Shopify Integration Setup Guide

This guide will help you connect your Next.js application to your Shopify store.

## Prerequisites

- Shopify store: `fiberisefit.myshopify.com`
- Storefront API access token
- Node.js and npm installed

## Step 1: Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# Shopify Storefront API Configuration
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=b620796941f3bb348573d29d88323031
NEXT_PUBLIC_SHOPIFY_SHOP_DOMAIN=fiberisefit.myshopify.com
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-01
```

**Important**: The `.env.local` file is already in `.gitignore` and will not be committed to version control.

## Step 2: Verify Shopify Configuration

The Shopify configuration is located in:
- `lib/shopify/config.ts` - Main configuration file
- `lib/shopify/queries.ts` - GraphQL queries
- `lib/shopify/client.ts` - API client functions

## Step 3: API Routes

The following API routes are available:

- `GET /api/shopify/products` - Fetch all products
  - Query params: `first` (number), `after` (cursor)
- `GET /api/shopify/product/[handle]` - Fetch single product by handle
- `GET /api/shopify/collections/[handle]` - Fetch collection products
  - Query params: `first` (number), `after` (cursor)

## Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000` and check the browser console for any errors

3. The Featured Products section should now display products from your Shopify store

4. Visit `/collections/all` to see all products

5. Click on any product to view its details

## Step 5: Collection Setup

To use collections, make sure you have collections set up in your Shopify admin:

1. Go to Shopify Admin → Products → Collections
2. Create collections or use existing ones
3. The collection handle (URL slug) will be used in the URL
   - Example: Collection "All Products" with handle "all-products" → `/collections/all-products`

## Troubleshooting

### Products not showing?

1. Check browser console for errors
2. Verify your Storefront API token is correct
3. Ensure your Shopify store has products published
4. Check network tab to see if API requests are being made

### API Errors?

1. Verify the Storefront API token has the correct permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`

2. Check that your Shopify store is active and accessible

### Images not loading?

- Shopify images are served via CDN and should work automatically
- If images don't load, check the product image URLs in the Shopify admin

## Next Steps

- [ ] Set up cart functionality with Shopify Cart API
- [ ] Implement checkout flow
- [ ] Add product search functionality
- [ ] Set up webhooks for order processing
- [ ] Add customer authentication

## Support

For Shopify API documentation, visit:
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [GraphQL Admin API](https://shopify.dev/docs/api/admin-graphql)

