---
title: How to write an article on this site
date: 2026-01-01
tag: Other
summary: A template showing every formatting option. It is a draft, so it never appears on the public site.
draft: true
---

This file is a **template**. Because `draft: true` is set at the top, it is only visible on your computer and in preview builds — never on the public site. Copy it to start a new article, change the title, date, tag and summary, and set `draft: false` when you are ready to publish.

Write normal paragraphs separated by an empty line. Use *italics*, **bold** and [links](https://imenalsamarai.github.io).

## A section heading

Inline mathematics uses single dollar signs, like $V^*(s) = \max_a Q^*(s, a)$. Displayed equations use double dollar signs:

$$
Q^*(s, a) = r(s, a) + \gamma \, \mathbb{E}\left[ \max_{a'} Q^*(s', a') \right]
$$

> A quotation or key takeaway is written with a `>` at the start of the line.

### Code

```python
def regret(q_star, action):
    return q_star.max() - q_star[action]
```

### Images

Upload an image (in Pages CMS: the image button; on your computer: put it in `public/images/writing/`) and insert it like this:

`![Short description of the image](/images/writing/my-figure.png)`

### Notes

You can add a footnote like this.[^1]

[^1]: The note text appears at the end of the article.
