
var mongoose = require('mongoose');

module.exports = mongoose.model('modem',{
    _id : String,
    imei : String,
    phoneNo :String
});
