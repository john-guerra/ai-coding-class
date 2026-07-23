// Render workshop handouts (Markdown) into standalone, printable HTML pages.
// These are reference CARDS, not slides — so we bypass reveal.js entirely and
// wrap each handout's Markdown in the "Ink & Ochre" template below, with a
// print stylesheet. Keeps the .md sources easy to edit.
//
// Run as part of `npm run build:workshop` (after reveal-md), overwriting the
// reveal-rendered handout HTML with these pages.

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const here = dirname(fileURLToPath(import.meta.url));          // slides/workshop
const srcDir = join(here, 'handouts');
const outDir = join(here, '..', 'dist-workshop', 'handouts');

marked.setOptions({ gfm: true });

function template({ title, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} — Workshop Handout</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Lato:wght@400;700;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --paper:#f7f6f2; --surface:#fff; --panel:#f2f1ec; --ink:#1d2733; --navy:#16202e;
      --muted:#626b77; --line:#e7e5de; --accent:#f5811f; --accent-dark:#d96f12; --link:#1257c9;
      --serif:'Playfair Display',Georgia,serif; --sans:'Lato','Helvetica Neue',Arial,sans-serif;
      --mono:'IBM Plex Mono',ui-monospace,Menlo,monospace;
    }
    * { box-sizing:border-box; }
    body { margin:0; background:var(--paper); color:var(--ink); font-family:var(--sans);
           line-height:1.5; font-size:15.5px; -webkit-font-smoothing:antialiased; }

    /* top bar — screen only */
    .bar { display:flex; justify-content:space-between; align-items:center; gap:12px;
           max-width:820px; margin:0 auto; padding:14px 28px 0; }
    .bar a, .bar button { font-family:var(--mono); font-size:.8rem; font-weight:600;
           color:var(--navy); background:none; border:1px solid var(--line); border-radius:999px;
           padding:6px 14px; cursor:pointer; text-decoration:none; }
    .bar a:hover, .bar button:hover { border-color:var(--accent); }

    .card { max-width:820px; margin:14px auto 40px; background:var(--surface);
            border:1px solid var(--line); border-top:4px solid var(--accent);
            border-radius:14px; padding:34px 40px 40px; }

    h1 { font-family:var(--serif); font-weight:800; font-size:2rem; line-height:1.08;
         color:var(--navy); margin:0 0 2px; letter-spacing:-.01em; }
    /* the first line after H1 is an italic subtitle in every handout */
    h1 + p em { font-style:normal; }
    h1 + p { font-family:var(--mono); font-size:.78rem; letter-spacing:.08em; text-transform:uppercase;
             color:var(--muted); margin:0 0 22px; }
    h2 { font-family:var(--serif); font-weight:700; font-size:1.3rem; color:var(--navy);
         margin:26px 0 10px; padding-bottom:5px; border-bottom:1px solid var(--line); }
    h2::before { content:"▍"; color:var(--accent); margin-right:.35em; }
    h3 { font-family:var(--serif); font-weight:700; font-size:1.05rem; color:var(--navy); margin:18px 0 6px; }

    p, li { color:var(--ink); }
    ul, ol { padding-left:1.3em; margin:8px 0; }
    li { margin:4px 0; }
    strong { color:var(--navy); }
    a { color:var(--link); }

    blockquote { margin:14px 0; padding:12px 16px; background:#fdecd9;
                 border-left:4px solid var(--accent); border-radius:0 8px 8px 0;
                 color:var(--ink); font-size:.97rem; }
    blockquote p { margin:0; }

    code { font-family:var(--mono); font-size:.86em; background:var(--panel);
           border:1px solid var(--line); border-radius:4px; padding:.05em .35em; }
    pre { background:#0f1722; color:#d7e2ee; border-radius:8px; padding:14px 16px;
          overflow-x:auto; margin:12px 0; }
    pre code { background:none; border:none; padding:0; color:inherit; font-size:.82rem; line-height:1.6; }

    table { border-collapse:collapse; width:100%; margin:12px 0; font-size:.9rem; }
    th, td { text-align:left; padding:7px 12px; border-bottom:1px solid var(--line); vertical-align:top; }
    thead th { background:var(--panel); font-family:var(--sans); font-weight:900; color:var(--navy);
               border-bottom:2px solid var(--line); }
    tbody tr:last-child td { border-bottom:none; }

    hr { border:none; border-top:1px solid var(--line); margin:22px 0; }

    /* PRINT — clean one-pager, no chrome */
    @media print {
      @page { margin:14mm; }
      body { background:#fff; font-size:10.5pt; }
      .bar { display:none; }
      .card { max-width:none; margin:0; border:none; border-radius:0; padding:0; }
      h2 { break-after:avoid; }
      table, pre, blockquote, ul, ol { break-inside:avoid; }
      pre { background:#f2f1ec; color:#1d2733; border:1px solid #ccc; }
      pre code { color:#1d2733; }
      a { color:var(--ink); text-decoration:none; }
    }
  </style>
</head>
<body>
  <div class="bar">
    <a href="../">&larr; Workshop</a>
    <button onclick="window.print()">Print / Save PDF</button>
  </div>
  <article class="card">
${body}
  </article>
</body>
</html>
`;
}

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const files = readdirSync(srcDir).filter((f) => f.endsWith('.md') && f !== 'README.md');
for (const f of files) {
  const md = readFileSync(join(srcDir, f), 'utf8');
  const title = (md.match(/^#\s+(.+)$/m)?.[1] || 'Handout').replace(/[*_`]/g, '').trim();
  const html = template({ title, body: marked.parse(md) });
  writeFileSync(join(outDir, f.replace(/\.md$/, '.html')), html);
  console.log('handout →', 'handouts/' + f.replace(/\.md$/, '.html'));
}
console.log(`Rendered ${files.length} handouts to printable HTML.`);
