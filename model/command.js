
var mongoose = require('mongoose');

module.exports = mongoose.model('cmd',{

    username : {
        imei : String,
        cmd : String
    }
});