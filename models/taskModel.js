// Model: Task / Todo
// Mengelola item tugas (mirip Card di Trello / Task di Todoist)

let tasks = [
  {
    id: "TSK-001",
    title: "Menyusun Postman Collection Tugas 2",
    description: "Buat request untuk seluruh endpoint CRUD dan assertion test script",
    status: "in_progress", // 'todo' | 'in_progress' | 'done'
    priority: "high",      // 'low' | 'medium' | 'high'
    dueDate: "2026-10-20",
    projectId: "PRJ-001",
    userId: "826240001",
    createdAt: "2026-10-12T10:00:00.000Z"
  },
  {
    id: "TSK-002",
    title: "Refactor API ke Arsitektur MVC",
    description: "Pecah app.js monolithic menjadi route, controller, dan model",
    status: "done",
    priority: "high",
    dueDate: "2026-10-15",
    projectId: "PRJ-001",
    userId: "826240001",
    createdAt: "2026-10-12T11:00:00.000Z"
  },
  {
    id: "TSK-003",
    title: "Desain Wireframe Dashboard Dailist",
    description: "Buat mockup Kanban board dan list view",
    status: "todo",
    priority: "medium",
    dueDate: "2026-10-25",
    projectId: "PRJ-002",
    userId: "826240002",
    createdAt: "2026-10-13T14:30:00.000Z"
  },
  {
    id: "TSK-004",
    title: "Jogging Pagi 30 Menit",
    description: "Rute taman kota minimal 3 km",
    status: "todo",
    priority: "low",
    dueDate: "2026-10-16",
    projectId: "PRJ-003",
    userId: "826240001",
    createdAt: "2026-10-14T05:00:00.000Z"
  }
];

const taskModel = {
  findAll: () => {
    return tasks;
  },

  findById: (id) => {
    return tasks.find((item) => item.id === String(id));
  },

  findByProjectId: (projectId) => {
    return tasks.filter((item) => item.projectId === String(projectId));
  },

  findByUserId: (userId) => {
    return tasks.filter((item) => item.userId === String(userId));
  },

  create: (data) => {
    tasks.push(data);
    return data;
  },

  update: (id, updateData) => {
    const index = tasks.findIndex((item) => item.id === String(id));
    if (index === -1) return null;

    tasks[index] = { ...tasks[index], ...updateData, id: tasks[index].id };
    return tasks[index];
  },

  delete: (id) => {
    const index = tasks.findIndex((item) => item.id === String(id));
    if (index === -1) return false;

    tasks.splice(index, 1);
    return true;
  }
};

module.exports = taskModel;
