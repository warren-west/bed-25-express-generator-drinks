var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
     title: 'Express', 
     message: "Hello from the server",
     currentUser: req.user || undefined
    });
});

module.exports = router;
