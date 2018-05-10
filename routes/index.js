var express = require('express');
var router = express.Router();

var Modem = require('../model/modem');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/signaling', function (req, res) {
    console.log(req.query);
    return res.json({"text":"Hello"});
});






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
                modem.save();
                console.log("save");
            }
            else return;
        }
    });
    return res.json({"res":"ok"});
});

router.post('/registry', function (req, res) {
    console.log(req.body);
    return res.json({"text":"ok"});
});

module.exports = router;
