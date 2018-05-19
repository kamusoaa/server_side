var express = require('express');
var router = express.Router();

var Modem = require('../model/modem');
var Command = require('../model/command');
var User = require('../model/user');
var Values = require('../model/values');


router.get('/modem', function (req,res) {
   console.log("New request from " + req.query.imei);
   Modem.findOne({imei : req.query.imei, isAttached : true}, function (data) {
       var values = new Values();
       values.data.imei = req.query.imei;
       values.data.motion1 = req.query.motion1;
       values.data.motion2 = req.query.motion2;
       values.data.hall = req.query.hall;
       values.data.prox = req.query.prox;
       values.data.sound = req.query.sound;

       if(req.query.alarm == 1)
       {
           values.data.alarm.isAlarm = true;
           values.data.alarm.sensor = req.query.sensor;
       }
       values.save();
       console.log("Values was added");

       if(req.query.cmd != 0)
       {
           Command.findOne({'command.imei':req.query.imei,'command.isCommandExecute':true,
           'command.isComplete':false}, function (err,data) {
               if(err)
                   throw err;
               if(data)
               {
                   data.command.isComplete = true;
                   data.command.cmdresp = req.query.cmd;
                   data.save();
                   return res.send({'cmd':0});
               }
               else
                   return res.send({'cmd':0});
           });
       }
       else
       {
           Command.findOne({'command.imei':req.query.imei, 'command.isCommandExecute':false}, function (err,data) {
               if(err)
                   throw err;
               if(data)
               {
                   console.log(data);
                   data.command.isCommandExecute = true;
                   data.save();
                   return res.send({'cmd':data.command.cmd});
               }
               else
                   return res.send({'cmd':0});
           });
       }
   });
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
             command.command.isComplete = false;
             command.save();
             response = res.json({"cmd":"ok"});
         }
         else
         {
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


router.get('/readModemResponse', function (req, res) {
   Command.findOne({'command.imei':req.query.imei, 'command.isCommandExecute':true,
   'command.isComplete':true}, function (err, data) {
       if(err)
           throw err;
       if(data)
       {
           if (data.command.cmdresp == 'undefined')
               return res.send({"cmd":"404","response":"Произошла ошибка. Попробуйте позже"});
           else
               return res.send({"cmd":"200","response":data.command.cmdresp});
       }
       else
           return res.send({"cmd":"200","response":"Запрос еще не обработан модемом"});
   });
});



module.exports = router;
