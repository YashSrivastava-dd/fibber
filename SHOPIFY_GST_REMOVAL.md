# How to Remove GST/Tax from Shopify Checkout

Since the checkout happens on Shopify's hosted checkout page, GST/tax settings are controlled in your Shopify admin, not in the code.

## Steps to Remove GST/Tax:

### Option 1: Disable Tax Collection (Recommended)

1. Go to [Shopify Admin](https://admin.shopify.com/)
2. Navigate to **Settings** → **Taxes and duties**
3. Under **Tax collection**, you can:
   - **Disable tax collection** for all regions
   - Or set tax rates to **0%** for specific regions

### Option 2: Set Tax-Exempt Products

1. Go to **Products** in Shopify Admin
2. Select a product
3. Scroll to **Pricing**
4. Check **Charge taxes on this product** to **uncheck** it
5. Save

### Option 3: Use Tax Overrides

1. Go to **Settings** → **Taxes and duties**
2. Click **Manage tax rates**
3. Set tax rates to **0%** for all regions/countries

### Option 4: Use Tax-Exempt Customer Tags

1. Go to **Settings** → **Taxes and duties**
2. Under **Tax exemptions**, you can:
   - Set up automatic tax exemptions
   - Or manually mark customers as tax-exempt

## Important Notes:

- **GST/Tax is calculated by Shopify**, not by our code
- The checkout page is hosted by Shopify, so we can't modify it directly
- Changes must be made in Shopify Admin
- After making changes, test the checkout flow to verify GST is removed

## Current Implementation:

- Our cart drawer shows: "Shipping and discounts calculated at checkout" (GST/tax mention removed)
- The actual checkout happens on Shopify's page
- GST/tax display is controlled by Shopify's tax settings

## Verification:

After making changes in Shopify:
1. Add items to cart
2. Click "Checkout"
3. On Shopify checkout page, verify GST/tax is not shown
4. Complete a test order to confirm
