var credenciales = {
	facebook : {
		api_secret : "1234567890",
		api_public : "qwertyuiop",
		callback : "http://midominio.com/callbackFacebook"
	},
	google : {
		api_secret : "1234567890",
		api_public : "qwertyuiop",
		callback : "http://midominio.com/callbackGoogle",
		permisos : {}
	},
	twitter : {
		api_secret : "1234567890",
		api_public : "qwertyuiop",
		callback : "http://midominio.com/callbackTwitter"
	}
}

var refrescoTiempo = 36000

//module.exports = credenciales

module.exports = {
	credenciales : credenciales,
	refrescoTiempo : refrescoTiempo
}
