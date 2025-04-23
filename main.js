let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

// Save tasks to localStorage
function saveTasks() {
  let tasks = [];
  let taskElements = document.querySelectorAll("#taskList li span.task-text");
  taskElements.forEach((taskElement) => {
    tasks.push(taskElement.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage and create task elements
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const taskArray = JSON.parse(savedTasks);
    taskArray.forEach((taskText) => {
      createTaskElement(taskText);
    });
  }
}

// Create a task list item element with edit and delete buttons
function createTaskElement(taskText) {
  let li = document.createElement("li");

  let span = document.createElement("span");
  span.textContent = taskText;
  span.className = "task-text";

  let actions = document.createElement("div");
  actions.className = "actions"; // Changed from "action" to "actions" to match CSS

  // Edit button
  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.onclick = function () {
    editTask(li, span);
  };

  // Delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function () {
    li.remove();
    saveTasks(); // Save after deletion to persist changes
  };

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);
}

// Add a new task from the input field
function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === "") return;
  createTaskElement(taskText);
  taskInput.value = "";
  saveTasks();
}

// Edit an existing task
function editTask(li, span) {
  const originalText = span.textContent;

  const input = document.createElement("input");
  input.type = "text";
  input.value = originalText;
  input.className = "edit-input";

  span.replaceWith(input);
  input.focus();

  const saveEdit = () => {
    const newText = input.value.trim();
    if (newText !== "") {
      span.textContent = newText;
    }
    input.replaceWith(span);
    saveTasks(); // Save after editing to persist changes
  };

  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      input.replaceWith(span);
    }
  });

  input.addEventListener("blur", saveEdit);
}

// Event listener for Enter key on input field to add task
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Load tasks when DOM content is loaded
document.addEventListener("DOMContentLoaded", loadTasks);
