# AEM Backend Developer Training

A self-contained training site for onboarding junior backend developers onto Adobe Experience Manager. No build step, no dependencies — plain HTML/CSS/JS, ready to host on GitHub Pages.

## What's in here

```
index.html                          curriculum overview / homepage
styles.css                          shared styles (design tokens at the top)
script.js                           progress tracking, mobile nav, copy buttons
modules/
  00-java-primer.html               written — condensed Java refresher + 5 AEM-runnable exercises
  01-architecture-overview.html     written
  02-jcr-repository.html            written
  03-sling-framework.html           written
  04-osgi-services.html             written
  module-template.html              starting point for modules 05-10
assets/
  java-primer-slides.pptx           condensed slide deck (34 slides, down from 74), linked from module 00
```

Modules 5–10 (Sling Models, HTL, Servlets & APIs, Dialogs & Components, Workflows, Dispatcher) are listed in the curriculum as "coming soon" but not yet written. `modules/module-template.html` has step-by-step comments at the top explaining exactly what to edit to add a new one.

## Deploy to GitHub Pages

1. Create a new repository on GitHub (or use an existing one).
2. Push these files to it:
   ```
   git init
   git add .
   git commit -m "Initial AEM training site"
   git branch -M main
   git remote add origin https://github.com/<your-org>/<your-repo>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to "Deploy from a branch".
5. Set **Branch** to `main` and the folder to `/ (root)`, then **Save**.
6. GitHub will publish the site at `https://<your-org>.github.io/<your-repo>/` within a minute or two (check the Pages settings page for the exact URL and deployment status).

No further configuration is needed — there's no build process, so whatever's on the selected branch is exactly what gets served.

## Notes

- **Progress tracking** uses the browser's `localStorage`, per visitor, per browser. It is not shared between people or devices — there's no backend. If you later want team-wide progress tracking, that would need a small server or a service like a shared database, which isn't included here.
- **Fonts** (Space Grotesk, Inter, IBM Plex Mono) load from Google Fonts via CDN — if your organization blocks external font CDNs, swap the `<link>` tags in each page's `<head>` for self-hosted font files instead.
- **Adding/editing content** is plain HTML editing — there's no CMS. Each module page is self-contained and uses a small set of reusable classes (`.callout`, `.learn-box`, `.try-it`, `pre[data-code]` for copyable code blocks) defined in `styles.css`.
