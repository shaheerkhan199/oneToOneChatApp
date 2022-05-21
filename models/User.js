const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    socketId: {
        type: String,
        required: false,
        default: null
    },
    lastText: {
        type: String,
        required: false,
        default: ""
    },
}, { timestamps: true });

module.exports = model('User', userSchema);