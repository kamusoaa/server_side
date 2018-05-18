var express = require('express');
var router = express.Router();

var Modem = require('../model/modem');
var User = require('../model/user');

router.get('/modemreg', function (req, res){
    console.log(req.query);
    Modem.findOne({imei : req.query.imei}, function (err, data) {
        if(err)
            throw err;
        else
        {
            if(!data)
            {
                var modem = new Modem();
                modem.imei = req.query.imei;
                modem.phoneNo = req.query.phone;
                modem.isAttached = false;
                modem.save();
                console.log("New modem was found");
            }
            else return;
        }
    });
    return res.json({"response":"ok"});
});

router.post('/registration', function (req, res) {
    var response;
    console.log(req.body);

    User.findOne({username : req.body.username},  function (err,data) {
        if(err)
            throw err;
        else
        {
            if(!data)
            {
                var user = new User();
                user.username = req.body.username;
                user.password = req.body.password;
                user.phoneNum = req.body.phoneNum;
                user.save();
                console.log("New user - "  + user.username + " was aded");
                Modem.findOneAndUpdate({phoneNo : req.body.phoneNum}, {isAttached : true}, function (err, update) {
                   if(err)
                       throw err;
                   else
                   {
                       if(update)
                           response = res.json({"response":"Пользователь успешно зарегистрирован"});
                       else
                           response = res.json({"response":"Пользователь успешно зарегистрирован. Модем не найден"});
                   }
                });
            }
            else
            {
                response = res.json({"response": "Данный пользователь уже существует"});
            }
        }
    });
    return response;
});


router.post('/login', function (req, res) {
   var response;
   console.log(req.body);
   User.findOne({username : req.body.username, password : req.body.password}, function (err, data) {
       if(err)
           throw err;
       else
       {
           if(data)
               response = res.json({"code":"200","response":"Пользователь найден"});
           else
               response = res.json({"code":"404","response":"Пользователь не найден"})
       }
   })

    return response
});

module.exports = router;
