// "Save my contact" — a contact card (vCard) generated from src/data/site.yml.
import { site } from '../lib/site.js';

export function GET(context) {
  const [first, ...rest] = site.name.split(' ');
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${rest.join(' ')};${first};;;`,
    `FN:${site.name}`,
    `EMAIL;TYPE=INTERNET:${site.email_user}@${site.email_domain}`,
    `URL:${context.site}`,
    site.links.linkedin && `X-SOCIALPROFILE;TYPE=linkedin:${site.links.linkedin}`,
    site.links.linkedin && `item1.URL:${site.links.linkedin}`,
    site.links.linkedin && 'item1.X-ABLabel:LinkedIn',
    `ADR;TYPE=WORK:;;;${site.location};;;`,
    `NOTE:${site.fields}`,
    'END:VCARD',
  ].filter(Boolean);
  return new Response(lines.join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
  });
}
