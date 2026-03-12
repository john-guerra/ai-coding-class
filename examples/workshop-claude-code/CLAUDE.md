# Workshop Todos App

## Project Overview

<!-- TODO: Describe what this app does in 2-3 sentences. Example:
     "A simple REST API for managing todo items. Built with Express.js
     and in-memory storage (no database). Used to practice AI-assisted
     feature development." -->

## Build Commands

- `npm install` — install dependencies
- `npm start` — start server on port 3000
- `npm run dev` — start with auto-reload (Node 18+)
- `npm test` — run tests
- `npm run test:watch` — run tests in watch mode

## Architecture

- `src/app.js` — Express app, all routes, in-memory store, exported for testing
- `src/app.test.js` — Jest + supertest test suite for all routes

<!-- TODO: Add any additional files you create during the exercise -->

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /todos | List all todos |
| POST | /todos | Create a todo (`{ title }`) |
| PUT | /todos/:id | Update a todo (`{ title?, completed? }`) |
| DELETE | /todos/:id | Delete a todo |

## Code Style

<!-- TODO: Add your preferences. Examples:
     - Use async/await (no raw .then() chains)
     - Write tests before implementation (TDD)
     - Descriptive variable names
     - No console.log in production code -->

## Testing Strategy

<!-- TODO: Describe your testing approach. Example:
     "All routes must have tests. Run npm test before every commit.
     Tests live in src/app.test.js alongside the implementation." -->

## Current Exercise: Priority Support

The exercise is to add a `priority` field to todos.

**Requirements:**
- New todos can specify `priority`: `"low"`, `"medium"`, or `"high"` (default: `"medium"`)
- `GET /todos?priority=high` filters todos by priority
- Existing todos without a priority should default to `"medium"`
- Validate that priority is one of the three valid values

**The prompt to give Claude Code:**
```
Add a "priority" field to todos (values: low, medium, high; default: medium).
GET /todos should support filtering by ?priority=high.
Validate that priority is one of the valid values.
Use TDD — write the failing tests first, then implement.
```

<!-- Remove this section after you've completed the exercise -->
