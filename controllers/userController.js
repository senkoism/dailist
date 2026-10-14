// Controller: User
// Menangani request-response dan validasi untuk entitas User

const userModel = require("../models/userModel");

const userController = {
  getAllUsers: (req, res) => {
    const users = userModel.findAll();
    res.status(200).json(users);
  },

  getUserById: (req, res) => {
    const { id } = req.params;
    const user = userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json(user);
  },

  createUser: (req, res) => {
    const {
      id,
      fullname,
      username,
      email,
      phone_number,
      role = "user",
      is_active = true,
    } = req.body;

    if (!id || !fullname || !username || !email || !phone_number) {
      return res.status(400).json({
        message: "id, fullname, username, email, dan phone_number wajib diisi",
      });
    }

    if (!/^8\d{8}$/.test(String(id))) {
      return res.status(400).json({
        message: "id harus terdiri dari 9 digit dan diawali angka 8",
      });
    }

    if (userModel.findById(id)) {
      return res.status(409).json({ message: "id sudah digunakan" });
    }

    const newUser = {
      id: String(id),
      fullname,
      username,
      email,
      phone_number,
      role,
      is_active: Boolean(is_active),
    };

    const created = userModel.create(newUser);
    res.status(201).json(created);
  },

  updateUser: (req, res) => {
    const { id } = req.params;
    const updated = userModel.update(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json(updated);
  },

  deleteUser: (req, res) => {
    const { id } = req.params;
    const deleted = userModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(204).send();
  },
};

module.exports = userController;
