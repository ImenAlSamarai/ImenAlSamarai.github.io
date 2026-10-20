import rss from '@astrojs/rss';
import { getPosts, site } from '../lib/site.js';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: `${site.name} — Writing`,
    description: 'Essays and notes on science, markets and machine learning.',
    site: context.site,
    items: posts.map((p) => ({ title: p.data.title, pubDate: p.data.date, description: p.data.summary || '', link: `/writing/${p.id}/` })),
  });
}
