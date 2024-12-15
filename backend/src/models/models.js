
// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
console.log("user created after model: ",User);

// export default User;
module.exports = User;