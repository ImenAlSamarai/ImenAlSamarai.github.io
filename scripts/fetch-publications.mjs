// Refreshes src/data/publications.json from OpenAlex (open scholarly database).
// Runs automatically before each deploy; if OpenAlex is unreachable, the existing file is kept.
import fs from 'node:fs';

const AUTHOR = 'A5108093709'; // Imen Al Samarai on OpenAlex
const OUT = 'src/data/publications.json';
const base = `https://api.openalex.org/works?filter=author.id:${AUTHOR}&per-page=200&select=title,publication_year,cited_by_count,primary_location,doi,type`;

async function main() {
  const res = await fetch(base + (process.env.OPENALEX_KEY ? `&api_key=${process.env.OPENALEX_KEY}` : ''));
  if (!res.ok) throw new Error(`OpenAlex HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data.results) || data.results.length === 0) throw new Error('No results');
  const seen = new Map();
  const score = (r) => (r.type === 'article' ? 2 : 0) + (r.venue ? 1 : 0) + (r.doi ? 1 : 0);
  for (const w of data.results) {
    const title = (w.title || '').replace(/\s*\*$/, '').trim();
    if (!title) continue;
    const key = title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 80);
    const rec = { title, year: w.publication_year, venue: w.primary_location?.source?.display_name || null, doi: w.doi || null, cited: w.cited_by_count || 0, type: w.type };
    const prev = seen.get(key);
    if (!prev || score(rec) > score(prev)) seen.set(key, { ...rec, cited: Math.max(rec.cited, prev?.cited || 0) });
  }
  const out = [...seen.values()].sort((a, b) => (b.year || 0) - (a.year || 0) || b.cited - a.cited);
  fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
  console.log(`publications.json updated: ${out.length} entries`);
}

main().catch((e) => { console.warn(`Keeping existing publications.json (${e.message})`); });
