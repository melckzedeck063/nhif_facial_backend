
const mongoose =  require('mongoose');

const VerifySchema = mongoose.Schema({
    username  : {
        type : String,
        required : true
    },
    photo_id : Number,
    status : String,
    date_created: {
        type : Date,
        default : Date.now()
    }
});


const Verify = mongoose.model('Verify', VerifySchema);

module.exports = Verify;
