var eventoEmitter = require("events").EventEmitter
	herencia = require("util").inherits //Habilita la herencia

function Reloj(){
	var self = this

	setInterval(function(){
		self.emit("sincronizar hora")
	}, 1000)

	self.mostrarHora = function(){
		var fechaHora = new Date(),
			horas = fechaHora.getHours(),
			minutos = fechaHora.getMinutes(),
			segundos = fechaHora.getSeconds()

		horas = horas<10 ? "0" + horas : horas
		minutos = minutos<10 ? "0" + minutos : minutos
		segundos = segundos<10 ? "0" + segundos : segundos

		console.log(horas + ":" + minutos + ":" + segundos)
	}
}

herencia(Reloj, eventoEmitter)

var reloj = new Reloj()
reloj.on("sincronizar hora", function(){
	reloj.mostrarHora()
})


