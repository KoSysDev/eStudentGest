const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(bodyParser.json());
dotenv.config();

app.set('port', process.env.PORT|| 5500);

//Ajout des headers pour permettre la communication des api logé sur différents serveur. localhost:4200 et localhost:3000
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
// fin des headers nécessaires

//affichage de hello word quand le serveur est lancé
app.get('/', (req, res) => {
    res.send('le serveur backend de eStudentGest est en live ici!');
});

//connexion à la base de donnée mongoDB
mongoose.connect(process.env.mongoDB_CONNECT_KEY)
.then(()=> console.log("connexion réussi à votre base de donnée mongo DB✅"))
.catch((err)=> console.error("Echec lors de la connexion à la base de données mongoDB❌", err) )

//_____________________________________________importation des routes______________________________________________
const user_route =require('./routes/user_route');
const classroom_route = require('./routes/classroom_route')
const apply_route = require('./routes/apply_route');


//____________________________________________configuration des api_________________________________________________
app.use('/api/auth', user_route);
app.use('/api/classroom', classroom_route);
app.use('/api/apply', apply_route);

// Servir les fichiers statiques
app.use('/assets', express.static(path.join(__dirname, 'public/assets'))); //servir les images
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); //servir les fichiers


module.exports = app;