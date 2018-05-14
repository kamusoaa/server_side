
var mongoose = require('mongoose');

module.exports = mongoose.model('cmd',{

    command : {
        username: String,
        imei : String,
        cmd : String,
        cmdresp : String,
        isCommandExecute : Boolean,
        isComplete :Boolean
    }
});