var express = require('express');
var usercontrol=require('../controllers/users')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.post('/signin', usercontrol.signIn);

module.exports = router;
