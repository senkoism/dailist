// Mini Project - RESTful API CRUD dengan Express.js
// Entitas: user (id 9 digit, fullname, username, email, phone_number, role, is_active)
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let user = [
  { id: "826240001", fullname: "Tantok", username: "tanwitz", email: "tantok.fake@gmail.com", phone_number: "0812-0000-1001", role: "admin", is_active: true },
  { id: "826240002", fullname: "Ariel", username: "senkoism", email: "ariel.fake@gmail.com", phone_number: "0812-0000-1002", role: "user", is_active: true },
  { id: "826240003", fullname: "Arvin", username: "roadmaker", email: "arvin.fake@gmail.com", phone_number: "0812-0000-1003", role: "user", is_active: true },
  { id: "826240004", fullname: "Devin", username: "dtan", email: "devin.fake@gmail.com", phone_number: "0812-0000-1004", role: "editor", is_active: true },
  { id: "826240005", fullname: "Derren", username: "rimuwu", email: "derren.fake@gmail.com", phone_number: "0812-0000-1005", role: "user", is_active: false },
  { id: "826240006", fullname: "Andrew", username: "notuser", email: "andrew.fake@gmail.com", phone_number: "0812-0000-1006", role: "user", is_active: true },
];

app.get("/user", (req, res) => {
  res.json(user);
});

app.get("/user/:id", (req, res) => {
  const data = user.find((item) => item.id === req.params.id);

  if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
  res.json(data);
});

app.post("/user", (req, res) => {
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
    return res.status(400).json({ message: "id harus terdiri dari 9 digit" });
  }

  if (user.some((item) => item.id === String(id))) {
    return res.status(409).json({ message: "id sudah digunakan" });
  }

  const dataBaru = {
    id: String(id),
    fullname,
    username,
    email,
    phone_number,
    role,
    is_active,
  };

  user.push(dataBaru);
  res.status(201).json(dataBaru);
});

app.put("/user/:id", (req, res) => {
  const index = user.findIndex((item) => item.id === req.params.id);

  if (index === -1) return res.status(404).json({ message: "Data tidak ditemukan" });

  user[index] = { ...user[index], ...req.body };
  res.json(user[index]);
});

app.delete("/user/:id", (req, res) => {
  const index = user.findIndex((item) => item.id === req.params.id);

  if (index === -1) return res.status(404).json({ message: "Data tidak ditemukan" });

  user.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
