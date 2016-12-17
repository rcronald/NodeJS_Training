var express = require('express');
var router = express.Router();
var mongodb = require("mongodb")
var db = require("monk")("localhost/bd_usuarios")

function fntAutenticado(req, res, next){
	if(req.session.usuario) {
		next()
	} else {
		res.redirect("/login")
	}
}

/* GET home page. */
router.get('/', fntAutenticado, function(req, res, next){
	res.render("home")
});

router.get("/login", function(req, res, next){
	res.render("login")
})

router.post("/usuario", function(req, res, next){
	var usuario = db.get("usuarios")

	usuario
		.find({usuario: req.body.usuario, contrasena: req.body.contrasena})
		.then(function(registros){
			if(registros.length) {
				req.session.usuario = {usuario: req.body.usuario}
				res.redirect("/")				
			} else {
				res.render("login")
			}
		})
		.catch(function(error){
			res.send("Ocurrió un error con la base de datos")
		})

/*	if(req.body.usuario==="sergio" && req.body.contrasena==="1234") {
		req.session.usuario = {usuario: req.body.usuario}
		res.redirect("/")
	} else {
		res.render("login")
	}*/
})

router.get("/logout", function(req, res, next) {
	req.session = null
	res.redirect("/login")
})




module.exports = router;
