const catchAsync =  require('../utils/catchAsync');
const AppError =  require('../utils/AppError');

const Signal =  require('../models/signalModel');
const Factory  =  require('../controllers/factoryController')
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



    exports.verifyUser = (req,res) =>  {
        const data = JSON.stringify(req.body);
      
      fs.writeFile(filePath, data, (error) => {
        if (error) {
          console.error('An error occurred:', error);
          res.status(500).send('An error occurred while saving the data.');
        } else {
            res.status(201).json({
                status : 'success',
                data : {
                    data
                }
            })
          console.log('Data has been saved to data.json');
        }
      });
    }
    
    exports.readFileData  =  (req,res) =>  {
    const  data =     fs.readFile('../../data.json', 'utf8', (error, data) => {
            if (error) {
              console.error('An error occurred:', error);
            } 
            const results =  JSON.parse(data)
            res.status(200).json({
                status : "success",
                data : {
                    results
                }
            })  
          });
    }
exports.readSignal = Factory.getAll(Signal)

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