# DIY Projects Web Application

## Overview

The DIY Projects Web Application is a simple, user-friendly platform where users can discover, create, and manage various DIY projects. It features functionality for browsing projects, bookmarking favorites, creating new projects, and managing a collection of projects with ease. This application is built using HTML, CSS, and vanilla JavaScript, with data stored in a `data.json` file to simulate a lightweight backend.

---

## Features

### Core Features:

- **View Projects:** Users can browse through a list of DIY projects.
- **Search Projects:** Quickly find projects based on keywords in the title.
- **Bookmark Projects:** Save favorite projects for quick access.
- **Create Projects:** Add new projects by providing a title, difficulty level, required materials, and an optional image.
- **Delete Projects:** Remove unwanted projects from the list.

### Additional Features:

- **Responsive Design:** Ensures a smooth experience across devices.
- **Image Upload:** Supports project images via file uploads.
- **State Management:** Utilizes localStorage for bookmarks and in-memory storage for project data.

---

## Installation

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge).
- A local HTTP server (e.g., Live Server in VS Code) to serve the files and access `data.json` correctly.

### Steps to Run

1. Clone or download the repository.
2. Open the project folder.
3. Launch the application:
   - Use a tool like Live Server in VS Code to start a local HTTP server.
   - Alternatively, configure a lightweight backend (e.g., Node.js) for serving the files.
4. Open the application in your browser (e.g., `http://localhost:5500`).

---

## Project Structure

```
DIY-Projects-App/
|-- index.html       # Main HTML file
|-- styles.css       # Application styles
|-- app.js           # Core JavaScript logic
|-- data.json        # Simulated backend data
|-- assets/          # Images and other static files
    |-- placeholder.jpg
```

---

## Usage

### Viewing Projects

- Navigate to the homepage to view all available projects.
- Each project card displays a title, difficulty level, materials, and an optional image.

### Searching Projects

- Use the search bar at the top to filter projects by title.

### Bookmarking Projects

- Click the "Bookmark" button on a project card to save it to your favorites.
- Access your bookmarked projects via the "Favorites" section.

### Creating a New Project

1. Navigate to the "Create Project" page.
2. Fill in the required fields:
   - **Title**: Name of the project.
   - **Difficulty**: Difficulty level (e.g., Easy, Medium, Hard).
   - **Materials**: Comma-separated list of required materials.
   - **Image**: Optional image upload.
3. Click "Save Project" to add it to the list.

### Deleting Projects

- Click the "Delete" button on any project card to remove it from the list.

---

## Simulated Backend

The `data.json` file serves as the backend for this application. It contains a predefined list of projects and is loaded into the app at runtime. Modifications to the data (e.g., adding or deleting projects) are handled in-memory and logged to the console as JSON output for simulation.

### Sample `data.json`

```json
{
  "projects": [
    {
      "id": 1,
      "title": "Build a Birdhouse",
      "difficulty": "Easy",
      "materials": ["wood", "nails", "paint"],
      "image": "assets/birdhouse.jpg"
    },
    {
      "id": 2,
      "title": "Make a Bookshelf",
      "difficulty": "Medium",
      "materials": ["wood", "screws", "drill"],
      "image": "assets/bookshelf.jpg"
    }
  ]
}
```

---

## Future Enhancements

- Add a backend server for real data persistence.
- Enable user accounts for personalized project collections.
- Support editing of existing projects.
- Integrate additional media upload options, such as videos.
- Enhance search functionality with filters for difficulty and materials.

---

## License

This project is licensed under the MIT License. Feel free to use and modify it for personal or educational purposes.

---

## Contribution

If you would like to contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

---

Thank you for exploring the DIY Projects Web Application!
