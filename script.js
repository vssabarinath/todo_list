document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll(".task-item").forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector("span").textContent,
                completed: taskItem.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            const taskItem = createTaskElement(task.text, task.completed);
            taskList.appendChild(taskItem);
        });
    }

    function createTaskElement(taskText, completed = false) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        if (completed) {
            taskItem.classList.add("completed");
        }

        const taskContent = document.createElement("span");
        taskContent.textContent = taskText;

        const actionsContainer = document.createElement("div");
        actionsContainer.classList.add("task-actions");

        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = "✔️";
        completeBtn.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            saveTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "❌";
        deleteBtn.addEventListener("click", () => {
            taskItem.remove();
            saveTasks();
        });

        const editBtn = document.createElement("button");
        editBtn.innerHTML = "✏️";
        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit task:", taskContent.textContent);
            if (newText !== null) {
                taskContent.textContent = newText;
                saveTasks();
            }
        });

        actionsContainer.append(completeBtn, editBtn, deleteBtn);
        taskItem.append(taskContent, actionsContainer);

        return taskItem;
    }

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const taskItem = createTaskElement(taskText);
            taskList.appendChild(taskItem);
            taskInput.value = "";
            saveTasks();
        }
    });

    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTaskBtn.click();
        }
    });

    loadTasks();
});
