# ChangeKit Setup Guide

Hey! This is your personal guide for setting up and deploying ChangeKit. Follow these steps to get your app live and monetized.

## 1. Deploy to Vercel

- Go to [vercel.com](https://vercel.com), sign in with GitHub.
- Click **"Add New Project"** → import `Laviesss/ChangeKit`.
- Leave all settings default, click **Deploy**.
- Copy the live URL once deployed (e.g., `changekit.vercel.app`).

## 2. Set up Lemon Squeezy

- Go to [lemonsqueezy.com](https://lemonsqueezy.com) and create a free account.
- Create a new **Store**.
- Create a **Product** → type: "Single payment" → price: **$4.99**.
- Go to the product's checkout page and copy the checkout URL.
- Paste it into `src/utils/config.js` as `LEMON_SQUEEZY_URL`.
- In Lemon Squeezy dashboard → **Settings** → **Redirects** → set success URL to: `https://your-vercel-url.vercel.app/?pro=activated`

## 3. Set up Google AdSense

- Go to [adsense.google.com](https://adsense.google.com) and apply with your Vercel URL.
- Once approved, create ad units and copy the AdSense script tag.
- Replace the `<AdPlaceholder />` components in the code with real AdSense units.
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

**Note:** No backend or database is required. Everything runs in the browser, and payments/ads are handled by external services.
