// Dailist - RESTful API Backend (Trello / Todoist Style)
// Arsitektur MVC / Layered (Pertemuan 6-7 PAW II)

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Import Routes
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Root Endpoint - Dokumentasi Ringkas API
app.get("/", (req, res) => {
  res.json({
    app: "Dailist API",
    description: "Welcome to the Dailist RESTful API Task Management (*・ω・)ﾉ",
    version: "1.0.0",
    endpoints: {
      users: "/users",
      projects: "/projects",
      tasks: "/tasks"
    }
  });
});

// Register Endpoints
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

// 404 Handler untuk rute yang tidak dikenal
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan (⊙_⊙) ERR 404" });
});

// Jalankan Server
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server Dailist berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;
