var express = require('express');
var router = express.Router();

var Modem = require('../model/modem');
var Command = require('../model/command');
var User = require('../model/user');
var Values = require('../model/values');

router.get('/modem', function (req, res) {
    var response;
    Modem.findOne({imei : req.query.imei, isAttached : true}, function (err, data) {
        if(err)
            throw err;
        else
        {
            if(data)
            {
                var values = new Values();
                values.data.imei = req.query.imei;
                values.data.motion1 = req.query.motion1;
                values.data.motion2 = req.query.motion2;
                values.data.hall = req.query.hall;
                values.data.prox = req.query.prox;
                values.data.sound = req.query.sound;
                values.data.cmdResp = req.query.cmd;

                if(req.query.alarm != 0)
                {
                    values.data.alarm.isAlarm = true;
                    values.data.alarm.sensor = req.query.sensor;
                }


                console.log(values);
                values.save();
                console.log("Message from " + req.query.imei);
                response = res.json({"response":"ok"});
            }
        }
    });
    return response;
});



module.exports = router;
