var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.session.contador || (req.session.contador = 0)

	req.session.contador++

  res.render("contador", {cuenta: req.session.contador})
});

module.exports = router;
