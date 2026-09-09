# Nock-Website

The public Nock landing page — a zero-dependency, single-page static site.

> This repository contains only the website. The Nock desktop application lives in
> [Ism-ail-code/Nock](https://github.com/Ism-ail-code/Nock), and its Windows
> installers are published as GitHub Releases on that repository.

## Structure

- `index.html` — the entire site (design, copy, inline CSS/SVG, and the release config script)
- `og.png` — Open Graph share image (1200x630)
- No build step, no framework, no external assets, no API calls

## Run locally

The site is a plain static page — no dependencies required:

```bash
# Option 1: just open it
start index.html

# Option 2: serve it over HTTP
npx serve .
```

## Build

There is nothing to build. Deploy the repository contents as-is.

## Updating the download links for a new release

All release URLs are derived in one place, the `NOCK_RELEASE` config at the
bottom of `index.html`:

```js
const NOCK_RELEASE = {
  version: '1.2.4',
  repo: 'Ism-ail-code/Nock',
};
```

For the next release, change `version` to the new version (e.g. `'1.3.0'`).
The installer, portable build, version pill and meta line all update
automatically — the URLs point directly at the GitHub release assets
(`?download=1`), so the Download button never redirects to the release page.

If the release tag does not follow the `v<version>` convention, set `tag`
explicitly (e.g. `tag: 'Nock_v1.3.0'`). When omitted it defaults to
`'v' + version`.

## Deploy to Vercel

1. Push this repository to GitHub (e.g. `Ism-ail-code/Nock-Website`)
2. In Vercel: **Add New Project** → import the repository
3. Settings: Framework Preset **Other** (auto-detected as static); no build
   command, no install command, no environment variables are needed
4. Deploy

Alternative: `npx vercel` from this folder, then `npx vercel --prod`.

After deployment, update the `og:url` meta tag in `index.html` (currently
`https://nock.app/`) to the real domain.