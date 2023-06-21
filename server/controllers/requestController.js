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
    if(!req.body.user) req.body.user =  req.user.id
    const new_request  =   await Request.create(req.body)

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

exports.checkUserExistance = catchAsync( async (req,res,next) => {
    const  user =  await Request.find({photo_id : req.params.id})

    if(!user){
        return  next (new AppError("No user found with that photoID",404))
    }

    sendResponse(200,user,res, "Dat found successfully")
})