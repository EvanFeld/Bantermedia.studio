---
name: Banter Media Group — Project Stack
description: Framework, asset delivery, and deployment setup for this photography/media website
type: project
---

Plain HTML/CSS/JS site (no framework, no build step). Deployed on Netlify.

Files: index.html, work.html, category.html, event.html, photos-data.js, script.js, styles.css

Cloudinary cloud name: `dqwlyubse`
Credentials file: C:\Users\Evan Felder\cloudinary-credentials.txt
API Key: 917191864973737 (root)

**Why:** Static site for Banter Media Group photography portfolio. Netlify hosts it with a serverless function at netlify/functions/cloudinary.js for Cloudinary API calls.

**How to apply:** All images are delivered from Cloudinary CDN using the pattern `https://res.cloudinary.com/dqwlyubse/image/upload/<transforms>/<public_id>`. The `cloudUrl(publicId, opts)` helper in photos-data.js constructs these URLs. No local image assets exist.

Key architectural fact: ALL images are uploaded at the Cloudinary root level (no folder prefix in public_id). Folder structure exists in Cloudinary UI metadata only. Cloudinary prefix-search API returns empty for folder paths. The static registry in photos-data.js is authoritative.
