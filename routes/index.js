var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/simple', function (req, res) {
    return res.send("Express Working!");
});

router.post('simple', function (req, res) {
    console.log(req.body);
    return res.send("Hello ");
});

module.exports = router;
