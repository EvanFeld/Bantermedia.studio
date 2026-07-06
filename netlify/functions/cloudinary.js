const https = require('https');

const CLOUD_NAME = 'dqwlyubse';
const API_KEY    = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const AUTH       = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');
const BASE       = `api.cloudinary.com`;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
};

function get(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE,
      path: `/v1_1/${CLOUD_NAME}${path}`,
      headers: { Authorization: `Basic ${AUTH}` }
    };
    https.get(options, (res) => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`Cloudinary ${res.statusCode} for ${path}: ${raw.slice(0, 200)}`));
        }
        try { resolve(JSON.parse(raw)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

// Encode each folder segment individually — do NOT encode slashes,
// otherwise Cloudinary's prefix/folder params silently match nothing.
function encodePath(p) {
  return p.split('/').map(encodeURIComponent).join('/');
}

function imgUrl(publicId, opts = 'w_800,c_fill,q_auto,f_auto') {
  const encoded = publicId.split('/').map(encodeURIComponent).join('/');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${opts}/${encoded}`;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS, body: '' };
  }

  const p = event.queryStringParameters || {};
  const action = p.action;

  try {
    // ── List categories (first-level root folders) ───────────────────────────
    if (action === 'categories') {
      const data = await get('/folders');
      const folders = data.folders || [];

      const categories = await Promise.all(folders.map(async (f) => {
        try {
          const imgs = await get(
            `/resources/image?prefix=${encodePath(f.path)}&type=upload&max_results=1`
          );
          const first = imgs.resources?.[0];
          return {
            name: f.name,
            path: f.path,
            previewUrl: first ? imgUrl(first.public_id) : null
          };
        } catch {
          return { name: f.name, path: f.path, previewUrl: null };
        }
      }));

      return { statusCode: 200, headers: CORS, body: JSON.stringify(categories) };
    }

    // ── List events (subfolders inside a category) ───────────────────────────
    if (action === 'events') {
      const catPath = p.path || p.category || '';
      const data = await get(`/folders/${encodePath(catPath)}`);
      const folders = data.folders || [];

      const events = await Promise.all(folders.map(async (f) => {
        try {
          const imgs = await get(
            `/resources/image?prefix=${encodePath(f.path)}&type=upload&max_results=1`
          );
          const first = imgs.resources?.[0];
          return {
            name: f.name,
            path: f.path,
            previewUrl: first ? imgUrl(first.public_id) : null
          };
        } catch {
          return { name: f.name, path: f.path, previewUrl: null };
        }
      }));

      return { statusCode: 200, headers: CORS, body: JSON.stringify(events) };
    }

    // ── List all photos inside an event folder ───────────────────────────────
    if (action === 'photos') {
      const maxResults = Math.min(parseInt(p.max_results) || 500, 500);
      const data = await get(
        `/resources/image?prefix=${encodePath(p.path)}&type=upload&max_results=${maxResults}`
      );
      const photos = (data.resources || []).map(r => ({
        url:     imgUrl(r.public_id, 'w_700,c_fill,q_auto,f_auto'),
        fullUrl: imgUrl(r.public_id, 'q_auto,f_auto'),
        id:      r.public_id
      }));

      return { statusCode: 200, headers: CORS, body: JSON.stringify(photos) };
    }

    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Unknown action' }) };

  } catch (err) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: err.message }) };
  }
};
