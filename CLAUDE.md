# 25News / 26News — Project Instructions

## Google Policy Compliance (REQUIRED for every feature)

Before implementing any feature, check it against the policies below. After implementing, verify the result still passes. If a feature would violate any policy, **stop and tell the user** before writing any code.

### Pre-implementation checklist

Ask yourself these questions before writing code:

1. **AdSense Program Policies** — does this feature risk:
   - Showing ads next to prohibited content (violence, adult, gambling, hate speech)?
   - Incentivising or simulating ad clicks (e.g. buttons/animations near ad slots)?
   - Stacking, hiding, or misrepresenting ad units?
   - Placing more than 3 display ad units or 3 link units per page?

2. **Google Search / Webmaster Guidelines** — does this feature:
   - Generate or display thin, duplicate, or auto-generated content?
   - Cloak content (show Googlebot something different from users)?
   - Use hidden text or links (e.g. `display:none`, white text on white)?
   - Create doorway pages or manipulative redirect chains?
   - Add `noindex` / `nofollow` incorrectly to important pages?

3. **E-E-A-T signals** (Experience, Expertise, Authoritativeness, Trust):
   - Does the feature preserve author bylines, roles, and bios?
   - Are dates, sources, and factual claims accurate and attributable?
   - Does it avoid presenting AI-generated or unverified claims as fact?

4. **Core Web Vitals & Page Experience**:
   - Will this cause layout shift (CLS) near ad slots?
   - Will it block rendering or increase LCP significantly?
   - Does it remain mobile-friendly (no fixed-width elements > viewport)?

5. **Privacy & Data**:
   - Does it collect or store user data without consent (GDPR/CCPA)?
   - Does it pass user data to third parties outside existing integrations?

### Post-implementation verification

After writing code, confirm:
- [ ] No new policy violations introduced
- [ ] Ad slots (`<AdUnit>` components) are not repositioned in a way that violates placement rules
- [ ] SEO metadata (`<title>`, `<meta description>`, canonical tags) is intact
- [ ] No `noindex` accidentally added to category/article pages
- [ ] Structured data (if present) still valid — no missing required fields
- [ ] Images have `alt` text (accessibility + Google Images)

### Key policies to reference mentally

| Policy area | What to watch |
|---|---|
| AdSense content | No adult, violent, hateful, or dangerous content near ads |
| AdSense placement | Ads must not be placed inside scrolling text boxes, pop-ups, or email |
| Valuable inventory | Every page must have substantial, original content — not just ads |
| Search quality | Content must be written for users, not search engines |
| Structured data | Don't mark up content that isn't visible to users |

---

## Project Overview

- **Framework**: Next.js (App Router) with TypeScript and Tailwind CSS
- **Hosting**: Vercel (auto-deploy on push to `main`)
- **Monetisation**: Google AdSense — compliance is critical
- **Content**: Articles stored in `src/data/sources/local/articles.ts`
- **Authors**: `src/data/sources/local/authors.ts`

## Code conventions

- Use TypeScript strictly — no `any` unless unavoidable
- Tailwind for all styling — no inline styles except dynamic values
- Next.js Image component for all images (never raw `<img>`)
- Keep article body as HTML strings (existing pattern in articles.ts)
- No third-party analytics or tracking beyond what's already present
