# Banter Media Group — Instagram Ad Kit

24 export-ready PNG files rendered from the React ad-kit harness.
All files: 1080 px wide. Story = 1080x1920. Feed = 1080x1350.
(2B ships in two showcase variants — Hissy Chick and Titan HVAC — hence 24 not 22.)

---

## Campaign 2 — Sites & Branding

Target audience: small businesses needing a site, redesign, or full branding kit.

| File | Layout | Kicker | Hook | Sub-copy |
|------|--------|--------|------|----------|
| `2A-story.png` | Before / After phones | Website redesign | IS YOUR WEBSITE / COSTING YOU / **CUSTOMERS?** | A redesign that turns scrollers into customers. |
| `2A-feed.png` | Before / After phones | Website redesign | IS YOUR WEBSITE / COSTING YOU / **CUSTOMERS?** | A redesign that turns scrollers into customers. |
| `2B-story.png` | Device duo (showcase: **Hissy Chick**) | Web design · Magnolia, TX | YOUR BUSINESS / DESERVES A SITE / **LIKE THIS.** | First site or full redesign — built by Banter. |
| `2B-feed.png` | Device duo (showcase: **Hissy Chick**) | Web design · Magnolia, TX | YOUR BUSINESS / DESERVES A SITE / **LIKE THIS.** | First site or full redesign — built by Banter. |
| `2B-story-TITAN.png` | Device duo (showcase: **Titan HVAC**) | Web design · Magnolia, TX | YOUR BUSINESS / DESERVES A SITE / **LIKE THIS.** | First site or full redesign — built by Banter. |
| `2B-feed-TITAN.png` | Device duo (showcase: **Titan HVAC**) | Web design · Magnolia, TX | YOUR BUSINESS / DESERVES A SITE / **LIKE THIS.** | First site or full redesign — built by Banter. |
| `2C-story.png` | Device duo (Hissy desktop + story ad) | Website + branding kit | THE SITE. / THE ADS. / **THE WHOLE LOOK.** | We build the site and the brand around it. |
| `2C-feed.png` | Device duo (Hissy desktop + story ad) | Website + branding kit | THE SITE. / THE ADS. / **THE WHOLE LOOK.** | We build the site and the brand around it. |
| `2D-story.png` | Brand ads display | Branding & launch kits | LAUNCH WITH / ADS THAT / **MATCH.** | Branded launch creatives, made to convert. |
| `2D-feed.png` | Brand ads display | Branding & launch kits | LAUNCH WITH / ADS THAT / **MATCH.** | Branded launch creatives, made to convert. |
| `2E-story.png` | Device duo (Titan desktop + mobile) | Launch kit · Titan Comfort | FROM FOOD TRUCKS / **TO HVAC.** | Sites & branded launches for any local business. |
| `2E-feed.png` | Device duo (Titan desktop + mobile) | Launch kit · Titan Comfort | FROM FOOD TRUCKS / **TO HVAC.** | Sites & branded launches for any local business. |

---

## Campaign 4 — Site Launch

Target audience: announce that Banter Media Group's own site is live.

| File | Layout | Kicker | Hook | Sub-copy |
|------|--------|--------|------|----------|
| `4A-story.png` | Screenshot (bantermedia.studio desktop) | It's finally here | OUR NEW / SITE IS / **LIVE.** | Years of work — now in one place. |
| `4A-feed.png` | Screenshot (bantermedia.studio desktop) | It's finally here | OUR NEW / SITE IS / **LIVE.** | Years of work — now in one place. |
| `4B-story.png` | Device duo (Banter site) | Now live | HAVE YOU SEEN / **IT YET?** | Explore the new Banter Media Group. |
| `4B-feed.png` | Device duo (Banter site) | Now live | HAVE YOU SEEN / **IT YET?** | Explore the new Banter Media Group. |

---

## Campaign 3 — Local Business Content

Target audience: restaurants, food trucks, mom-and-pop shops needing content.

| File | Layout | Kicker | Hook | Sub-copy |
|------|--------|--------|------|----------|
| `3A-story.png` | Type-band (food photo from Cloudinary) | Restaurants & food trucks | DO YOUR PHOTOS / MAKE PEOPLE / **HUNGRY?** | Content that fills tables. |
| `3A-feed.png` | Type-band (food photo from Cloudinary) | Restaurants & food trucks | DO YOUR PHOTOS / MAKE PEOPLE / **HUNGRY?** | Content that fills tables. |
| `3B-story.png` | Full photo (Cloudinary) | Local business content | STOP THE SCROLL. / **FILL THE TABLES.** | Photo, video & reels for Magnolia eats. |
| `3B-feed.png` | Full photo (Cloudinary) | Local business content | STOP THE SCROLL. / **FILL THE TABLES.** | Photo, video & reels for Magnolia eats. |

---

## Campaign 1 — Athletes & Trainers

Target audience: athletes needing sports/training coverage and the coaches who train them.

| File | Layout | Kicker | Hook | Sub-copy |
|------|--------|--------|------|----------|
| `1A-story.png` | Full photo (Cloudinary — basketball) | Athletes | STILL POSTING / PHONE-CAMERA / **HIGHLIGHTS?** | Recruiter-ready photo & film. |
| `1A-feed.png` | Full photo (Cloudinary — basketball) | Athletes | STILL POSTING / PHONE-CAMERA / **HIGHLIGHTS?** | Recruiter-ready photo & film. |
| `1B-story.png` | Full photo (Cloudinary — training) | Trainers & coaches | WHO'S CAPTURING / **THE GRIND?** | The work behind the wins — captured. |
| `1B-feed.png` | Full photo (Cloudinary — training) | Trainers & coaches | WHO'S CAPTURING / **THE GRIND?** | The work behind the wins — captured. |

---

## Rendering notes

- Rendered with puppeteer-core + system Chrome (headless:new) from a local React/Babel-standalone harness.
- Photo ads (1A, 1B, 3A, 3B) pull from Cloudinary CDN (`res.cloudinary.com/dqwlyubse`); internet required at render time.
- 2B has two showcase variants of the device mockup: `2B-*.png` = **Hissy Chick** site proof, `2B-*-TITAN.png` = **Titan Comfort Solutions (HVAC)** site proof (both bundled in the ad-kit zip). Re-render either by setting the harness `sc` param (0 = Hissy Chick, 1 = Titan).
- Bold / **blue** text in Hook column = the accent-colored closing line in the creative.
- All 24 files verified at correct pixel dimensions (Story 1080x1920, Feed 1080x1350).
