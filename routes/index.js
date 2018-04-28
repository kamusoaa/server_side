var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/simple', function (req, res) {
    //return res.send("Express Working!");
    return res.json({"text":"Hello"});
});

router.post('/simple', function (req, res) {
    console.log(req.body);
    return res.json({"text":"hello"});
});

module.exports = router;
