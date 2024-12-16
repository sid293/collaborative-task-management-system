const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project');

router.post('/create', async (req, res) => {
    const { taskId, projectId, title, description, status, deadline, assignedUser } = req.body;
    const username = req.user;
    try {
        console.log("projectId username: ",projectId,username);
        const project = await Project.findOne({ projectId, owner: username });
        console.log("project: ",project);
        if (!project) {
            return res.status(403).json({ error: 'Unauthorized to create task for this project' });
        }
        const newTask = new Task({
            taskId,
            projectId,
            title,
            description,
            status,
            deadline,
            assignedUser
        });
        console.log("newtask: ",newTask);
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: 'Invalid data', message: error.message });
    }
});

router.get('/readAll', async (req, res) => {
    try {
        const tasks = await Task.find().select('-__v');
        res.status(200).json(tasks);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: 'Invalid data', message: error.message });
    }
});

// {
//     "taskId": "39829",
// }
router.get('/readById', async (req, res) => {
    const { taskId } = req.query;
    try {
        const task = await Task.findOne({ taskId }).select('-__v');
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: 'Invalid data', message: error.message });
    }
});

// {
//     "taskId": "39829",
//     "projectId": "39829",
//     "task": {
//         "title": "task1",
//         "description": "task1 description",
//         "status": "in progress",
//         "deadline": "2023-02-20T00:00:00.000Z",
//         "assignedUser": "user1"
//     }
// }
router.put('/update', async (req, res) => {
    const { taskId, projectId, task } = req.body;
    const username = req.user;
    try {
        const project = await Project.findOne({ projectId, owner: username });
        if (!project) {
            return res.status(403).json({ error: 'Unauthorized to update task for this project' });
        }
        const updatedTask = await Task.findOneAndUpdate(
            { taskId, projectId },
            { $set: task },
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: 'Invalid data', message: error.message });
    }
});

router.delete('/delete', async (req, res) => {
    const { taskId, projectId } = req.body;
    const username = req.user;
    try {
        const project = await Project.findOne({ projectId, owner: username });
        if (!project) {
            return res.status(403).json({ error: 'Unauthorized to delete task for this project' });
        }
        const deletedTask = await Task.findOneAndRemove({ taskId, projectId });
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: 'Invalid data', message: error.message });
    }
});

router.put('/changeStatus', async (req, res) => {
    const { taskId, status } = req.body;
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { taskId },
            { $set: { status } },
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        const tasks = await Task.find().select('-__v');
        res.status(200).json(tasks);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: 'Invalid data', message: error.message });
    }
});

module.exports = router;
