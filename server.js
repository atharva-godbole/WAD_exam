const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

// Path to your local bootstrap folder as requested
app.use('/bs5', express.static(path.join(__dirname, '../bs5')));

// In-memory "database"
let tasks = [
    { id: 1, text: "Learn AJAX", completed: false }
];

// 1. GET: Fetch all tasks
app.get('/tasks', (req, res) => res.json(tasks));

// 2. POST: Add a new task
app.post('/tasks', (req, res) => {
    const newTask = { 
        id: Date.now(), 
        text: req.body.text, 
        completed: false 
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 3. PUT: Update text or status
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (task) {
        if (req.body.text !== undefined) task.text = req.body.text;
        if (req.body.completed !== undefined) task.completed = req.body.completed;
        res.json(task);
    } else {
        res.status(404).send("Task not found");
    }
});


// 4. DELETE: Remove task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.status(204).send();
});

app.listen(3000, () => console.log('Server running: http://localhost:3000'));