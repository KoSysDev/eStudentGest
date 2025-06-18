const mongoose = require('mongoose');

//création du model pour le stockage des utilisateurs
const userSchema = mongoose.Schema({
    nom:{
        type: String,
        required: true,
    },

    prenom:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },

    password:{
        type: String,
        required: true,
    },

    confirmationToken: { 
        type: String 
    },

    isConfirmed: {
        type: Boolean, 
        default: false
    },

    isAdmin:{
        type: Boolean,
        default: false,
    }

});
module.exports = mongoose.model('User', userSchema);