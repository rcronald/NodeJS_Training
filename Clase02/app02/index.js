/*var express = require("express"),
	app = express()*/

function fnEscuchando(){
	console.log("Escuchando en el puerto 3000")
}


var express = require("express"),
	app = express(),
	path = require("path"),
	bodyParser = require('body-parser')
	motorVistas = "ejs",
	dirVistas = "/vistas",
	dirPublico = "/publico"

app.set("view engine", motorVistas)
app.set("views", path.join(__dirname, dirVistas))

// Uso del middleware para usar archivos estaticos como js y css
app.use(express.static(__dirname + dirPublico))

// Uso de middleware del body del request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extend : false})) //false-> usa el qs

app.listen(3000, fnEscuchando)

app.get("/", function(req, res){
	res.send("<h1>home</h1>")
})


app.get("/quienes", function(req, res){
	res.sendFile(__dirname + "/quienes.html")
})

app.get("/facebook", function(req, res){
	res.redirect("https://faceebook.com")
})

app.get("/nosotros", function(req, res){
	res.redirect("/quienes")
})

app.get("/descargar", function(req, res){
	res.download(__dirname + "/quienes.html")
})

app.get("/listado", function(req, res){
	var datos = {
		nombre : "Ronald",
		apellido : "Requena",
		curso : "Node"
	}
	res.render("listado", datos)
})

app.get("/usuarios", function(req, res){
	var registros = [
		{nombre : "Nombre1", apellido : "Apellido1"},
		{nombre : "Nombre2", apellido : "Apellido2"},
		{nombre : "Nombre3", apellido : "Apellido3"},
		{nombre : "Nombre4", apellido : "Apellido4"},
		{nombre : "Nombre5", apellido : "Apellido5"}
	]
	res.render("usuarios", {"registros" : registros})
})


app.get("/jugadores/:activo/:equipo", function(req, res){
	var jugadores = [
		{jugador : "Lionel Messi", activo : 1},
		{jugador : "Ronaldiño Gaucho", activo : 0},
		{jugador : "Alexis Sanchez", activo : 0},
		{jugador : "Oscar Bravo", activo : 0},
		{jugador : "Arda Turan", activo : 1}
	]

	var jugadoresActivos = []

	jugadores.forEach(function(item){
		if(item.activo == req.params.activo){
			jugadoresActivos.push(item)
		}
	})

	var datos = {
		jugadores : jugadoresActivos,
		equipo : req.params.equipo
	}
	res.render("jugadores", datos)
})


app.get("/registrar", function(req, res){
	res.render("registrar")
})

app.post("/insertar", function(req, res){
	var datos = {
		nombre : req.body.nombre,
		email : req.body.correo
	}

	res.json(datos)
})
