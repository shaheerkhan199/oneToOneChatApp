const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const chatSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = model('Chat', chatSchema);