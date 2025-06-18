const mongoose = require('mongoose');

const classroomSchema = mongoose.Schema({
    nom:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
    },
    capacite:{
        type: Number,
        required: true,
    },
    image:{
        type: String,
        default: '/assets/classroom.png',
    }
});

module.exports = mongoose.model('Classroom', classroomSchema);