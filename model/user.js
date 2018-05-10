var mongoose=require('mongoose');

module.exports = mongoose.model('user',{
    _id : String,
    username : String,
    password: String,
    modemNo : String
});