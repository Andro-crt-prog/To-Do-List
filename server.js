const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3007;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a route to get tasks
app.get('/tasks', (req, res) => {
    fs.readFile(path.join(__dirname, 'tasks.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading tasks');
        } else {
            try {
                const tasks = JSON.parse(data);
                res.json(tasks);
            } catch (e) {
                res.json([]);
            }
        }
    });
});

// Define a route to add a task
app.post('/tasks', (req, res) => {
    const newTask = req.body;
    fs.readFile(path.join(__dirname, 'tasks.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading tasks');
        } else {
            let tasks;
            try {
                tasks = JSON.parse(data);
                if (!Array.isArray(tasks)) {
                    tasks = [];
                }
            } catch (e) {
                tasks = [];
            }
            tasks.push(newTask);
            fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks), (err) => {
                if (err) {
                    res.status(500).send('Error saving task');
                } else {
                    res.status(201).send('Task added');
                }
            });
        }
    });
});

// Define a route to update a task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const updatedTask = req.body;
    fs.readFile(path.join(__dirname, 'tasks.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading tasks');
        } else {
            let tasks;
            try {
                tasks = JSON.parse(data);
                if (!Array.isArray(tasks)) {
                    tasks = [];
                }
            } catch (e) {
                tasks = [];
            }
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex] = updatedTask;
                fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks), (err) => {
                    if (err) {
                        res.status(500).send('Error updating task');
                    } else {
                        res.status(200).send('Task updated');
                    }
                });
            } else {
                res.status(404).send('Task not found');
            }
        }
    });
});

// Define a route to delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    fs.readFile(path.join(__dirname, 'tasks.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading tasks');
        } else {
            let tasks;
            try {
                tasks = JSON.parse(data);
                if (!Array.isArray(tasks)) {
                    tasks = [];
                }
            } catch (e) {
                tasks = [];
            }
            tasks = tasks.filter(task => task.id !== taskId);
            fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks), (err) => {
                if (err) {
                    res.status(500).send('Error deleting task');
                } else {
                    res.status(200).send('Task deleted');
                }
            });
        }
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});