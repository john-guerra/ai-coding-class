// Seed a few sample links so the app isn't empty on first run.
import { listLinks, insertLink } from "../src/db.js";

const samples = [
  { url: "https://nodejs.org", title: "Node.js", tags: "runtime,docs" },
  { url: "https://vitest.dev", title: "Vitest", tags: "testing" },
  { url: "https://expressjs.com", title: "Express", tags: "web,framework" },
  {
    url: "https://example.com/my-salary-notes",
    title: "Comp notes",
    tags: "personal",
    note: "Do not share.",
    isPrivate: true,
  },
];

if (listLinks().length === 0) {
  for (const s of samples) insertLink(s);
  console.log(`Seeded ${samples.length} links.`);
} else {
  console.log("Links already present — skipping seed.");
}
