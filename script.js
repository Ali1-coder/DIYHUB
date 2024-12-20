let projects = [];

async function loadProjects() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    projects = data.projects;
    renderHome();
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

// Call loadProjects when the app starts
loadProjects();

function saveProjects() {
  console.log("Updated projects:", JSON.stringify({ projects }, null, 2));
  // In a real app, send this to a server using fetch/POST.
}

// Global State
const state = {
  bookmarks: JSON.parse(localStorage.getItem("bookmarks")) || [],
  currentView: "home",
};

// App container
const app = document.getElementById("app");

// Render Home Page
function renderHome() {
  app.innerHTML = `<h2>All Projects</h2>`;
  projects.forEach((project) => {
    app.innerHTML += `
      <div class="project-card">
        <img src="${project.image || "placeholder.jpg"}" alt="${
      project.title
    }" style="max-width: 100%;"><br>
        <h3>${project.title}</h3>
        <p>Difficulty: ${project.difficulty}</p>
        <button onclick="bookmarkProject(${project.id})">Bookmark</button>
        <button onclick="deleteProject(${
          project.id
        })" style="color: red;">Delete</button>
      </div>
    `;
  });
}

function renderBookmarks() {
  app.innerHTML = `<h2>Bookmarked Projects</h2>`;
  if (state.bookmarks.length === 0) {
    app.innerHTML += `<p>No bookmarks yet.</p>`;
  } else {
    state.bookmarks.forEach((project) => {
      app.innerHTML += `
        <div class="project-card">
          <img src="${project.image || "placeholder.jpg"}" alt="${
        project.title
      }" style="max-width: 100%;"><br>
          <h3>${project.title}</h3>
          <p>Difficulty: ${project.difficulty}</p>
          <button onclick="deleteProject(${
            project.id
          })" style="color: red;">Delete</button>
        </div>
      `;
    });
  }
}

// Render Create Project Page
function renderCreateProject() {
  app.innerHTML = `
    <h2>Create a New Project</h2>
    <form id="create-form">
      <input type="text" id="title" placeholder="Project Title" required><br>
      <input type="text" id="difficulty" placeholder="Difficulty" required><br>
      <textarea id="materials" placeholder="Materials (comma separated)" required></textarea><br>
      <input type="file" id="image" accept="image/*"><br>
      <img id="image-preview" alt="Image Preview" style="display:none; max-width: 200px; margin-top: 10px;"><br>
      <button type="submit">Save Project</button>
    </form>
  `;

  const form = document.getElementById("create-form");
  const imageInput = document.getElementById("image");
  const imagePreview = document.getElementById("image-preview");
  let imageBase64 = ""; // Store the uploaded image as Base64

  // Handle image preview
  imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        imageBase64 = reader.result; // Save the Base64 string
        imagePreview.src = imageBase64;
        imagePreview.style.display = "block"; // Show the preview
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const difficulty = document.getElementById("difficulty").value;
    const materials = document.getElementById("materials").value.split(",");

    const newProject = {
      id: projects.length + 1,
      title,
      difficulty,
      materials,
      image: imageBase64, // Save the uploaded image
    };

    projects.push(newProject); // Save the new project
    saveProjects(); // Save to JSON
    renderHome(); // Redirect to the Home Page
  });
}
//Delete Project
function deleteProject(id) {
  // Find the project index
  const projectIndex = projects.findIndex((p) => p.id === id);

  if (projectIndex !== -1) {
    // Remove the project from the projects array
    projects.splice(projectIndex, 1);

    // Remove from bookmarks if it's bookmarked
    state.bookmarks = state.bookmarks.filter((p) => p.id !== id);
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));

    function deleteProject(id) {
      const projectIndex = projects.findIndex((p) => p.id === id);
      if (projectIndex !== -1) {
        projects.splice(projectIndex, 1);

        // Remove from bookmarks if needed
        state.bookmarks = state.bookmarks.filter((p) => p.id !== id);
        localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));

        saveProjects(); // Save to JSON
        if (state.currentView === "home") renderHome();
        else if (state.currentView === "bookmarks") renderBookmarks();
      }
    }
    // Re-render the current view
    if (state.currentView === "home") {
      renderHome();
    } else if (state.currentView === "bookmarks") {
      renderBookmarks();
    }
  }
}
// Bookmark Project
function bookmarkProject(id) {
  const project = projects.find((p) => p.id === id);
  if (!state.bookmarks.some((p) => p.id === id)) {
    state.bookmarks.push(project);
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
  }
}

// Routing
function router(view) {
  state.currentView = view;
  if (view === "home") renderHome();
  else if (view === "bookmarks") renderBookmarks();
  else if (view === "create") renderCreateProject();
}

// Event Listeners for Navigation
document.querySelectorAll("[data-route]").forEach((button) => {
  button.addEventListener("click", (event) => {
    const view = event.target.getAttribute("data-route");
    router(view);
  });
});

// Search Functionality
document.getElementById("search").addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(query)
  );
  app.innerHTML = `<h2>Search Results</h2>`;
  filtered.forEach((project) => {
    app.innerHTML += `
      <div class="project-card">
      <img src="${project.image || "placeholder.jpg"}" alt="${
      project.title
    }" style="max-width: 100%;"><br>
        <h3>${project.title}</h3>
        <p>Difficulty: ${project.difficulty}</p>
      </div>
    `;
  });
});

// Initial Render
router("home");
