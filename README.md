# imenalsamarai.github.io

Personal website of Imen Al Samarai — built with [Astro](https://astro.build), hosted on GitHub Pages, editable with [Pages CMS](https://pagescms.org).

Every change pushed to the `main` branch rebuilds the site automatically (about two minutes). The publication list also refreshes itself from OpenAlex every Monday.

## Editing — the easy way (Pages CMS)

1. Go to <https://app.pagescms.org> and sign in with GitHub.
2. Open the repository **ImenAlSamarai/ImenAlSamarai.github.io**.
3. Pick a section in the left menu and edit through the forms. **Save** publishes.

| Menu in Pages CMS | What it changes |
|---|---|
| Writing | Articles. New article → **Add an entry**. Keep **Draft** ticked until ready. |
| Studio — drawings | Drawings: upload the image, add title, year, medium. The Studio appears on the site as soon as one non-draft drawing exists. |
| CV | Experience, education, skills, awards. The CV page **and** the PDF are generated from it. |
| Research — selected papers | Papers featured on the Research page (first three also on the homepage). |
| Research — papers missing from the automatic list | New preprints not yet in OpenAlex. |
| Work page | Ventures, research projects, open-source projects. |
| Site settings & texts | Homepage and About texts, profile links, e-mail, newsletter, analytics. |

Articles are written in Markdown. Equations use LaTeX (`$…$` inline, `$$…$$` on their own line). See the draft *How to write an article on this site* in `src/content/writing/` for every formatting option.

## Editing — on your computer

The same files can be edited directly:

```
src/data/site.yml               homepage & About texts, links, settings
src/data/cv.yml                 CV (web page + PDF)
src/data/selected.yml           selected papers
src/data/publications-extra.yml papers to add to the automatic list
src/data/work.yml               Work page
src/content/writing/*.md        articles (one file each)
src/content/studio/*.md         drawings (one file each; images in public/images/studio/)
public/images/                  all images
```

Preview locally (needs Node.js 22): `npm install`, then `npm run dev` and open <http://localhost:4321>. Drafts are visible in this preview only.

## Things that happen automatically

- Writing and Studio stay hidden from the menu until they have at least one published (non-draft) entry.
- The homepage "Latest writing" shows the two newest articles; reading time is computed.
- `npm run publications` refreshes `src/data/publications.json` from OpenAlex (author `A5108093709`).
- The CV PDF is printed from the CV page at each deploy (`/cv.pdf`).
- The newsletter form and analytics appear only once their addresses are filled in *Site settings*.
