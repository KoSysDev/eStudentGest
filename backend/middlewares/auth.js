const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //récupération du token
    const token = req.headers.authorization.split(' ')[1];

    //décodage du token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //Mise en cache de l'id de l'user
    req.userData = { 
        userId: decodedToken.userId 
    };
    
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Authentification échouée !' });
  }
};
