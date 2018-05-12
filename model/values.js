var mongoose = require('mongoose');

module.exports = mongoose.model('data', {
    imei : String,
    alarm : [{isAlarm : String, sensor: String}],
    motion1 : String,
    motion2 : String,
    hall : String,
    prox: String,
    sound : String,
    cmdResp : String
});