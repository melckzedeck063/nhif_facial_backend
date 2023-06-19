const mongoose = require('mongoose');


const DependantSchema =  mongoose.Schema({
    firstName : { 
        type : String,
        required : [true, 'Please provide your name'],
        trim : true
    },
    lastName : { 
        type : String,
        required : [true, 'Please provide your name'],
        trim : true
    },
    middleName : { 
        type : String,
        default  :  "",
        trim : true
    },
   gender : { 
         type : String,
        default : "Not set"
    },
   dob: { 
         type : String,
        default : "Not set"
    },
   relation: { 
         type : String,
        required : true
    },
    sponsor: {
        type :  mongoose.Schema.ObjectId,
        ref : 'User',
        required : [true]
    },
    telephone : {
        type : String,
        minlength : [10, "Please provide a valid phone number"],
        maxlength : [10, "Please provide a valid phone number"]
    },
    photo : String, 
})

DependantSchema.pre(/^find/ , function(next) {
    this.populate({
        path  : 'sponsor',
        select  : '-password -role  -__v'
    })

    next();
})

const Dependant =  mongoose.model('Dependant', DependantSchema);
module.exports =  Dependant