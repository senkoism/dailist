// Model: User
// Mengelola data in-memory user untuk aplikasi Dailist

let users = [
  { id: "826240001", fullname: "Tantok", username: "tanwitz", email: "tantok.fake@gmail.com", phone_number: "0812-0000-1001", role: "admin", is_active: true },
  { id: "826240002", fullname: "Ariel", username: "senkoism", email: "ariel.fake@gmail.com", phone_number: "0812-0000-1002", role: "user", is_active: true },
  { id: "826240003", fullname: "Arvin", username: "roadmaker", email: "arvin.fake@gmail.com", phone_number: "0812-0000-1003", role: "user", is_active: true },
  { id: "826240004", fullname: "Devin", username: "dtan", email: "devin.fake@gmail.com", phone_number: "0812-0000-1004", role: "editor", is_active: true },
  { id: "826240005", fullname: "Derren", username: "rimuwu", email: "derren.fake@gmail.com", phone_number: "0812-0000-1005", role: "user", is_active: false },
  { id: "826240006", fullname: "Andrew", username: "notuser", email: "andrew.fake@gmail.com", phone_number: "0812-0000-1006", role: "user", is_active: true },
];

const userModel = {
  findAll: () => {
    return users;
  },

  findById: (id) => {
    return users.find((item) => item.id === String(id));
  },

  findByEmail: (email) => {
    return users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  },

  create: (data) => {
    users.push(data);
    return data;
  },

  update: (id, updateData) => {
    const index = users.findIndex((item) => item.id === String(id));
    if (index === -1) return null;

    users[index] = { ...users[index], ...updateData, id: users[index].id };
    return users[index];
  },

  delete: (id) => {
    const index = users.findIndex((item) => item.id === String(id));
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
  },
};

module.exports = userModel;
