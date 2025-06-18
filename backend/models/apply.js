const mongoose = require('mongoose');

const applySchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
     statut: {
        type: String,
        enum: ['Reponse attendu', 'validé', 'rejeté'],
        default: 'Reponse attendu'
    },
    commentaire_admin: {
        type: String,
        default: ''
    },
    classroomAsked: {
        type: String,
        required: true
    },
    levelAsked: {
        type: String,
        required: true
    },
    documents: [
        {
            type: String // stocke le chemin vers le fichier
        }
    ],
    date_inscription: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Apply', applySchema)