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

                if(req.query.alarm == 1)
                {
                    values.data.alarm.isAlarm = true;
                    values.data.alarm.sensor = req.query.sensor;
                }
                values.save();

                console.log("Message from " + req.query.imei);
                response = res.json({"response":"ok"});
            }
        }
    });
    return response;
});


router.post('/sendCommand', function (req, res) {
    var response;
    Command.findOne({'command.username' : req.body.username}, function (err, data) {
     if(err)
         throw err;
     else
     {
         if(!data)
         {
             var command = new Command();
             command.command.username = req.body.username;
             command.command.imei = req.body.imei;
             command.command.cmd = req.body.cmd;
             command.command.isCommandExecute = false;

             console.log(command);
             command.save();
             response = res.json({"cmd":"ok"});
         }
         else
         {
             console.log("meh4");
             Command.updateOne({'command.username':req.body.username, 'command.imei':req.body.imei}, {'command.cmd' : req.body.cmd}, function (err, update) {
                 if(err)
                     throw err;
                 else
                 {
                     if(update)
                         response = res.json({"cmd":"ok"});
                     else
                         esponse = res.json({"cmd":"not ok"});
                 }
             })
         }
     }
   });

    return response;
});



module.exports = router;
