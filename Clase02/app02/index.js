/*var express = require("express"),
	app = express()*/

function fnEscuchando(){
	console.log("Escuchando en el puerto 3000")
}


var app = require("express")(),
	path = require("path"),
	motorVistas = "ejs",
	dirVistas = "/vistas"

app.set("view engine", motorVistas)
app.set("views", path.join(__dirname, dirVistas))

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
