var passportFB = require("passport-facebook").Strategy,
	passportGoogle = require("passport-google-oauth2").Strategy,
	passportTwitter = require("passport-twitter").Strategy,
	passportGithub = require("passport-github").Strategy

var mongodb = require("mongodb"),
	db = require("monk")("localhost/bdredes")

var credenciales = require("./credenciales")


function apiRedes(passport){
	// FACEBOOK
	passport.use(
		new passportFB(
			{
				clientID : credenciales.facebook.claveId,
				clientSecret : credenciales.facebook.claveSecreta,
				callbackURL : credenciales.facebook.rutaCallback,
				profileFields : ["id", "displayName", "photos"]
			},
			function(accessToken, refreshToken, profile, done){
				console.log("middleware")
				console.log(profile)


				var Usuarios = db.get("usuarios")

				Usuarios
					.find({idRedes : profile.id})
					.then(function(registros){
						if(registros.length==0){
							var datos = {
								idRedes : profile.id,
								nombre : profile.displayName,
								foto : profile.photos[0].value,
								proveedor : profile.provider
							}

							Usuarios
								.insert(datos)
								.then(function(registros){
									return done(null, datos)
								})
								.catch(function(err){
									return done(err)
								})
						}else{
							return done(null, registros[0])
						}
					})
					.catch(function(err){
						return done(err)
					})

				//return done(null, {id : 10})
			}
		)
	)

	// GOOGLE
	passport.use(
		new passportGoogle(
			{
				clientID : credenciales.google.claveId,
				clientSecret : credenciales.google.claveSecreta,
				callbackURL : credenciales.google.rutaCallback
			},
			function(accessToken, refreshToken, profile, done){
				console.log("middleware")
				console.log(profile)


				var Usuarios = db.get("usuarios")


				Usuarios
					.find({idRedes : profile.id})
					.then(function(registros){
						if(registros.length==0){
							var datos = {
								idRedes : profile.id,
								nombre : profile.displayName,
								foto : profile.photos[0].value,
								proveedor : profile.provider
							}

							Usuarios
								.insert(datos)
								.then(function(registros){
									return done(null, datos)
								})
								.catch(function(err){
									return done(err)
								})
						}else{
							return done(null, registros[0])
						}
					})
					.catch(function(err){
						return done(err)
					})	

				//return done(null, {id : 10})
			}
		)
	)

	//TWITTER
	passport.use(
		new passportTwitter(
			{
				consumerKey : credenciales.twitter.claveId,
				consumerSecret : credenciales.twitter.claveSecreta,
				callbackURL : credenciales.twitter.rutaCallback
			},
			function(accessToken, refreshToken, profile, done){
				console.log("middleware")
				console.log(profile)


				var Usuarios = db.get("usuarios")


				Usuarios
					.find({idRedes : profile.id})
					.then(function(registros){
						if(registros.length==0){
							var datos = {
								idRedes : profile.id,
								nombre : profile.displayName,
								foto : profile.photos[0].value,
								proveedor : profile.provider
							}

							Usuarios
								.insert(datos)
								.then(function(registros){
									return done(null, datos)
								})
								.catch(function(err){
									return done(err)
								})
						}else{
							return done(null, registros[0])
						}
					})
					.catch(function(err){
						return done(err)
					})

				//return done(null, {id : 10})
			}
		)
	)

	// GITHUB
	passport.use(
		new passportGithub(
			{
				clientID : credenciales.github.claveId,
				clientSecret : credenciales.github.claveSecreta,
				callbackURL : credenciales.github.rutaCallback
			},
			function(accessToken, refreshToken, profile, done){
				console.log("middleware")
				console.log(profile)


				var Usuarios = db.get("usuarios")

				Usuarios
					.find({idRedes : profile.id})
					.then(function(registros){
						if(registros.length==0){
							var datos = {
								idRedes : profile.id,
								nombre : profile.displayName,
								foto : profile.photos[0].value,
								proveedor : profile.provider
							}

							Usuarios
								.insert(datos)
								.then(function(registros){
									return done(null, datos)
								})
								.catch(function(err){
									return done(err)
								})
						}else{
							return done(null, registros[0])
						}
					})
					.catch(function(err){
						return done(err)
					})

				//return done(null, {id : 10})
			}
		)
	)
}


module.exports = apiRedes