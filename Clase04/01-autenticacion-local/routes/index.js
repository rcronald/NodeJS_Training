var express = require('express');
var router = express.Router();

var passport = require("passport")

// Middleware para validar si esta authenticado
function estaAutenticado(req, res, next){
	if(req.isAuthenticated()){
		console.log("autenticado")
		next()
	}else{
		console.log("no autenticado")
		res.redirect("/")
	}
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});


// Definir la estrategia de passport que es local
router.post("/login", 
	passport.authenticate(
		"local",
		{
			successRedirect : "/home",
			failureRedirect : "/"
		}
	)
)

router.get("/logout", function(req, res){
	req.logout()
	res.redirect("/")
})

router.get("/home", estaAutenticado, function(req, res){
	res.render("home")
})




module.exports = router;
