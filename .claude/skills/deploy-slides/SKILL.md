---
name: deploy-slides
description: Use when building and deploying reveal-md lecture slides to the production server
---

# Deploy Slides

Build, verify, and deploy all reveal-md lecture slides to the production server.

## Workflow

Execute these steps sequentially. Stop on any failure.

### Step 1: Install dependencies

```bash
cd slides && npm install
```

Report if any packages were added or updated.

### Step 2: Build all slides

```bash
npm run build
```

This compiles all lecture markdown to static HTML in `slides/dist/`.

### Step 3: Verify build output

Check that the build succeeded:

1. Confirm `slides/dist/` exists and is non-empty
2. List lecture folders in `dist/` and compare against source folders in `slides/` (folders matching `[0-9]*` or `[TW][0-9]*`)
3. Report any source lectures missing from the build output
4. If any lectures are missing, **stop and report** — do not deploy

### Step 4: Deploy to production

**Before deploying, ask the user for confirmation.** This pushes to a live server visible to students.

```bash
npm run deploy
```

Report the rsync summary (files transferred, bytes sent).

### Step 5: Confirm deployment

Verify the production server responds:

```bash
curl -s -o /dev/null -w "%{http_code}" https://johnguerra.co/lectures/aiCoding_spring2026/
```

- HTTP 200 = success
- Any other status = report failure and suggest checking SSH/server config

## Error Handling

- If any step fails, stop immediately and report the error
- Suggest likely fixes (e.g., missing SSH key for deploy, npm install needed)
- Never skip a failed step or continue to the next one
