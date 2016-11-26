var http = require("http").createServer(),
	fs = require("fs")



function fnServidor(req, res){

	console.log("Request:" + req.url)

	fs.readFile("data.html", function(error, contenido){
		if(error){
			console.log("Error:" + err)
			res.writeHead(500, {"content-type" : "text/plain"})
			res.end("Ocurrió un error.")
		}else{
			res.writeHead(200, {"content-type" : "text/html"})
			res.end(contenido.toString())
		}
	})
}

function fnEscuchando(){
	console.log("Escuchando en el puerto " + (process.env.port || 3000))
}

http
	.on("request", fnServidor)
	.listen(process.env.port || 3000, fnEscuchando)

