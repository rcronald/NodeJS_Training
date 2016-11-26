var http = require("http").createServer(),
	fs = require("fs"),
	path = require("path")
	rutas = [
		{ruta : "", archivo : "index.html"},
		{ruta : "quienes", archivo : "quienes.html"},
		{ruta : "servicios", archivo : "servicios.html"}
	],
	noEncontrado = true


function fnEnviarArchivo(archivo, res){

	if(archivo){
		fs.readFile(archivo, function(error, contenido){
			if(error){
				console.log("Error:" + err)
				res.writeHead(500, {"content-type" : "text/plain"})
				res.end("Ocurrió un error.")
			}else{
				res.writeHead(200, {"content-type" : "text/html"})
				res.end(contenido.toString())
			}
		})
	}else{
		console.log("Error")
	}
}

function fnServidor(req, res){
	console.log("Request:" + req.url)

	var rutaRequest = path.basename(req.url)

	console.log("BaseName:" + rutaRequest)

	rutas.forEach(function(elem, ind){
		if(rutaRequest==elem.ruta){
			noEncontrado = false
			fnEnviarArchivo(elem.archivo,res)
		}
	})

	if(noEncontrado){
		res.writeHead(404, {"content-type" : "text/html"})
		res.end("NO ENCONTRADO")
	}
}

function fnEscuchando(){
	console.log("Escuchando en el puerto " + (process.env.port || 3000))
}

http
	.on("request", fnServidor)
	.listen(process.env.port || 3000, fnEscuchando)

