#!/usr/bin/env bash
# Builds a private preview copy (drafts included, relative links) into $1. Not used by the live site.
set -e
OUT="$1"
INCLUDE_DRAFTS=1 npx astro build >/dev/null
node scripts/cv-pdf.mjs >/dev/null
rm -rf "$OUT" && cp -r dist "$OUT" && cd "$OUT"
rm -f _astro/*.ttf _astro/*.woff sitemap*.xml
python3 - <<'PY'
import os,re
for dp,dn,fn in os.walk('.'):
    for f in fn:
        if not f.endswith('.html'): continue
        p=os.path.join(dp,f); depth=os.path.relpath(p,'.').count(os.sep); pre='../'*depth or './'
        s=open(p,encoding='utf8').read()
        def fix(m):
            a,q,u=m.groups()
            if u.startswith('//'): return m.group(0)
            b,_,fr=u[1:].partition('#')
            b = 'index.html' if b=='' else (b+'index.html' if b.endswith('/') else b)
            return f'{a}={q}{pre}{b}{"#"+fr if fr else ""}{q}'
        s=re.sub(r'\b(href|src)=(["\'])(/[^"\']*)\2',fix,s).replace('_astro/','assets/')
        open(p,'w',encoding='utf8').write(s)
for f in os.listdir('_astro'):
    if f.endswith('.css'):
        p='_astro/'+f; s=open(p).read().replace('url(/_astro/','url(./'); open(p,'w').write(s)
os.rename('_astro','assets')
PY
