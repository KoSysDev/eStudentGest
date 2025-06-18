const { body, validationResult } = require('express-validator');

exports.validateClassroom = [
    body('nom')
        .notEmpty().withMessage('Le nom est requis')
        .isLength({ min: 3 }).withMessage('Le nom doit contenir au moins 3 caractères'),

    body('description')
        .notEmpty().withMessage('La description est requise')
        .isLength({ min: 10 }).withMessage('La description doit être plus détaillée'),

    body('capacite')
        .notEmpty().withMessage('La capacité est requise')
        .isNumeric().withMessage('La capacité doit être un nombre')
        .isInt({ min: 1 }).withMessage('La capacité doit être au moins de 1')
];


exports.handleValidatorErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
        });
    }
    next();
};