const mongoose = require('mongoose');

const RequestSchema =   mongoose.Schema({
    check_no :  {
        type : String,
        required : [true],
        unique :  [true, 'Check no already exist'],
        trim : true,
    },
    nida_no  : {
        type : String,
        required : [true],
        unique :  [true, 'NIDA no already exist'],
        trim  : true
    },
    marital_status :  {
        type : String,
        default  : "single"
    },
    status : {
        type : String,
        default  : "Pending"
    },
    card_no : {
        type : String,
        default : "XXXX"
    },
    photo :  String,
    user: {
        type :  mongoose.Schema.ObjectId,
        ref : 'User',
        required : [true]
    },
    date_submitted : {
        type :  Date,
        default : Date.now()
    }
})

RequestSchema.pre(/^find/ , function(next) {
    this.populate({
        path  : 'user',
        select  : '-password -role  -__v'
    })

    next();
})


const Request =   mongoose.model('Request', RequestSchema);
module.exports =  Request;