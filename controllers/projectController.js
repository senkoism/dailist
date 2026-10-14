// Controller: Project / Board
// Menangani request-response dan validasi untuk entitas Project

const projectModel = require("../models/projectModel");
const userModel = require("../models/userModel");

const projectController = {
  getAllProjects: (req, res) => {
    const { userId } = req.query;
    if (userId) {
      const filtered = projectModel.findByUserId(userId);
      return res.status(200).json(filtered);
    }
    const projects = projectModel.findAll();
    res.status(200).json(projects);
  },

  getProjectById: (req, res) => {
    const { id } = req.params;
    const project = projectModel.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project tidak ditemukan" });
    }

    res.status(200).json(project);
  },

  createProject: (req, res) => {
    const { id, name, description = "", color = "#4A90E2", userId } = req.body;

    if (!id || !name || !userId) {
      return res.status(400).json({
        message: "id, name, dan userId wajib diisi"
      });
    }

    if (projectModel.findById(id)) {
      return res.status(409).json({ message: "Project ID sudah digunakan" });
    }

    if (!userModel.findById(userId)) {
      return res.status(400).json({ message: "userId yang direferensikan tidak valid / tidak ditemukan" });
    }

    const newProject = {
      id: String(id),
      name,
      description,
      color,
      userId: String(userId),
      createdAt: new Date().toISOString()
    };

    const created = projectModel.create(newProject);
    res.status(201).json(created);
  },

  updateProject: (req, res) => {
    const { id } = req.params;
    const updated = projectModel.update(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Project tidak ditemukan" });
    }

    res.status(200).json(updated);
  },

  deleteProject: (req, res) => {
    const { id } = req.params;
    const deleted = projectModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Project tidak ditemukan" });
    }

    res.status(204).send();
  }
};

module.exports = projectController;
