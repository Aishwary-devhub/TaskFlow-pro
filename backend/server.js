const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/todoapp')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    },
});

const Task = mongoose.model('Task', taskSchema);

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const { name, description } = req.body;

    const newTask = new Task({
        name,
        description
    });

    await newTask.save();

    res.json(newTask);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: 'Deleted' });
});

app.put('/tasks/:id', async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        task.completed = !task.completed;

        await task.save();

        res.json(task);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(5000, () => {
    console.log('Server Running On Port 5000');
});