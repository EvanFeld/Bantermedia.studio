---
name: Cloudinary image inventory and album mapping
description: Which public_ids map to which categories and albums for this site
type: project
---

Images are stored at Cloudinary root (no folder prefix in public_id). Three naming groups:

- `Website-N_xxxxx` — 22 images: ChiliFest performers and crowd shots (Koe Wetzel, Josh Abbott, Treaty Oak Revival, People of Chili)
- `EOP-N_xxxxx` — 8 images: EOP Basketball (sports)
- `Nathan-Grad-N_xxxxx` — 49 images: Nathan Gil grad photos (Class of 2024)

Category structure (LOCAL_CATEGORIES in photos-data.js):
- Live Music → koe-wetzel, josh-abbott, treaty-oak, people-of-chili albums
- Sports → basketball album
- Grad Photos → nathan-grad album

Cover images used per category/album are hardcoded in photos-data.js.

**Why:** Cloudinary folder API exists but images were uploaded to root. The netlify function prefix-search returns empty because public_ids don't include folder paths.

**How to apply:** When the user uploads new photos, confirm whether they upload with folder paths in public_id or at root. Update LOCAL_ALBUMS in photos-data.js with the new public_id list.
