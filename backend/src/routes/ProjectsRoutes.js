const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.post('/create', async (req, res) => {
    // {
    //     "id": "39829",
    //     "title": "project3",
    //     "description": "project34 title"
    // }
    console.log("/create hit");
    const {projectId, title, description} = req.body;
    const username = req.user;
    try {
        const newProject = new Project({
            projectId:projectId,
            owner: username,
            title: title,
            description: description,
        });
        await newProject.save();
        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: 'Invalid data', message:error.message});
    }
});

router.get('/readAll', async (req, res) => {
    try {
        const projects = await Project.find().select('-__v');
        res.status(200).json(projects);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: 'Invalid data', message:error.message});
    }
});

router.post('/readById', async (req, res) => {
    const {id} = req.body;
    try {
        const project = await Project.findOne({projectId:id}).select('-__v -createdAt -updatedAt');
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        project.creationDate = project.createdAt;
        res.status(200).json(project);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: 'Invalid data', message:error.message});
    }
});

router.put('/update', async (req, res) => {
    const { projectId, project } = req.body;
    try {
        const updatedProject = await Project.findOneAndUpdate(
            { projectId },
            { $set: project },
            { new: true, runValidators: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: 'Invalid data', message:error.message});
    }
});

router.delete('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        const deletedProject = await Project.findOneAndRemove({ projectId:id });
        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: 'Invalid data', message:error.message});
    }
});


module.exports = router;

