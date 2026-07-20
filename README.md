# Brandon Fonville — Creative Studio (Website Concept)

A single-page website concept for **Brandon Fonville Creative Studio**:
Product Design • Graphic Design • Brand Visuals.

Content is sourced directly from the two studio documents, which are also
linked for download inside the site.

## Run it

No build step. Either:

```bash
# open directly
open index.html

# or serve locally (recommended so the PDF links work)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
brandon-fonville-studio/
├── index.html
├── styles.css
├── script.js
├── favicon.ico
├── favicon-32.png
├── apple-touch-icon.png
├── og-image.jpg          # social link preview (1200×630)
├── og-image.png
├── .gitignore
├── assets/
│   ├── *.pdf
│   └── work/             # work-*.webp (+ .png fallback)
└── README.md
```

## Sections

1. **Hero**: tagline, headline, key stats, scrolling skills marquee
2. **About**: bio plus "I specialize in" card plus downloadable About Me PDF
3. **Services**: Brand & Graphic, Product, Content & Digital
4. **Work**: selected-work gallery (sample mockups, masonry layout)
5. **Packages**: all 5 packages with pricing (Product Launch featured)
6. **Add-ons**: pricing table plus downloadable services & pricing PDF
7. **Process**: 4-step working method
8. **Contact**: project-request form wired to Formspree

## Light / dark theme

A toggle (☾ / ☀) lives in the header. It respects the visitor's system
preference on first visit and remembers their choice via `localStorage`
(key: `bfc-theme`). No setup required.

## Contact form (Formspree — live)

The form is connected to the live Formspree endpoint
`https://formspree.io/f/xwvjkpva` (set in the form `action` in `index.html`).

This uses the **Vanilla JS / AJAX** approach, where submissions are sent via `fetch`
(no page reload), with:

- inline success / error states styled to match the site,
- a disabled button while sending,
- a honeypot (`_gotcha`) anti-spam field,
- a custom email subject line.

> **First-time activation:** Formspree sends a one-time confirmation email to
> the form owner on the very first submission. Confirm it once and the form is
> fully active.
>
> To change the destination, edit the `action` URL in `index.html`. The same
> markup also works with Getform, Basin, or Web3Forms.

## Selected work / portfolio

The gallery is populated with **sample mockup images** in `assets/work/`
(`work-identity.png`, `work-phonecase.png`, etc.). To swap in real projects,
just replace those files (keep the same names) or update the `src` on each
`<img class="work-img">` in `index.html` and edit the captions.

## Going live (deployment)

This is a plain static site (HTML/CSS/JS) with no build step, so it can be hosted
free almost anywhere. Recommended options, easiest first:

### Option A — Netlify Drop (fastest, ~1 minute, no account commands)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole `brandon-fonville-studio` folder onto the page.
3. It deploys instantly to a `*.netlify.app` URL. Done.

To update later, drag the folder again (or connect a Git repo for auto-deploys).

### Option B — GitHub Pages (free, version-controlled)

From the project folder (the repo is ready to init, so run these in Terminal):

```bash
cd ~/Projects/brandon-fonville-studio
git init
git add .
git commit -m "Launch-ready Brandon Fonville Creative Studio site"
# Create an empty repo at github.com, then:
git branch -M main
git remote add origin https://github.com/<your-username>/brandon-fonville-studio.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: `main` / root → Save**.
Your site goes live at `https://<you>.github.io/brandon-fonville-studio/`.

### Option C — Vercel or Cloudflare Pages

Install the CLI (`npm i -g vercel`) and run `vercel` in the folder, or connect
the Git repo in the Vercel / Cloudflare Pages dashboard. Framework preset:
**Other / None**, build command: none, output dir: the project root.

### Custom domain

All three providers let you add a custom domain (e.g. `brandonfonville.com`)
under their domain settings. Point your domain's DNS to their nameservers or
add the CNAME/A records they show you.

## Before launching — checklist

- [x] Formspree form connected (confirm the activation email once).
- [x] Gallery has sample mockups (swap for real client work when ready).
- [x] Favicon, Apple touch icon, and Open Graph image (`og-image.png`) in the site root.
- [x] Gallery served as WebP with PNG fallback (~95% smaller than originals).
- [ ] After deploy: set `og:url` and change `og:image` / `twitter:image` to your **full live URL** (required for link previews on social apps).
- [ ] Add real contact details / social links in the footer.
- [ ] Push to GitHub and enable Pages (see **Going live** above), or use Netlify Drop.
