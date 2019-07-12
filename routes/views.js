var express = require('express');
var router = express.Router();
var auth = function (req, res, next) {
	if (req.session.email && req.session.isLogged)
		return next();
	else
		return res.redirect('/');
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contact' });
});


module.exports = router;