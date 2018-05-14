var mongoose = require('mongoose');

module.exports = mongoose.model('values', {


    data : {
        imei : String,
        alarm:{
            isAlarm : Boolean,
            sensor : String
        },
        motion1 : String,
        motion2 : String,
        hall : String,
        prox: String,
        sound : String,
        cmdResp : String
    }
});


