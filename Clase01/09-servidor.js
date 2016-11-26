var http = require("http").createServer()


function fnServidor(request, response){
	response.writeHead(200, {"content-type" : "text/html"})
	response.write("<h1>Respuesta</h1>")
	response.end()

}

function fnEscuchando(){
	console.log("Servidor escuchando puerto "+ (process.env.port || 3000))
}

http
	.on("request", fnServidor)
	.listen(process.env.port || 3000, fnEscuchando)



/*http.on("request", function(request, response){
	response.writeHead(200, {"content-type" : "text/plain"})
	response.write("todo ok")
	response.end()
})


http.listen(3000, function(){
	console.log("Servidor escuchando puerto 3000")
})*/