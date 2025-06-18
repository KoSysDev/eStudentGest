const Apply = require('../models/apply');
const multer = require('multer');
const path = require('path');

// Configuraion de multer pour la gestion des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads', 'documents')); // ce veut dire on stock les fichiers dans uploads/documents
  },
  filename: (req, file, cb) => {
    const userName = req.body.nom || 'utilisateur';
    const uniqueName = Date.now() + '-' + userName.replace(/\s+/g, '_') + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage }).array('documents');
//fin de la configuration 



// Controller pour créer une nouvelle inscription
exports.createApply = (req, res, next) => {
    //récupérons les fichiers
    upload(req, res, function(err){
        if (err) {
        console.error('Erreur Multer :', err);
        return res.status(400).json({ message: 'Erreur lors du téléchargement des fichiers' });
        }

        const filePaths = req.files.map(file => file.path.replace(/\\/g, '/'));

        const newApply = new Apply({
            user: req.body.user,
            /*statut: 'en attente',
            commentaire_admin: '',*/
            classroomAsked: req.body.classroomAsked,
            levelAsked: req.body.levelAsked,
            documents: filePaths
        });

        newApply.save()
        .then(()=>{
            res.status(201).json({message: 'inscription soumis avec succès!'})
        })
        .catch(error =>{
            console.error(error);
            res.status(500).json({message : 'Erreur survenue lors de la soumission de votre inscription'})
        })
    })

};


// Controller pour obtenir toutes les inscriptions pour les admins
exports.getAllApply = (req, res, next) => {
        Apply.find()
        .populate('user', 'nom prenom') // optionnel : affiche infos utilisateur
        .then(applies => {
            const formattedList = applies.map(apply => ({
                ...apply.toObject(),
                documents: apply.documents.map(doc =>
                    `${req.protocol}://${req.get('host')}/uploads/documents/${path.basename(doc)}`
                )
            }));

            res.status(200).json({
                message: "Liste des inscriptions récupérée",
                data: formattedList
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des inscriptions" });
        });
};

// Controller pour obtenir toutes les demandes d'inscription d'un utilisateur spécifique
exports.getApplyByUser = (req, res, next) => {
    const userId = req.params.userId;

    Apply.find({ user: userId })
        .populate('user', 'nom prenom')
        .then(applies => {
            if (applies.length === 0) {
                return res.status(404).json({ message: "Aucune inscription trouvée pour cet utilisateur." });
            }

            // Formatage des chemins des documents (optionnel)
            const formattedList = applies.map(apply => ({
                ...apply.toObject(),
                documents: apply.documents.map(doc =>
                    `${req.protocol}://${req.get('host')}/uploads/documents/${path.basename(doc)}`
                )
            }));

            res.status(200).json({
                message: "Demandes d'inscription de l'utilisateur récupérées avec succès",
                data: formattedList
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des inscriptions de l'utilisateur" });
        });
};


// Controller pour obtenir une seule inscription
exports.getOneApply = (req, res, next) => {
        Apply.findById(req.params.id)
        .populate('user', 'nom email')
        .then(apply => {
            if (!apply) {
                return res.status(404).json({ message: "Inscription non trouvée" });
            }

            //recuperation des paths des fichiers pour affichage dans le frontend
            const fullDocumentPaths = apply.documents.map(doc => {
                return `${req.protocol}://${req.get('host')}/uploads/documents/${path.basename(doc)}`;
            });

            res.status(200).json({ 
                message: "Inscription récupérée", 
                data: {
                    ...apply.toObject(),
                    documents: fullDocumentPaths,
                }
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération" });
        });
};

//Controller pour valider une inscription
exports.validApply = (req, res, next) => {
    Apply.updateOne({ _id: req.params.id },{ statut: "accepté", commentaire_admin: "Bon dossier, vous êtes accepté. félicitations!"})
    .then(() => {
        res.status(200).json({ message: "Inscription validée avec succès" });
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la validation de l'inscription" });
    });
};
//Controller pour rejeter une inscription
exports.dismissApply = (req, res, next) => {
    Apply.updateOne({ _id: req.params.id },{ statut: "refusé", commentaire_admin: "Niveau insuffisant au regard des autres candidature. Nous sommes désolé de vous annoncer que votre dossier n'a pas été retenu"})
    .then(() => {
        res.status(200).json({ message: "Inscription rejetée" });
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ message: "Erreur lors du rejet de l'inscription" });
    });
};
