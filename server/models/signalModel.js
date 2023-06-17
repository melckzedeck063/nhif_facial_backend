
const mongoose =  require('mongoose');

const SignalSchema = mongoose.Schema({
    username  : {
        type : String,
        required : true
    },
    photo_id : Number,

    date_created: {
        type : Date,
        default : Date.now()
    }
});


const Signal = mongoose.model('Signal', SignalSchema);

module.exports = Signal;
