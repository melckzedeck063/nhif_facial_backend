const express =  require('express');


const router =  express.Router();


const RequestController = require('../controllers/requestController');
const AuthController  =   require('../controllers/AuthController')

router.use(AuthController.protect);

router.post('/new_request',RequestController.newRequest);
router.get('/all_requests', RequestController.getAllRequests);


module.exports  =  router;