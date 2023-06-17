const express = require('express');

const router =   express.Router();
const SignalController =  require('../controllers/SignalController')

router.post('/new_signal', SignalController.createSignal);
router.post('/verify_signal', SignalController.verifyUser);
router.get('/read_signal', SignalController.getCurrentSignal)
router.get('/read_file', SignalController.readFileData)

router.delete('/delete', SignalController.deleteSignal)

module.exports =  router;