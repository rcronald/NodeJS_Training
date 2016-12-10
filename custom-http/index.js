var request = require('request'),
	log = require('winston'),
	jsdom = require('jsdom'),
	deathbycaptcha = require('deathbycaptcha3'),
	url = require('url'),
	fs  = require('fs')


// Configure LOG
log.configure({
	level: 'debug',
	transports: [
 		new (log.transports.File)({ 
 			filename: 'custom-http.log',
 			json : false
 		})
	]
});

// Configure deathbycaptcha
deathbycaptcha.credentials({
    username: 'rcronald',
    password: 'r0naldrequenai01'
});


// Variables
var urlJQuery = "http://code.jquery.com/jquery-1.5.min.js"
var urlSat = "https://www.sat.gob.pe/VirtualSAT/"
var urlSatInicio = "https://www.sat.gob.pe/WebSitev8/IncioOV2.aspx"
var urlSatPapeletas = urlSat + "modulos/Papeletas.aspx"
var urlSatPrincipal = urlSat + "principal.aspx"


var urlSatPrincipal1= "https://www.sat.gob.pe/VirtualSAT/principal.aspx?mysession=u36lxcaH1m7IcKQUN07%2BRUdT%2FKOvOduxpGg4RCFMXUo%3D"
var urlSatPapeletas1  = "https://www.sat.gob.pe/VirtualSAT/modulos/Papeletas.aspx?mysession=u36lxcaH1m7IcKQUN07%2bRQfyQBtLK%2f4qIOQPRpI4krI%3d&pla=NgExFT7dZcg%3d"


demo = function(data){
	

	var urlx = urlSatPapeletas + "?mysession=" + encodeURIComponent(data.session) + "&pla=" + encodeURIComponent(data.params.valbus)
	var urly = urlSatPrincipal + "?mysession=" + encodeURIComponent(data.session)
	log.debug(urlx)
	log.debug(urly)

	requestSatPapeletas(urlx)

}

getUrlPapeletas = function(placa){
	var formData = {
		t : "2",
		v : placa
	}

	request.post({url : urlSatInicio, formData: formData}, function optionalCallback(err, httpResponse, mainHtml) {
		if (err) {
			return log.debug("Error :", err);
		}
		
		jsdom.env({
			html : mainHtml,
			scripts : [urlJQuery],
		    done : function (err, window) {
				var $ = window.jQuery

				// Get initial url
				var urlRedirect = $("a").first().attr('href')
				var urlParts = url.parse(urlRedirect, true);
  				var query = urlParts.query;
  				//log.debug(urlRedirect)
  				//log.debug(query)

  				// Simulate redirect
  				request(urlRedirect, function (error, response, htmlRedirect) {
			  		if (!error && response.statusCode == 200) {

			  			jsdom.env({
			  				html : htmlRedirect,
			  				scripts : [urlJQuery],
			  				done : function (err, window){
			  					var $ = window.jQuery

			  					var urlFrame = $("FRAME[id='fraRightFrame']").attr('src')
			  					var initalData = {
				  					params : query,
				  					url : urlRedirect,
				  					session : url.parse(urlFrame, true).query.mysession
				  				}
			  					
			  					demo(initalData)
			  				}
			  			})

					}
				})


			}
		})
	})

}


requestSatPrincipal = function(){
	request(urlSatPrincipal1, function (error, response, htmlPrincipal) {
  		if (!error && response.statusCode == 200) {
  			log.debug("Principal:" + htmlPrincipal)
		}
	})
}

requestSatPapeletas = function(urlPa){
	request(urlPa, function (error, response, htmlPapeletas) {
	  if (!error && response.statusCode == 200) {
	  	log.debug("URL:" + urlPa)
	  	log.debug("Papeletas:" + htmlPapeletas)
	    
	    jsdom.env({
			html : htmlPapeletas,
			scripts : [urlJQuery],
		    done : function (err, window) {
				var $ = window.jQuery

				// Get captcha image
				var imageCaptchaUrl = $("img[class='captcha_class']").attr('src').replace("../","")

				log.debug(urlSat + imageCaptchaUrl)

				guardarImagen(urlSat + imageCaptchaUrl)

				// Decode captcha image
				deathbycaptcha.decodeUrl(urlSat+imageCaptchaUrl, 10000, function(err, result) {
					console.log(result)
				});
				
			}
		})
	  }
	})
}

guardarImagen = function(imageUrl){
	request.get({url: imageUrl, encoding: 'binary'}, function (err, response, body) {
	  fs.writeFile("D:\\development\\workspace_node\\custom-http\\image.jpg", body, 'binary', function(err) {
	    if(err)
	      console.log(err);
	    else
	      console.log("The file was saved!");
	  }); 
	});

	/*request(imageUrl, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	log.debug("DATA:" + body)
	  }
	})*/
}


//getUrlPapeletas("a5t735")


//requestSatPrincipal()
//requestSatPapeletas()

guardarImagen("https://www.google.com.pe/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png")

