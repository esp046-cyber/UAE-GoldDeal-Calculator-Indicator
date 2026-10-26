# UAE GoldDeal Calculator & Indicator (PWA)

Compares global gold spot (USD/oz) with UAE retail prices (AED/g) and shows whether gold is a good buy, fairly priced, or overpriced.

## Run locally
    npx serve . -l 3000     # or: npm start
Service workers need HTTPS or localhost.

## Deploy
Upload this folder to Netlify, Vercel or GitHub Pages. No build step.

## Before going live
1. Replace `https://yourdomain.com/` in `index.html`, `robots.txt` and `sitemap.xml`.
2. `og-image.png` (1200x630) is in the site root; the OG tags point to it once you set your domain.
3. Add screenshots to `screenshots/` and list them in `manifest.json`.

## Notes
- Prices are entered manually. `api/`, `backend/`, `database/`, `config/` are placeholders for a future live feed; see `.env.example`.
- Estimates only, not financial advice.
- Test: `npm test`. Formulas: `docs/FORMULAS.md`.
