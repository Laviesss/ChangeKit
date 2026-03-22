# Platform Migration Notes

The /api/verify.js function works on:

## Vercel (current)
- Works out of the box
- Add PAYHIP_API_KEY in Vercel dashboard → Settings → Environment Variables

## Netlify
- Rename /api to /netlify/functions
- Add PAYHIP_API_KEY in Netlify dashboard → Site Settings → Environment Variables

## Cloudflare Workers
- Wrap in Cloudflare format: export default { async fetch(request, env) { ... } }
- Use env.PAYHIP_API_KEY instead of process.env.PAYHIP_API_KEY
- Add secret via Cloudflare dashboard → Workers → Settings → Variables
