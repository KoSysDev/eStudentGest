//middleware pour verifier les entrées du client. Ne jamais faire confiance aux infos venant du client
const { body, validationResult } = require('express-validator');

// Validation pour le signup
exports.signupValidator = [
  body('nom').isString().withMessage('Le nom doit être une chaîne de caractères.'),
  body('prenom').isString().withMessage('Le prenom doit être une chaîne de caractères.'),
  body('email').isEmail().withMessage('Adresse e-mail invalide.'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.'),
];

exports.checkValidatorResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  next();
};