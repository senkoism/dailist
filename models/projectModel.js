// Model: Project / Board
// Mengelola data project (mirip Board di Trello / Project di Todoist)

let projects = [
  {
    id: "PRJ-001",
    name: "Kuliah Pemrograman Web II",
    description: "Proyek akhir & tugas mandiri semester ini",
    color: "#4A90E2",
    userId: "826240001",
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "PRJ-002",
    name: "Pengembangan Dailist App",
    description: "Desain UI, API Backend, dan deployment",
    color: "#50E3C2",
    userId: "826240002",
    createdAt: "2026-10-05T09:30:00.000Z"
  },
  {
    id: "PRJ-003",
    name: "Daily Routine & Habit",
    description: "Target produktivitas harian dan olahraga",
    color: "#F5A623",
    userId: "826240001",
    createdAt: "2026-10-10T06:00:00.000Z"
  }
];

const projectModel = {
  findAll: () => {
    return projects;
  },

  findById: (id) => {
    return projects.find((item) => item.id === String(id));
  },

  findByUserId: (userId) => {
    return projects.filter((item) => item.userId === String(userId));
  },

  create: (data) => {
    projects.push(data);
    return data;
  },

  update: (id, updateData) => {
    const index = projects.findIndex((item) => item.id === String(id));
    if (index === -1) return null;

    projects[index] = { ...projects[index], ...updateData, id: projects[index].id };
    return projects[index];
  },

  delete: (id) => {
    const index = projects.findIndex((item) => item.id === String(id));
    if (index === -1) return false;

    projects.splice(index, 1);
    return true;
  }
};

module.exports = projectModel;
