const request = require("supertest");
const app = require("./app");

beforeEach(() => {
  app.resetStore();
});

describe("GET /todos", () => {
  it("returns empty array when no todos exist", async () => {
    const res = await request(app).get("/todos");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("returns all todos", async () => {
    await request(app).post("/todos").send({ title: "Buy milk" });
    await request(app).post("/todos").send({ title: "Walk dog" });

    const res = await request(app).get("/todos");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].title).toBe("Buy milk");
    expect(res.body[1].title).toBe("Walk dog");
  });
});

describe("POST /todos", () => {
  it("creates a todo with required fields", async () => {
    const res = await request(app).post("/todos").send({ title: "Buy milk" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(Number),
      title: "Buy milk",
      completed: false,
      createdAt: expect.any(String),
    });
  });

  it("returns 400 when title is missing", async () => {
    const res = await request(app).post("/todos").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("title is required");
  });

  it("returns 400 when title is empty string", async () => {
    const res = await request(app).post("/todos").send({ title: "  " });
    expect(res.status).toBe(400);
  });
});

describe("PUT /todos/:id", () => {
  it("marks a todo as completed", async () => {
    const { body: created } = await request(app)
      .post("/todos")
      .send({ title: "Buy milk" });

    const res = await request(app)
      .put(`/todos/${created.id}`)
      .send({ completed: true });

    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it("updates the title", async () => {
    const { body: created } = await request(app)
      .post("/todos")
      .send({ title: "Buy milk" });

    const res = await request(app)
      .put(`/todos/${created.id}`)
      .send({ title: "Buy oat milk" });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Buy oat milk");
  });

  it("returns 404 for unknown id", async () => {
    const res = await request(app).put("/todos/999").send({ completed: true });
    expect(res.status).toBe(404);
  });
});

describe("DELETE /todos/:id", () => {
  it("deletes a todo", async () => {
    const { body: created } = await request(app)
      .post("/todos")
      .send({ title: "Buy milk" });

    const res = await request(app).delete(`/todos/${created.id}`);
    expect(res.status).toBe(204);

    const list = await request(app).get("/todos");
    expect(list.body).toHaveLength(0);
  });

  it("returns 404 for unknown id", async () => {
    const res = await request(app).delete("/todos/999");
    expect(res.status).toBe(404);
  });
});
