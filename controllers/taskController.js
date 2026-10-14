// Controller: Task / Todo
// Menangani request-response dan validasi untuk entitas Task

const taskModel = require("../models/taskModel");
const projectModel = require("../models/projectModel");
const userModel = require("../models/userModel");

const taskController = {
  getAllTasks: (req, res) => {
    const { status, projectId, userId } = req.query;
    let tasks = taskModel.findAll();

    if (status) {
      tasks = tasks.filter((t) => t.status === status);
    }
    if (projectId) {
      tasks = tasks.filter((t) => t.projectId === projectId);
    }
    if (userId) {
      tasks = tasks.filter((t) => t.userId === userId);
    }

    res.status(200).json(tasks);
  },

  getTaskById: (req, res) => {
    const { id } = req.params;
    const task = taskModel.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    res.status(200).json(task);
  },

  createTask: (req, res) => {
    const {
      id,
      title,
      description = "",
      status = "todo",
      priority = "medium",
      dueDate = "",
      projectId,
      userId
    } = req.body;

    if (!id || !title || !projectId || !userId) {
      return res.status(400).json({
        message: "id, title, projectId, dan userId wajib diisi"
      });
    }

    if (taskModel.findById(id)) {
      return res.status(409).json({ message: "Task ID sudah digunakan" });
    }

    if (!projectModel.findById(projectId)) {
      return res.status(400).json({ message: "projectId yang direferensikan tidak valid / tidak ditemukan" });
    }

    if (!userModel.findById(userId)) {
      return res.status(400).json({ message: "userId yang direferensikan tidak valid / tidak ditemukan" });
    }

    const validStatuses = ["todo", "in_progress", "done"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "status harus salah satu dari: todo, in_progress, done" });
    }

    const validPriorities = ["low", "medium", "high"];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ message: "priority harus salah satu dari: low, medium, high" });
    }

    const newTask = {
      id: String(id),
      title,
      description,
      status,
      priority,
      dueDate,
      projectId: String(projectId),
      userId: String(userId),
      createdAt: new Date().toISOString()
    };

    const created = taskModel.create(newTask);
    res.status(201).json(created);
  },

  updateTask: (req, res) => {
    const { id } = req.params;
    const existing = taskModel.findById(id);

    if (!existing) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    if (req.body.status) {
      const validStatuses = ["todo", "in_progress", "done"];
      if (!validStatuses.includes(req.body.status)) {
        return res.status(400).json({ message: "status harus salah satu dari: todo, in_progress, done" });
      }
    }

    if (req.body.priority) {
      const validPriorities = ["low", "medium", "high"];
      if (!validPriorities.includes(req.body.priority)) {
        return res.status(400).json({ message: "priority harus salah satu dari: low, medium, high" });
      }
    }

    const updated = taskModel.update(id, req.body);
    res.status(200).json(updated);
  },

  deleteTask: (req, res) => {
    const { id } = req.params;
    const deleted = taskModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    res.status(204).send();
  }
};

module.exports = taskController;
