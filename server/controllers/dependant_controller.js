   const catchAsync =   require('../utils/catchAsync');
   const AppError =  require('../utils/AppError');

   const Dependant =  require('../models/dependantModel')

   const Factory =  require('../controllers/factoryController')

   exports.registerDependant = catchAsync(  async  (req,res,next)  => {
    if(!req.body.sponsor) req.body.sponsor =  req.user.id;

    const dependant =  await Dependant.create(req.body);
    if(!dependant){
        return  next(new AppError("Request failed",400))
    }

    res.status(201).json({
        status : "success",
        message : "Dependant  registered succesfully",
        data : {
            dependant
        }
    })
   })

   exports.getAllDependants =  Factory.getAll(Dependant);

   exports.getDependant =  Factory.getOne(Dependant);

   exports.getMyDependants =  catchAsync ( async  (req,res,next) => {
       const dependants =  await Dependant.find({sponsored_by : req.params.id});

       if(!dependants){
        return next(new AppError("No data found with the specified ID", 404));
       }

       res.status(200).json({
        status : "success",
        message : "user dependants  found",
        data : {
            dependants
        }
       })
   })

   exports.updateDependant =  Factory.updateOne(Dependant);

   exports.deleteDependant = Factory.deleteModel(Dependant);