const catchAsync  =  require('../utils/catchAsync');
const AppError  =  require('../utils/AppError');

const Request =  require('../models/requestModel');


// const sendResponse  = (statusCode, data, res, message) =>{
//     res.status(statusCode).json({
//         status : 'success',
//         message : message,
//         data : data
//     })
// }

const sendResponse =  (statusCode, data, res,message)  => {
    res.status(statusCode).json({
        status  :  "successfull",
        message :  message,
        data : {
            data
        }
    })
}

exports.newRequest =  catchAsync(  async (req,res,next) => {
    const new_request  =   await Request.create({
        check_no  :  req.body.check_no,
        nida_no : req.body.nida_no,
        marital_status : req.body.marital_status,
        user :  req.user.id,
        date_submitted : req.body.date_submitted
    });

    if(!new_request){
        return next(new  AppError('request failed  please try again', 400))
    };


    sendResponse(201, new_request, res, "New request succesfull submitted");
})

exports.allRequests  =  catchAsync( async  (req,res,next) => {
    const requests =  await Request.find();

    if(!requests){
        return  next(new AppError('No data found in this document', 404))
    };

    sendResponse(200, requests, res , "Data found succesfully");
})

exports.getAllRequests =  catchAsync(  async(req,res,next)  =>  {
    const  requests  = await Request.find();

    if(!requests){
        return next(new AppError('No data found in this document',404));
    }

    sendResponse(200, requests, res, "Data found succesfully");
})