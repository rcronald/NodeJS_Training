app.controller("controlador", ["http", function(http){

	this.alumnos = []
	this.alumno = {}

	var self = this
	http
		.listar()
		.then(function(registros){
			self.alumnos = registros.data
		})
		.catch(function(err){
			console.log(err)
		})


	http.detallar = function(registro){
		var id = registro.idUsuario
		http
			.detallar(id)
			.then(function(registros){
				self.alumno = registros.data[0]
			})
			.catch(function(err){
				console.log(err)
			})
	}

	http.insertar = function(nombre){
		var data = {nombre : nombre}
		http
			.insertar(data)
			.then(function(registros){
				http.listar()
			})
			.then(function(registros){
				self.alumnos = registros.data
			})
			.catch(function(err)){
				console.log(err)
			}

	}

	http.actualizar = function(registro){
		var data = {nombre : registro.nombre}
		http
			.actualizar(data, id)
			.then(function(registros){
				http.listar()
			})
			.then(function(registros){
				self.alumnos = registros.data
			})
			.catch(function(err)){
				console.log(err)
			}

	}

	http.eliminar = function(registro){

		if(!confirm("¿Está seguro de eliminar?")){
			return
		}

		http
			.eliminar(registro.idUsuario)
			.then(function(registros){
				http.listar()
			})
			.then(function(registros){
				self.alumnos = registros.data
			})
			.catch(function(err)){
				console.log(err)
			}

	}
}])