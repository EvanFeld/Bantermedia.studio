---
name: Banter Media Group Website Project
description: Multi-page photography/videography portfolio site deployed on Netlify with a Cloudinary-backed serverless function for dynamic photo galleries
type: project
---

Static multi-page site for Banter Media Group. Stack: vanilla HTML/CSS/JS, no build tooling, no npm. Deployed on Netlify. Dynamic photo galleries powered by a Netlify serverless function (`netlify/functions/cloudinary.js`) that calls the Cloudinary Admin API.

**Why:** Photo galleries are served dynamically from Cloudinary so non-technical co-founder (Josh) can upload photos without touching code.

**How to apply:** When suggesting changes, keep the no-build-tool, plain-files approach. Any backend logic must live in `netlify/functions/`. The Cloudinary API key/secret is hardcoded in cloudinary.js — a known risk acknowledged by the project owners.

Pages: index.html, work.html, meet-the-team.html, testimonials.html, faq.html, interested.html, category.html, event.html
Shared assets: styles.css (all styles), script.js (scroll reveal, nav scroll, FAQ accordion, contact form mock)
