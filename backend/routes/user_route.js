const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

// importation du controller des user
const user_controller = require('../controllers/user_controller');

//importation des middlewares pour la verification des données saisi par l'utilisateur
const {signupValidator, checkValidatorResult} = require('../middlewares/signupValidator');
const{loginValidator} = require('../middlewares/loginValidator');



//configuration des routes pour l'authentification
router.post('/signup', signupValidator, checkValidatorResult ,user_controller.signup);
router.get('/confirm/:token', user_controller.confirmEmail);
router.post('/login',loginValidator, checkValidatorResult, user_controller.login);
router.get('/:id', auth, user_controller.getUserInformations);
router.delete('/:id', auth, user_controller.deleteUser);




module.exports = router;