const Classroom = require('../models/classrooms');

//Controller pour la création d'une nouvelle classe.
exports.createClassroom = (req, res, next)=>{
    Classroom.findOne({nom:req.body.nom})
    .then(existingClassroom =>{
        if(!existingClassroom){
            const newClass = new Classroom({
                nom: req.body.nom,
                description: req.body.description,
                capacite: req.body.capacite
            });
            newClass.save()
            .then(()=>{
                res.status(201).json({message: `la classe ${req.body.nom} a ete crée avec succès`})
            })
            .catch(error =>{
                console.error(error);
                res.status(500).json({message: 'Erreur lors de la sauvegarde de la classe'})
            })
        }else{
            console.log("Cette classe existe déjà!");
            res.status(409).json({message: 'Cette classe existe déjà vous ne pouvez pas la créer encore!'})
        }
    })
    .catch(error =>{
        console.error(error);
        res.status(500).json({message: 'Erreur pendant la creation de la classe'});
    })
};

// Controller pour afficher toutes les classes crées
exports.getAllClassrooms = (req, res, next) => {
    Classroom.find()
    .then(classrooms => {
        res.status(200).json({ 
            message: 'Liste des classes récupérée avec succès',
            data: classrooms
        });
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des classes" });
    });
};

// Controller pour afficher une classe spécifique
exports.getOneClassroom = (req, res, next) => {
    const classroomId = req.params.id;

    Classroom.findById(classroomId)
    .then(classroom => {
        if (!classroom) {
            return res.status(404).json({ message: "Classe non trouvée" });
        }
        res.status(200).json({ 
            message: "Classe récupérée avec succès",
            data: classroom 
        });
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération de la classe" });
    });
};


//Controller pour mettre à jour une classe spécifique
exports.updateClassroom = (req, res, next) => {
    // Mise à jour de la classe
    Classroom.updateOne({ _id: req.params.id },{ ...req.body, _id: req.params.id })
    .then(result => {
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Classe non trouvée' });
        }else{
            res.status(200).json({ message: 'La classe a été mise à jour avec succès' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ error: 'Erreur lors de la mise à jour de la classe' });
    });
};

//Controller pour supprimer une salle de classe
exports.deleteClassroom = (req, res, next) =>{
    Classroom.deleteOne({_id: req.params.id})
    .then(()=>{
        res.status(200).json({message: 'Classe supprimé avec succès'})
    })
    .catch(error =>{
        console.error(error);
        res.status(400).json({message: 'Erreur intervenu lors de la suppression de la classe'})
    })
};