var express = require('express')
var router = express.Router()

function estaAutenticado(req, res, next){
	if(req.isAuthenticated()){
		next()
	}else{
		res.redirect("/")
	}
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' })
});


router.get("/home", estaAutenticado, function(req, res){
	res.render("home", req.user)
})


module.exports = router;
