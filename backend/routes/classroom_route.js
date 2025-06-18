const express = require('express');
const router = express.Router();

const classroomCtrl = require('../controllers/classroom_controller');
const {validateClassroom, handleValidatorErrors} = require('../middlewares/classroomValidator');

router.post('/', validateClassroom, handleValidatorErrors, classroomCtrl.createClassroom);
router.get('/', classroomCtrl.getAllClassrooms);
router.get('/:id', classroomCtrl.getOneClassroom);
router.put('/:id', validateClassroom, handleValidatorErrors, classroomCtrl.updateClassroom);
router.delete('/:id', classroomCtrl.deleteClassroom);

module.exports = router;
