const taskInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description");
const categorySelect = document.getElementById("task-category");
const taskList = document.getElementById("tasks");
const themeToggle = document.getElementById("theme-toggle");

let tasks = [];

function addTask() {
  const title = taskInput.value.trim();
  const description = taskDescriptionInput.value.trim();
  const category = categorySelect.value;

  if (title) {
    const task = {
      id: Date.now(),
      title: title,
      description: description,
      category: category,
      completed: false,
    };
    tasks.push(task);
    updateTaskList();
    clearInputs();
  }
}

function updateTaskList() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = `${task.title} (${task.category})`;
    if (task.completed) {
      taskItem.classList.add("completed");
    }
    taskItem.addEventListener("click", () => toggleTaskCompletion(task.id));
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    });
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

function toggleTaskCompletion(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    updateTaskList();
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter((t) => t.id !== taskId);
  updateTaskList();
}

function clearInputs() {
  taskInput.value = "";
  taskDescriptionInput.value = "";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

document.getElementById("add-task").addEventListener("click", addTask);
themeToggle.addEventListener("click", toggleTheme);
