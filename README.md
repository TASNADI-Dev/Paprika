# Paprika

Website for [Paprika Advertising](https://www.paprika-advertising.com/). English and French. Content is edited in Sanity; the studio lives at `/admin`.

## Stack

- **Astro** + **TypeScript**
- **Tailwind CSS**
- **React** (Sanity Studio)
- **Sanity** (CMS)
- **GSAP** (motion)
- **FormSubmit** (quote form)
- **Cloudflare R2** (assets)
- **Cloudflare Pages** (hosting)
- **Node.js** 22+

## Setup

```sh
cp .env.example .env
npm install
npm run dev
```

Set `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` in `.env`. Studio: [http://localhost:4321/admin](http://localhost:4321/admin).

| Command | Action |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the build |
