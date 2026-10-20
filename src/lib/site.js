import fs from 'node:fs';
import * as yaml from 'js-yaml';
import { getCollection } from 'astro:content';

/** Read a YAML/JSON data file from src/data. */
export function load(file) {
  const text = fs.readFileSync(`src/data/${file}`, 'utf8');
  return file.endsWith('.json') ? JSON.parse(text) : yaml.load(text);
}

/** Drafts are shown in `npm run dev` and in preview builds (INCLUDE_DRAFTS=1), never in production. */
export const includeDrafts = process.env.INCLUDE_DRAFTS === '1' || import.meta.env.DEV;

export async function getPosts() {
  const all = await getCollection('writing', (e) => includeDrafts || !e.data.draft);
  return all.sort((a, b) => b.data.date - a.data.date);
}

export async function getDrawings() {
  const all = await getCollection('studio', (e) => includeDrafts || !e.data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export function readingTime(text = '') {
  const words = text.replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(d) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

const VENUES = [
  [/^Physical review\. D.*/i, 'Physical Review D'],
  [/^Physical Review Letters.*/i, 'Physical Review Letters'],
  [/^Nuclear Instruments and Methods in Physics Research Section A.*/i, 'Nuclear Instruments and Methods A'],
  [/^Journal of Cosmology and Astroparticle Physics.*/i, 'JCAP'],
  [/^The Astrophysical Journal Letters.*/i, 'ApJ Letters'],
  [/^The Astrophysical Journal Supplement.*/i, 'ApJ Supplement'],
  [/^The Astrophysical Journal.*/i, 'The Astrophysical Journal'],
  [/^Astronomy and Astrophysics.*/i, 'Astronomy & Astrophysics'],
  [/^arXiv.*/i, 'arXiv'],
  [/^(HAL|OSTI|DESY|Institutional Repositories|LA Referencia|RWTH|RUNG|Civil War).*/i, ''],
];

export function cleanVenue(v) {
  if (!v) return '';
  for (const [re, name] of VENUES) if (re.test(v)) return name;
  return v;
}

/** All publications: OpenAlex export + manual additions, de-duplicated, newest first. */
export function getPublications() {
  const auto = load('publications.json');
  const extra = load('publications-extra.yml') || [];
  const key = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 80);
  const map = new Map();
  for (const p of auto) {
    if (/^(erratum|corrigendum|submitter)/i.test(p.title)) continue;
    map.set(key(p.title), {
      title: p.title,
      year: p.year,
      venue: cleanVenue(p.venue),
      link: p.doi || '',
      field: 'Physics',
    });
  }
  for (const p of extra) map.set(key(p.title), { field: 'Physics', ...p });
  return [...map.values()].sort((a, b) => (b.year || 0) - (a.year || 0));
}

export const site = load('site.yml');
