const http = require('http');
const dotenv = require('dotenv');
const app = require("./app");

//import des informations du fichier de paramétrage .env
dotenv.config();

//Utilisation du port de .env et creation du serveur
const PORT = process.env.PORT || 5500;

const server = http.createServer(app);
server.listen(PORT, '0.0.0.0', () =>{
    console.log(`server running on port ${PORT}`);
})
