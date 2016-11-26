var eventos = require("events"),
	eventoEmitter = eventos.EventEmitter,
	objEvent = new eventoEmitter()	


objEvent.on("mensaje desde el cliente", function(msg){
	console.log("Enviado desde el cliente:" + msg)
})

objEvent.on("mensaje desde el cliente", function(msg){
	console.log("Generacion de Reporte:" + msg)
})

objEvent.once("mensaje desde el cliente", function(msg){
	console.log("================================")
})

objEvent.emit("mensaje desde el cliente", "Mensaje de prueba")
objEvent.emit("mensaje desde el cliente", "Ronald")
objEvent.removeAllListeners()
objEvent.emit("mensaje desde el cliente", "Ronald-1")

