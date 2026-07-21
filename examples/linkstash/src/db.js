import Database from "better-sqlite3";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.LINKSTASH_DB || join(__dirname, "..", "linkstash.db");

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS links (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    url        TEXT NOT NULL,
    title      TEXT DEFAULT '',
    tags       TEXT DEFAULT '',
    note       TEXT DEFAULT '',
    is_private INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export function insertLink({ url, title = "", tags = "", note = "", isPrivate = false }) {
  const info = db
    .prepare(
      "INSERT INTO links (url, title, tags, note, is_private) VALUES (?, ?, ?, ?, ?)"
    )
    .run(url, title, tags, note, isPrivate ? 1 : 0);
  return getLink(info.lastInsertRowid);
}

export function getLink(id) {
  return db.prepare("SELECT * FROM links WHERE id = ?").get(id);
}

export function listLinks() {
  return db.prepare("SELECT * FROM links ORDER BY created_at DESC").all();
}

export function searchLinks(q) {
  const like = `%${q}%`;
  return db
    .prepare(
      "SELECT * FROM links WHERE url LIKE ? OR title LIKE ? OR tags LIKE ? ORDER BY created_at DESC"
    )
    .all(like, like, like);
}

export default db;
