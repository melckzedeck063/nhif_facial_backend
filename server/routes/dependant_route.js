const express =  require('express');


const router  =  express.Router();

const AuthController =   require('../controllers/AuthController');

const DependantController =  require('../controllers/dependant_controller');


router.use(AuthController.protect)

router.post('/add_dependant', DependantController.registerDependant);
router.get('/dependannts', DependantController.getAllDependants);
router.get('/user_dependants/:id', DependantController.getMyDependants);
router.patch('/update_dependant/:id', DependantController.updateDependant);
router.delete('/delete_dependant/:id', DependantController.deleteDependant);

module.exports = router