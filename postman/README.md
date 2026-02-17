# Postman – FiberiseFit Production

**File:** `FiberiseFit-Production.postman_collection.json`  
**Base URL:** `https://fiberisefit.com`

## Import

Postman → **Import** → select `FiberiseFit-Production.postman_collection.json`.

## Variables (Edit in collection → Variables)

| Variable           | Example / use |
|--------------------|---------------|
| `baseUrl`          | `https://fiberisefit.com` (set by default) |
| `firebaseIdToken`  | Only for folders marked "login required" |
| `orderNumber`      | e.g. `1021` for invoice/tracking |
| `webhookSecret`    | Optional; same as Shiprocket webhook Token |
| `productHandle`    | e.g. `7-day-pack`, `30-day-pack`, `lyte` |
| `collectionHandle` | e.g. `all` |

## Folders (all endpoints)

### No login needed

- **Shopify (no login)** – Get products, Get product by handle, Get collection, Get orders (admin list)
- **Contact & Newsletter** – Contact form, Newsletter subscribe
- **Tracking webhook** – POST tracking webhook (Shiprocket)
- **Auth** – Login, Register, Logout
- **Checkout** – Checkout branding

### Login required (set `firebaseIdToken`)

- **User** – Get profile, Update profile
- **Orders** – Get my orders
- **Shiprocket** – Get invoice URL, Get tracking
- **Checkout create** – Create checkout

## Quick test (no login)

1. Import the collection.
2. Open **Shopify (no login)** → **Get products** → Send.
3. Or **Get product by handle** (uses variable `productHandle`, default `7-day-pack`) → Send.
