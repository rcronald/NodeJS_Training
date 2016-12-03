var express = require('express');
var router = express.Router();

var mongodb = require("mongodb")
	db = require("monk")("localhost/mibd")

/* GET users listing. */
router.get('/', function(req, res, next) {
	var usuarios = db.get("usuarios")

	usuarios
		.find()
		.then(function(registros){
			res.render("lista-usuarios", {registros:registros})
		})
		.catch(function(error){
			res.status(500)
			res.send(error)
		})
})

router.post("/", function(req, res, next){
	var registro = {
		nombre : req.body.nombre,
		apellido : req.body.apellido
	}

	var usuarios = db.get("usuarios")

	usuarios
		.insert(registro)
		.then(function(registro){
			res.redirect("/usuarios")
		})
		.catch(function(error){
			res.status(500)
			res.send(error)
		})
})


router.get("/:id", function(req, res, next){
	var usuarios = db.get("usuarios")

	usuarios
		.find({_id : req.params.id})
		.then(function(registros){
			res.render("editar-usuario", {registro:registros[0]})
		})
		.catch(function(error){
			res.status(500)
			res.send(error)
		})
})


router.put("/:id", function(req, res, next){
	var usuarios = db.get("usuarios")

	usuarios
		.update({_id : req.params.id}, {nombre : req.body.nombre, apellido : req.body.apellido})
		.then(function(registro){
			res.redirect("/usuarios")
		})
		.catch(function(error){
			res.status(500)
			res.send(error)
		})
})

router.get("/eliminar/:id", function(req, res, next){
	var usuarios = db.get("usuarios")

	usuarios
		.find({_id : req.params.id})
		.then(function(registros){
			res.render("eliminar-usuario", {registro:registros[0]})
		})
		.catch(function(error){
			res.status(500)
			res.send(error)
		})
})

router.delete("/:id", function(req, res, next){
	var usuarios = db.get("usuarios")

	usuarios
		.remove({_id : req.params.id})
		.then(function(registro){
			res.redirect("/usuarios")
		})
		.catch(function(error){
			res.status(500)
			res.send(error)
		})
})


module.exports = router;
