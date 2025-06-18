const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
//__________________________________________________controller du signUp_____________________________________________________
exports.signup = (req, res, next) =>{
    User.findOne({email: req.body.email})
    .then(existingUser =>{
        if(existingUser){
            res.status(401).json({message: "cet utilisateur existe déja"});
        }else{
            //hash du mot de passe
            bcrypt.hash(req.body.password, 10)
            .then(hash =>{
                //création du token de confirmation
                const confirmationToken = crypto.randomBytes(32).toString('hex');
                const newUser = new User({
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    password: hash,
                    confirmationToken: confirmationToken,
                    isConfirmed: false,
                    isAdmin: false,
                });
                newUser.save()
                .then(()=>{
                    //Envoi de l'email de confirmation 
                                //configuration du transporteur
                                const transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth:{
                                        user: process.env.EMAIL,
                                        pass: process.env.EMAIL_PASS
                                    }
                                });
                                //configuration des options du mail
                                const mailOptions = {
                                from: `no-reply-eStudentGest <${process.env.EMAIL}>`,
                                to: newUser.email,
                                subject: "Confirmation de votre inscription",
                                html:  `
                                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                                        <div style="text-align: center; margin-bottom: 20px;">
                                            <img src="https://kosysdev.github.io/KoSysDev_site/img/eStudentGest.PNG" alt="Logo RailWay Booking" style="width: 350px; height: auto; margin-left: 1%">
                                        </div>
                                        <h2 style="text-align: center;">Bienvenue sur eStudentGest!</h2>
                                        <p style="text-align: left;">Merci de vous être inscrit. Pour confirmer votre adresse email, veuillez cliquer sur le bouton ci-dessous :</p>
                                        <div style="text-align: center; margin: 20px;">
                                            <a href="${process.env.BASE_URL}/confirm/${confirmationToken}" onclick="window.location.href=this.href" style="background-color: #28a745; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirmer Email</a>
                                        </div>
                                        <p style="text-align: center;">Si vous n'avez pas créé de compte, veuillez ignorer cet email.</p>
                                        <div style="text-align: center; margin-top: 40px; font-size: 12px; color: #aaa;">
                                            <p>&copy; 2025 eStudentGest. Tous droits réservés.</p>
                                        </div>
                                    </div>
                                `
                                };
                                //envoi du mail de confirmation
                                transporter.sendMail(mailOptions, (error, info)=>{
                                    if(error){
                                        console.error(error);
                                        return res.status(500).json({error: "Erreur lors de l'envoi de l'email de confirmation"});
                                    }else{
                                        res.status(201).json({ message: 'Veuillez vérifier votre boite mail pour confirmer votre inscription.' });
                                    }
                                });
                })
                .catch(error=>{
                    console.error(error);
                    res.status(401).json({message: 'Erreur lors de la sauvegarde de l\'utilisateur'})
                })
            })
            .catch(error =>{
                console.error(error);
                res.status(401).json({message: 'Erreur lors du hash du mot de passe'});
            })

        }
    })
    .catch(error =>{
        console.error(error);
        res.status(500).json({error: 'Erreur lors de la vérification de l\'email'})
    })
};


//__________________________________________________controller pour la confirmation de l'email_____________________________________________________
exports.confirmEmail = (req, res, next) =>{
    User.findOne({confirmationToken: req.params.token})
    .then(user =>{
        if(!user){
            console.error("Token invalide ou expiré");
            return res.status(400).json({message: "Token invalide ou expiré"})
        }else{
            user.isConfirmed = true;
            user.confirmationToken = null;
            user.save()
            .then(()=>{
                //Création du token pour la connexion automatique
                //authentifier immédiatement l’utilisateur après la confirmation.
                const payload = {
                    user:{
                        id: user.id,
                        nom: user.nom,
                        prenom: user.prenom
                    }
                }
                jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'}, (error, token)=>{
                    if (error) throw error;
                    res.status(201).json({token, message: "Email confirmé avec succès"});
                } )
                //fin de gestion du token
            })
            .catch(error =>{
                console.error(error);
                res.status(500).json({message: "Erreur lors de la confirmation de l'email"})
            })

        }
    })
    .catch(error =>{
        console.error(error);
        res.status(500).json({message: "Erreur lors de la verification du token"})
    })
};


//__________________________________________________controller du login_____________________________________________________

exports.login = (req, res, next) => {
    
    User.findOne({email: req.body.email})
    .then(existingUser => {
        if(!existingUser){
            res.status(401).json({message: 'Aucun utilisateur trouvé pour vos entrés'});
        }else{
            if (!existingUser.isConfirmed) {
                return res.status(401).json({ message: 'Veuillez confirmer votre email avant de vous connecter' });
            }
            bcrypt.compare(req.body.password, existingUser.password)
            .then(valid =>{
                if(!valid){
                    res.status(401).json({message: 'Email ou mot de passe incorrect'});
                }else{
                    //Création du token
                    const payload = {
                        user:{
                            id: existingUser.id,
                            nom: existingUser.nom,
                            prenom: existingUser.prenom
                        }
                    }
                    jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'}, (error, token)=>{
                        if (error) throw error;
                        // Envoyer la réponse avec le token et l'email ou le nom, ca depend de moi et de ce que je veux afficher quand l'utilisateur est connecté
                        // moi ici je veux afficher l'email, et un petit logo d'user dans le front.
                        res.status(201).json({token, email: existingUser.email, nom: existingUser.nom, prenom: existingUser.prenom, id: existingUser._id, isAdmin: existingUser.isAdmin});
                    } )
                    //fin de gestion du token
                }
            })
            .catch(error => {
                console.error(error)
                res.status(401).json({error: 'Erreur lors de la vérification des informations1'})
            });
        }
    })
    .catch(error => {
        console.error(error)
        res.status(500).json({error: 'Erreur lors de la vérification des informations0'})
    })
};


//_____________________________________Obtenir les informations d'un utilisateur_________________________________________

exports.getUserInformations = (req, res, next) => {
    User.findOne({ _id: req.params.id })
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'Utilisateur non trouvé !' });
        }
        res.status(200).json(user);
      })
      .catch(error => res.status(500).json({ error }));
  };
  
  //_______________________________________________Supprimer un utilisateur___________________________________________________

  exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
      .catch(error => res.status(400).json({ error }));
  };

  //_______________________________________________Supprimer tous les utilisateurs___________________________________________________

 /* exports.deleteAllUser = (req, res, next) => {
    User.deleteMany()
      .then(() => {
        res.status(200).json({ message: "Tous les utilisateurs ont été supprimés avec succès." });
      })
      .catch(error => {
        res.status(500).json({ error: "Une erreur s'est produite lors de la suppression des utilisateurs." });
      });
  };*/