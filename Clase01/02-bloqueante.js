var fs = require("fs")

var fecha = new Date()

var content = fs.readFileSync("data.html")


console.log(content.toString())
