const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store — no database needed
let todos = [];
let nextId = 1;

// GET /todos — list all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST /todos — create a todo
app.post("/todos", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }
  const todo = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT /todos/:id — update a todo
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "todo not found" });
  }
  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

// DELETE /todos/:id — delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "todo not found" });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

// Reset store (for tests)
app.resetStore = () => {
  todos = [];
  nextId = 1;
};

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Todos API running on port ${PORT}`));
}

module.exports = app;
