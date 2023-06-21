const catchAsync =  require('../utils/catchAsync');
const AppError =   require('../utils/AppError');

const {User}=  require('../models/userModel');
const { async } = require('rxjs');


const filterObj =  (obj, ...allowedFileds) => {
    const newObj =  {};
    Object.keys(obj).forEach(el => {
        if(allowedFileds.includes(el)) newObj[el] =  obj[el];
    });
    return newObj;
}

const sendResponse =  (data, message, res, statusCode)  => {
    res.status(statusCode).json({
        status  :  "successfull",
        message :  message,
        data : {
            data
        }
    })
}

exports.getAllUsers = catchAsync( async (req, res, next)  =>  {
    const all_users = await User.find({role : "user"});

    if(!all_users){
        return next(new AppError("No data found in  this document", 400))
    }

    sendResponse(all_users, "data found", res, 200)


})

exports.getAllStaffs =  catchAsync(async(req,res,next) => {
     const all_staffs =  await User.find();
     if(!all_staffs){
        return next(new AppError("No staff found in this document", 404));
     }

     sendResponse(all_staffs, "data found",res, 200);
})

exports.getUser = catchAsync( async (req, res, next) => {
    console.log(req.params)
    const user =  await User.findById(req.params.id);

    if(!user ) {
        return next(new AppError("No data found with that id", 404))
    }

    sendResponse(user, "data found", res, 200);
})


exports.getMe = catchAsync ( async (req,res,next) => {
    const user =  await User.findById(req.user.id);
    if(!user) {
        return next(new AppError('Error user not found', 401));
    }

    sendResponse(user, "user found", res, 200)
})

exports.updateMe = catchAsync( async(req,res,next) => {

    // CREATE ERROR IF USER IS TRYING TO UPDATE PASSWORD
    if(req.body.password || req.body.confirmPassword){
        return next(new AppError('This pass is not for password update please try /updatePassword', 400));
    }

    //FILTER OUT UNWANTED FIELDS THAT ARE NOT SUPPOSED TO BE UPDATED
    const filteredBody =  filterObj(req.body, 'firstname', 'surname', 'lastname', 'gender', 'email', 'telephone', 'address', 'dob');

    const updateUser =  await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new : true,
        runValidators : true
    })

    if(!updateUser){
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(201).json({
        status : 'Success', 
        data : {
            updateUser
        }
    })

})

exports.updateUser =   catchAsync(async  (req,res,next) =>  {
    const currentUser =  await User.findByIdAndUpdate(req.params.id, req.body,{
        new  : true,
        runValidators  : true
    })

    if(!currentUser){
        return next(new AppError('No user found with that ID', 404))
    }

    sendResponse(currentUser, "data succesfull updated", res, 201)
})

