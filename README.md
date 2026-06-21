# PixMorphy Trends

PixMorphy Trends is a Hindi and Hinglish blog website focused on AI tools, tech updates, viral topics, online earning, and how-to guides for Indian users.

The current build includes:
- Mobile-first homepage with featured stories and category sections
- SEO-friendly blog article pages
- Author and trust pages
- Structured data support for articles and FAQs
- Ready-to-deploy Next.js app

## Live Project Structure

- Homepage: [`src/app/page.tsx`](./src/app/page.tsx)
- Blog article template: [`src/app/blog/[slug]/page.tsx`](./src/app/blog/%5Bslug%5D/page.tsx)
- Shared components: [`src/components`](./src/components)
- Content data: [`src/data/content.ts`](./src/data/content.ts)
- Static blog images: [`public/images/blog`](./public/images/blog)

## Local Development

Install dependencies:

```bash
npm install
```

Start the local server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Useful commands:

```bash
npm run lint
npm run build
```

## Deploy to Vercel

### Option 1: Deploy from GitHub

1. Push the latest code to GitHub
2. Open the Vercel dashboard
3. Click `Add New...` → `Project`
4. Import the GitHub repository: `Rajat0323/PixMorphy-Trends`
5. Keep the default production branch as `main`
6. Confirm the framework preset is detected automatically
7. Click `Deploy`

After that:
- Every push to `main` will update production
- Future branch pushes can generate preview deployments

### Option 2: Deploy with Vercel CLI

```bash
npm i -g vercel
vercel
```

For production deployment:

```bash
vercel --prod
```

## Recommended Vercel Project Settings

For this project, keep these defaults unless you have a reason to change them:

- Framework Preset: `Next.js`
- Root Directory: project root
- Build Command: `next build`
- Install Command: `npm install`
- Output Directory: auto-detected by Vercel
- Production Branch: `main`

If you later add secrets or APIs, configure them in:

- Vercel Dashboard → Project → Settings → Environment Variables

Important env variable:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Use your final Vercel domain or custom domain here so metadata, sitemap and logo URLs point to the correct live site.

## Custom Domain Setup

After the first successful deployment:

1. Open your project in Vercel
2. Go to `Settings` → `Domains`
3. Click `Add Domain`
4. Enter your domain, for example:
   - `pixmorphy.in`
   - `www.pixmorphy.in`
5. Follow the DNS instructions shown by Vercel
6. Wait for verification to complete

Recommended setup:

- Add both apex and `www`
- Set one as primary
- Redirect the other to the primary domain

Example:
- Primary: `www.pixmorphy.in`
- Redirect: `pixmorphy.in` → `www.pixmorphy.in`

## Production Checklist

Before going live, verify:

- Homepage loads correctly on mobile and desktop
- All blog cards open the correct article
- Featured images render properly
- `npm run lint` passes
- `npm run build` passes
- Title and meta description are correct
- Blog URLs are clean and readable
- About and Contact pages are accessible
- Sitemap is available at `/sitemap.xml`
- Robots file is available at `/robots.txt`
- No placeholder emails or fake content remain
- All social/profile/contact links are real
- Custom domain is verified
- SSL is active on the domain
- Google Search Console property is added
- Google Analytics 4 is connected
- Favicon and brand assets are final
- Ad placements do not break mobile reading

## Post-Launch Setup

After deployment, complete these launch tasks:

1. Add the production site to Google Search Console
2. Submit the sitemap
3. Google Analytics 4 is already wired with measurement ID `G-MV8BT8T3J1`
4. Connect Microsoft Clarity if you want UX recordings
5. Set up AdSense or your ad provider
6. Replace demo content with real publishing workflow data
7. Add a proper privacy policy, disclaimer, and corrections policy

## Google Search Console Sitemap

After deployment, submit this URL in Google Search Console:

```text
https://your-domain.com/sitemap.xml
```

Examples:
- `https://www.pixmorphy.in/sitemap.xml`
- `https://pix-morphy-trends.vercel.app/sitemap.xml`
- `https://yourcustomdomain.com/sitemap.xml`

This project already includes:
- `robots.txt`
- `sitemap.xml`
- Organization logo metadata
- favicon and app icons
- Google Analytics snippet

## Current Sample Blog Topics

- WhatsApp New Update 2026: Yeh 5 Hidden Features Aapko Shock Kar Denge!
- Top 7 AI Tools Jo Aapki Life Change Kar Denge: Free Aur Powerful Picks
- Instagram Algorithm 2026: Reels Viral Kaise Kare Without Guesswork
- ChatGPT se Paise Kaise Kamaye 2026: Beginner Friendly Real Methods

## Official References

- [Vercel: Deploying GitHub Projects](https://vercel.com/docs/git/vercel-for-github)
- [Vercel: Add and Configure a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Vercel: Project Configuration](https://vercel.com/docs/project-configuration)

Notes from Vercel docs:
- Vercel automatically deploys connected GitHub projects and creates preview deployments for changes
- When adding an apex domain, Vercel recommends also adding the `www` subdomain
- Framework preset and project settings can be managed from Vercel project configuration
