# AEM Backend Developer Training

A self-contained training site for onboarding junior backend developers onto Adobe Experience Manager. No build step, no dependencies — plain HTML/CSS/JS, ready to host on GitHub Pages.

## The project structure used throughout

Every code example in this curriculum gives the exact, full file path a trainee should create it at, assuming an AEM project checked out as `/aem-academy` from the standard Maven Project Archetype:

```
/aem-academy                    [academy-base-project-component]
├── all                          [academy.all]
├── core                         [academy.core]            ← all Java
├── ui.apps                      [academy.ui.apps]          ← components, dialogs, HTL
├── ui.apps.structure            [academy.ui.apps.structure] ← template structure/policies (not used in exercises)
├── ui.config                    [academy.ui.config]        ← OSGi config as .cfg.json
├── ui.content                   [academy.ui.content]       ← sample/seed content
└── ui.frontend                  [academy.ui.frontend]      ← webpack clientlib build (not used in exercises)
```

Module 00 (Java Primer) introduces this in full under "Before you start," and every later module's code blocks carry the complete path (e.g. `/aem-academy/core/src/main/java/biz/netcentric/academy/components/weather/WeatherModel.java`) plus the Maven module it belongs to in brackets, rather than a bare filename or an abbreviated path. If your own checkout uses a different root folder name, mentally substitute it everywhere.

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
  05-osgi-services-config.html      written — reference cardinality, immediate components, run-mode config
  06-sling-models.html              written
  07-sling-models-advanced.html     written — adaptation internals, constructor injection, Resource vs. Request
  08-model-composition.html         written — @Via(type = ResourceSuperType.class), extending Core Components
  09-htl-templating.html            written
  10-servlets-apis.html             written
  11-dialogs-components.html        written — component anatomy, dialogs, and the full author-activation walkthrough
  12-custom-components.html         written — Image Metadata + Weather components, full Maven paths
  13-java-pitfalls.html             written
  14-unit-testing.html              written — JUnit, Mockito, AEM Mocks
  15-context-aware-config.html      written
  16-workflows-events.html          written
  17-workflow-design.html           written
  18-sling-jobs.html                written
  19-dispatcher-deployment.html     written
  20-groovy-console.html            written
  21-acs-commons.html               written
  module-template.html              starting point for module 22 and beyond
assets/
  java-primer-slides.pptx           condensed slide deck (34 slides, down from 74), linked from module 00
```

All 22 modules (00 through 21) are written as one continuous curriculum — there's no longer a separate "fundamentals" vs. "advanced" split. Each topic's deeper-dive module sits immediately next to its introductory counterpart (Sling Models → Sling Models In Depth → Extending Core Component Models, OSGi Services → OSGi Services & Configuration, Workflows → Workflow Design, and so on), so a learner moving straight through 00→21 in order gets fundamentals and advanced practice interleaved rather than fundamentals first and advanced topics tacked on at the end. `modules/module-template.html` has step-by-step comments at the top for adding a 22nd-and-beyond module if you extend the curriculum further.

The visual theme follows Bootstrap 5 (loaded from the jsDelivr CDN in each page's `<head>`): a dark navbar-style topbar, Bootstrap's primary blue as the accent color, `alert`/`badge`/`card`/`btn`/`form-check` utility classes layered onto the site's existing custom components, and Bootstrap's default border-radius and system font stack. `styles.css` still owns layout (the JCR-tree sidebar, content width, code blocks) and loads after the Bootstrap CDN link so it can theme Bootstrap's components without needing a Sass build.

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
- **Fonts**: body text and UI chrome use a system font stack (matching Bootstrap 5's default), so there's no webfont to fail to load there. Headings still use Space Grotesk and code blocks use IBM Plex Mono, both loaded from Google Fonts via CDN — if your organization blocks external font CDNs, swap those two `<link>` tags in each page's `<head>` for self-hosted font files, or drop them entirely to fall back to the system stack everywhere.
- **Adding/editing content** is plain HTML editing — there's no CMS. Each module page is self-contained and uses a small set of reusable classes (`.callout`, `.learn-box`, `.try-it`, `.knowledge-check`, `pre[data-code]` for copyable code blocks) defined in `styles.css`.
- **Knowledge Check** is a 10-question trainer quiz at the end of every module, right before "Mark this module as complete." Each answer is hidden behind a native `<details>/<summary>` toggle (no JavaScript needed) so a trainer can ask the question, let students answer, then click "Show answer" to reveal it — useful for live sessions without giving the answer away on screen-share.
