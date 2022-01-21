var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This folder contains all firware downloads.');
});

module.exports = router;