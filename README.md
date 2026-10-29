# Prafful Katta — Build Notes

A React, TypeScript, and Vite portfolio about engineering projects, system decisions, and learning through building.

## Run locally

```powershell
npm install
npm run dev
```

Create and preview a production build:

```powershell
npm run build
npm run preview
```

The site does not require environment variables, a database, an AI provider, or a backend. Deploy the generated `dist/` directory to a static host.

## Design and interaction

The reference site invites visitors to either participate in a hand dataset or browse its entries. This portfolio adapts that project-led participation principle as an original, keyboard- and touch-operable system trace: visitors select a project and inspect a component. It does not reuse the reference's hand imagery, layout, or branding.

The visual system uses a warm paper ground, dark green-black text, a single blue interaction accent, Space Grotesk display type, IBM Plex Sans body text, and DM Mono for technical labels. Motion is limited to interface state changes and respects reduced-motion preferences.

## Project evidence

Project facts and architecture notes live in `src/content.ts`. The MediStock and browser IDE records reflect only the supplied project brief; their source repositories and assets were not included in this workspace. The trace diagram labels its paths as unverified, and the IDE record explicitly warns that code execution isolation is not verified. The Cloud and DevOps entry is a planned learning direction, not a completed project.

No verified experiment log entries, résumé, GitHub URL, contact details, screenshots, live demos, or deployment evidence were supplied. The site says so instead of inventing them.

## Accessibility

The page uses semantic sections, keyboard-operable controls, visible focus, a skip link, touch-friendly project selectors, and reduced-motion support. System font fallbacks remain available if Google Fonts cannot load.
