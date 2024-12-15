// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    owner: {
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
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

// export default Project;
module.exports = Project;