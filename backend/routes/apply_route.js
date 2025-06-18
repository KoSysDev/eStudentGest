const express = require('express');
const router = express.Router();

const applyCtrl = require('../controllers/apply_controller');


router.post('/', applyCtrl.createApply);
router.get('/', applyCtrl.getAllApply);
router.get('/applyByUser/:userId', applyCtrl.getApplyByUser)
router.get('/:id', applyCtrl.getOneApply);
router.put('/valid/:id', applyCtrl.validApply);
router.put('/dismiss/:id', applyCtrl.dismissApply);


module.exports = router;