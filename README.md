# ChangeKit Setup Guide

Hey! This is your personal guide for setting up and deploying ChangeKit. Follow these steps to get your app live and monetized.

## 1. Deploy to Vercel

- Go to [vercel.com](https://vercel.com), sign in with GitHub.
- Click **"Add New Project"** → import `Laviesss/ChangeKit`.
- Leave all settings default, click **Deploy**.
- Copy the live URL once deployed (e.g., `changekit.vercel.app`).

## 2. Set up Payhip (Payments)

- Go to [payhip.com](https://payhip.com) and create a free account.
- Create a new **Product** → type: "Software" or "Digital Product" → price: **$4.99**.
- Ensure you enable "License Keys" for the product.
- Copy the product page URL.
- Paste it into `src/utils/config.js` as `PAYHIP_PRODUCT_URL`.
- In Payhip dashboard → **Account** → **Settings** → **Developer** → copy your **API Key**.
- In Vercel dashboard → ChangeKit project → **Settings** → **Environment Variables** → add:
    - **Key:** `PAYHIP_API_KEY`
    - **Value:** (your Payhip API key)
    - **Environment:** Production + Preview + Development
- **Note:** The API key is now securely handled by the `/api/verify.js` serverless function and is never exposed to the frontend.

## 3. Set up Google AdSense

- Go to [adsense.google.com](https://adsense.google.com) and apply with your Vercel URL.
- Once approved, create ad units and copy the AdSense client ID and slot IDs.
- Update `src/utils/config.js` with `ADSENSE_CLIENT_ID`, `ADSENSE_SLOT_LEADERBOARD`, and `ADSENSE_SLOT_RECTANGLE`.
- Set `ADSENSE_ENABLED = true` in `src/utils/config.js` to go live with ads.
- **Note:** AdSense approval can take days to weeks — apply early.

## 4. Set up Buy Me a Coffee

- Go to [buymeacoffee.com](https://buymeacoffee.com) and create a free account.
- Copy your profile URL.
- Paste it into `src/utils/config.js` as `DONATE_URL`.

## 5. Custom domain (optional)

- Buy a domain (Namecheap recommended — cheap).
- In Vercel dashboard → your project → **Settings** → **Domains** → add your domain.
- Follow Vercel's DNS instructions.

## 6. Going private

- Once live and everything is working, go to [github.com/Laviesss/ChangeKit](https://github.com/Laviesss/ChangeKit) → **Settings** → **Danger Zone** → **Change visibility** → **Private**.

---

**Note:** No backend or database is required. Everything runs in the browser, and payments/ads are handled by external services. For technical details on the license verification, see `PLATFORM_NOTES.md`.
