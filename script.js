
const STORAGE_KEY = "taskflow_tasks";
let tasks = [];


function loadTasks() {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
        try {
            tasks = JSON.parse(stored);
        } catch (error) {
            tasks = [];
        }
    }
}


function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function genId() {
    return Date.now() + "_" + Math.random().toString(36).slice(2, 7);
}


function fmt(timestamp) {
    return new Date(timestamp).toLocaleString("en-ZA", {
        dateStyle: "short",
        timeStyle: "short"
    });
}


document.getElementById("today-date").textContent =
    new Date().toLocaleDateString("en-ZA", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

/* -----------------------------
   Add Task
----------------------------- */
function addTask() {

    const input = document.getElementById("task-input");
    const text = input.value.trim();

    if (text === "") {
        input.focus();
        return;
    }

    tasks.unshift({
        id: genId(),
        text: text,
        done: false,
        addedAt: Date.now(),
        doneAt: null
    });

    input.value = "";

    save();
    render();

    input.focus();
}


function toggleTask(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) return;

    task.done = !task.done;
    task.doneAt = task.done ? Date.now() : null;

    save();
    render();
}


function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    save();
    render();
}


function startEdit(id) {

    const listItem = document.getElementById("task-" + id);

    const task = tasks.find(task => task.id === id);

    const top = listItem.querySelector(".task-top");

    top.innerHTML = `
        <input
            class="edit-input"
            id="edit-${id}"
            value="${escHtml(task.text)}"
            maxlength="200">
    `;

    const actions = document.createElement("div");

    actions.className = "edit-actions";

    actions.innerHTML = `
        <button class="btn btn-sm btn-save" id="save-${id}">
            Save
        </button>

        <button class="btn btn-sm btn-cancel" id="cancel-${id}">
            Cancel
        </button>
    `;

    listItem.appendChild(actions);

    document
        .getElementById("save-" + id)
        .addEventListener("click", () => saveEdit(id));

    document
        .getElementById("cancel-" + id)
        .addEventListener("click", render);

    document.getElementById("edit-" + id).focus();
}


function saveEdit(id) {

    const input = document.getElementById("edit-" + id);

    const text = input.value.trim();

    if (text === "") return;

    const task = tasks.find(task => task.id === id);

    task.text = text;

    save();
    render();
}


function escHtml(str) {

    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function render() {

    const pending = tasks.filter(task => !task.done);
    const completed = tasks.filter(task => task.done);

    document.getElementById("pending-count").textContent =
        pending.length + " pending";

    document.getElementById("done-count").textContent =
        completed.length + " completed";

    renderList(
        "pending-list",
        "pending-empty",
        pending,
        false
    );

    renderList(
        "done-list",
        "done-empty",
        completed,
        true
    );
}


function renderList(listId, emptyId, items, isDone) {

    const list = document.getElementById(listId);

    list.querySelectorAll(".task-item").forEach(item => item.remove());

    const empty = document.getElementById(emptyId);

    empty.style.display = items.length ? "none" : "block";

    items.forEach(task => {

        const li = document.createElement("li");

        li.className = "task-item" + (task.done ? " done" : "");

        li.id = "task-" + task.id;

        li.innerHTML = `
            <div class="task-top">

                <span class="task-text">
                    ${escHtml(task.text)}
                </span>

                <div class="task-actions"></div>

            </div>

            <div class="task-meta">

                <span>
                    Added: ${fmt(task.addedAt)}
                </span>

                ${
                    task.doneAt
                        ? `<span>Completed: ${fmt(task.doneAt)}</span>`
                        : ""
                }

            </div>
        `;

        const actions = li.querySelector(".task-actions");

        /* Complete / Undo */

        const toggleButton = document.createElement("button");

        toggleButton.className =
            "btn btn-sm " +
            (isDone ? "btn-undo" : "btn-success");

        toggleButton.textContent =
            isDone ? "↩ Undo" : "✓ Done";

        toggleButton.addEventListener("click", () => {
            toggleTask(task.id);
        });

        actions.appendChild(toggleButton);

        /* Edit Button */

        if (!isDone) {

            const editButton = document.createElement("button");

            editButton.className =
                "btn btn-sm btn-edit";

            editButton.textContent = "Edit";

            editButton.addEventListener("click", () => {
                startEdit(task.id);
            });

            actions.appendChild(editButton);
        }

        /* Delete Button */

        const deleteButton = document.createElement("button");

        deleteButton.className =
            "btn btn-sm btn-delete";

        deleteButton.textContent = "✕";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        actions.appendChild(deleteButton);

        list.appendChild(li);

    });
}



document
    .getElementById("add-btn")
    .addEventListener("click", addTask);

document
    .getElementById("task-input")
    .addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            addTask();
        }

    });



loadTasks();
render();