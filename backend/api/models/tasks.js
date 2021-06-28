const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 256
    },
    description: {
        type: String,
        required: false,
        maxlength: 256
    },
    status: {
        type: String,
        required: false
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Group'
    }
});

mongoose.model('Task', taskSchema);