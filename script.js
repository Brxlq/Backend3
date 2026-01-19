async function loadProjects() {
  const res = await fetch("/projects");
  const projects = await res.json();

  const container = document.getElementById("projects");
  container.innerHTML = "";

  projects.forEach(p => {
    const div = document.createElement("div");
    div.className = "project";
    div.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <a href="${p.link}" target="_blank">View Project</a>
      <p><strong>Tech:</strong> ${p.techStack.join(", ")}</p>
      <button onclick="deleteProject('${p._id}')">Delete</button>
    `;
    container.appendChild(div);
  });
}

async function deleteProject(id) {
  await fetch(`/projects/${id}`, { method: "DELETE" });
  loadProjects();
}

document.getElementById("projectForm").addEventListener("submit", async e => {
  e.preventDefault();

  const body = {
    title: title.value.trim(),
    description: description.value.trim(),
    link: link.value.trim(),
    techStack: techStack.value.split(",").map(t => t.trim()).filter(Boolean)
  };

  const res = await fetch("/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    e.target.reset();
    loadProjects();
  } else {
    alert("Error creating project");
  }
});

loadProjects();
