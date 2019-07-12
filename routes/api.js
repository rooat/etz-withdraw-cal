var express = require('express');
var router = express.Router();

var auth = function (req, res, next) {
	if (req.session && req.session.isLogged) {
		return next();
		// req.session.destroy();
	}	
	else
		return res.json({ status: 'FAILED', message: 'Please Enter Deails gain.' });
};

router.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

//coinType
var calculate = require('../api/calculate')
var create = require('../api/create')
var withdraw = require('../api/withdraw')
var findTransaction = require('../api/findTransaction')

//=========================================================

//admin
router.post('/calculate',calculate.calculate);
router.post('/create',create.create)
router.post('/withdraw',withdraw.withdraw)
router.post('/find_transaction',findTransaction.findTransaction)

module.exports = router;
