const catchAsync =  require('../utils/catchAsync');
const AppError =  require('../utils/AppError');

const Signal =  require('../models/signalModel');
const Verify =  require('../models/verifyModel')
const Factory  =  require('../controllers/factoryController');

const fs = require('fs')
const filePath = './data.json'


exports.createSignal = catchAsync ( async (req,res,next) => {
    const  new_signal = await Signal.create(req.body);

    if(!new_signal){
        return next( new AppError("Failed to save new signal please try again",400))
    }

    res.status(201).json({
        status : "Success",
        message : "Signal saved succesfully",
        data : new_signal
    })
})

exports.verifyUser = Factory.createOne(Verify)

exports.readSignal =  Factory.getAll(Verify)
    
// exports.readSignal = Factory.getAll(Signal)

exports.getCurrentSignal = Factory.getAll(Signal)

exports.deleteSignal =  catchAsync( async (req,res,next) => {
    const signals =  await Signal.deleteMany();

    if(!signals){
        return next(new AppError('Request failed please try again', 400))
    }

    res.status(204).json({
        status : 'success',
        message : "Data succesfully deleted"
    })
})