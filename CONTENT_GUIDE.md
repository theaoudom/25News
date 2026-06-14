# Content Guide — How to Add Articles to 26News

All editorial content lives in one file:

```
src/data/sources/local/articles.ts
```

To publish a new article you add one object to the `RAW` array in that file,
commit, and push. Vercel rebuilds and the article goes live automatically —
appearing on its category page, the homepage lists (if flagged), search, the
sitemap, and with full SEO tags. **No other files need to change.**

Authors live in `src/data/sources/local/authors.ts` (see the end of this guide).

---

## 1. Copy this template

Paste a new object into the `RAW = [ ... ]` array (anywhere inside the
brackets). Only the fields marked **required** are mandatory.

```ts
{
  id: 'unique-id-2026-01',                 // REQUIRED: any unique string
  title: 'Your Headline Goes Here',        // REQUIRED
  category: 'football',                    // REQUIRED: 'world' | 'sports' | 'football' | 'esports'
  categoryLabel: 'Premier League',         // REQUIRED: the small tag shown on cards
  authorId: 'newsroom',                    // REQUIRED: an id from authors.ts
  publishedAt: '2026-06-14T09:00:00Z',     // REQUIRED: ISO date (UTC). Newest sorts first.
  imageUrl: '/images/placeholders/football.svg', // REQUIRED: see "Images" below
  summary: 'One or two sentences shown on cards and used as the meta description.',
  tags: ['Football', 'Premier League'],    // optional, helps related-article matching
  body: `
    <p>Opening paragraph.</p>
    <h2>A Section Heading</h2>
    <p>More text. Use <strong>bold</strong> and lists:</p>
    <ul>
      <li>Point one</li>
      <li>Point two</li>
    </ul>
    <blockquote>"A pull-quote." — Source</blockquote>
  `,
  // --- optional extras ---
  secondaryImageUrl: '/images/my-photo-2.jpg', // a second image mid-article
  secondaryBody: `<h2>After the image</h2><p>...</p>`,
  isBreaking: false,    // shows in the red breaking ticker at the top of the homepage
  isTrending: false,    // shows in the homepage "Trending" list / can be the hero
  isFeatured: false,    // marks a flagship story
  isWorldCup: false,    // set true ONLY for genuine FIFA World Cup stories (puts it in /world-cup)
},
```

### Things that happen automatically (don't set them)
- **URL slug** — generated from the title (e.g. `/article/your-headline-goes-here`).
- **Reading time** — calculated from the body length.
- **Updated date** — defaults to `publishedAt`.
- **Author name/photo/bio** — pulled from `authorId`.
- **Summary** — if you omit `summary`, the first ~180 chars of the body are used.

---

## 2. Writing the `body`

The body is HTML inside backticks. Supported tags (already styled):

| Tag | Use |
|-----|-----|
| `<p>` | paragraphs |
| `<h2>`, `<h3>` | section headings |
| `<ul><li>` | bullet lists |
| `<strong>` | bold |
| `<blockquote>` | pull-quotes |
| `<a href="...">` | links |

Tips for quality + SEO + AdSense:
- Aim for **400+ words** with 2–4 `<h2>` sections.
- Put the most important keywords in the **title** and first paragraph.
- Keep it **original** — don't paste from other sites.

---

## 3. Images

Two options for `imageUrl` (and `secondaryImageUrl`):

1. **Your own image (best):** drop the file in `public/images/` and reference it
   as `/images/your-file.jpg`. Use real photos for published articles — they look
   far better than placeholders and help with AdSense approval.
2. **A remote image URL:** any `https://…` URL works (it's optimised
   automatically). Make sure you have the right to use it.
3. **Placeholder (temporary):** one of the bundled branded images —
   `/images/placeholders/{world,sports,football,esports,worldcup}.svg`.

Recommended size: landscape **16:9**, at least **1200×675**.

---

## 4. Flags cheat-sheet

| Flag | Effect |
|------|--------|
| `isBreaking` | Red ticker across the top of the homepage. **Auto-expires after 30 days** — an old story will never show as "breaking", so it's safe to leave the flag on. |
| `isTrending` | Homepage "Trending" sidebar; the newest trending item becomes the hero |
| `isFeatured` | Marks a flagship piece |
| `isWorldCup` | Adds it to the **World Cup** section (`/world-cup`). Use only for real FIFA World Cup stories. |

Leave them off for a normal article — it still appears on its category page,
search, and "Latest News".

---

## 5. Adding a new author (optional)

Edit `src/data/sources/local/authors.ts` and add an entry:

```ts
'jordan-lee': {
  id: 'jordan-lee',
  name: 'Jordan Lee',
  role: 'Football Correspondent',          // shown under the byline (E-E-A-T)
  bio: 'Jordan covers the Premier League and European football.',
  avatarUrl: '/images/authors/jordan.jpg', // optional; defaults to a generic avatar
},
```

Then use `authorId: 'jordan-lee'` in your articles. Real author names, roles and
bios strengthen Google's E-E-A-T signals and help with AdSense trust.

---

## 6. Publish

```bash
git add -A
git commit -m "Add article: <title>"
git push
```

Vercel auto-deploys in ~1 minute. Check it live at
`https://26news.xyz/article/<your-slug>`. Done!
