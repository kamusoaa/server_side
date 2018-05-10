
var mongoose = require('mongoose');

module.exports = mongoose.model('cmd',{
    username : String,
    modemNo : String,
    cmd : String
});