const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    projectId: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Todo', 'InProgress', 'Completed'],
        trim: true
    },
    deadline: {
        type: Date,
        required: true
    },
    assignedUser: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
