var http = require("http").createServer()

function fnServidor(req, res){
	res.writeHead(200, {"content-type" : "text/html"})
	res.write("<h1>Prueba de Supervisor....</h1>")
	res.end()
}

function fnEscuchando(){
	console.log("Escuchando en el puerto " + process.env.port || 3000)
}

http
	.on("request", fnServidor)
	.listen(process.env.port || 3000, fnEscuchando)

