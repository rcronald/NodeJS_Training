var fs = require("fs")


var content = fs.readFile("data.html", function (err, contenido){
	if(err){
		console.log("Error:" + err)
	}else{
		console.log("Contenido:" + contenido.toString())
	}
}) 