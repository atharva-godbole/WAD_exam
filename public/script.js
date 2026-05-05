const taskList = document.getElementById('taskList');
window.onload = fetchTasks;

// 1. READ: Get all tasks from server
function fetchTasks() {
    fetch('/tasks')
        .then(res => res.json())
        .then(data => {
            taskList.innerHTML = '';
            data.forEach(task => renderTask(task));
        });
}

// 2. CREATE: Send new task to server
function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value) return;

    fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input.value })
    })
    .then(() => {
        input.value = '';
        fetchTasks();
    });
}

// 3. UPDATE: Send the changed text from the textbox to server
function saveTask(id) {
    // Find the specific textbox for this task ID
    const updatedText = document.getElementById(`input-${id}`).value;

    fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: updatedText })
    })
    .then(() => {
        alert("Task Updated!");
        fetchTasks();
    });
}

// 4. DELETE: Remove task from server
function deleteTask(id) {
    fetch(`/tasks/${id}`, { method: 'DELETE' })
        .then(() => fetchTasks());
}

// Helper: Creates the list item with a pre-filled textbox
function renderTask(task) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex gap-2 align-items-center';
    
    // We give the input a unique ID so saveTask() can find it
    console.log(task.id);
    li.innerHTML = `
        <input type="text" class="form-control" id="input-${task.id}" value="${task.text}">
        <button class="btn btn-primary btn-sm" onclick="saveTask(${task.id})">Save</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
}