const linksEl = document.getElementById("links");
const form = document.getElementById("add-form");
const searchEl = document.getElementById("search");

async function load(query = "") {
  const url = query ? `/api/links/search?q=${encodeURIComponent(query)}` : "/api/links";
  const links = await (await fetch(url)).json();
  linksEl.replaceChildren();
  for (const l of links) {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = l.title || l.url;
    li.appendChild(a);

    if (l.tags) {
      const small = document.createElement("small");
      small.textContent = ` ${l.tags}`;
      li.appendChild(small);
    }
    if (l.is_private) {
      li.appendChild(document.createTextNode(" 🔒"));
    }

    linksEl.appendChild(li);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch("/api/links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: document.getElementById("url").value,
      tags: document.getElementById("tags").value,
      isPrivate: document.getElementById("private").checked,
    }),
  });
  form.reset();
  load();
});

searchEl.addEventListener("input", (e) => load(e.target.value));

load();
