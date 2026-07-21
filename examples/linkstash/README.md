# Linkstash

A tiny link-saver you can hold in your head. Save URLs with a title, tags, and a
personal note; it fetches each page's title for you, and you can share a digest of
your links with someone else.

This is the starter project for the **Agentic Engineering** workshop (Sessions 2–4).
It's deliberately small so you can drive an agent across the whole thing in an afternoon.

## What it does

- **Save** a link: URL + title + tags + an optional private note.
- **List / search** your saved links.
- **Auto-title**: on save, it fetches the page and grabs its `<title>`.
- **Share**: export a digest of your links to send to someone.

> **Privacy contract:** links marked **private** stay local — they are never included
> in a shared digest.

## Stack

Node 20+ · Express · SQLite (better-sqlite3) · Vitest · vanilla-JS frontend. No build step.

## Setup

```bash
make setup       # install deps + seed sample data   (or: npm run setup)
make dev         # start the server on http://localhost:3000   (or: npm run dev)
make test        # run the test suite                 (or: npm test)
```

A fresh clone should have a **green** test suite after `make setup`.

## Layout

```
src/
  server.js              # Express app
  db.js                  # SQLite schema + queries
  config.js              # app config
  routes/links.js        # REST endpoints
  services/linkService.js# save / list / search / shareDigest
  lib/urlValidator.js    # URL validation + normalization  (well-tested core)
  lib/fetchTitle.js      # fetches a page and extracts its <title>
public/                  # minimal UI
test/                    # Vitest suites
scripts/seed.js          # sample data
```

## API

| Method | Path | Body / query | Returns |
|---|---|---|---|
| `POST` | `/api/links` | `{ url, title?, tags?, note?, isPrivate? }` | the saved link |
| `GET` | `/api/links` | — | all links |
| `GET` | `/api/links/search?q=` | `q` | matching links |
| `POST` | `/api/links/share` | — | a shareable digest |
