// Dependencias
var express = require('express');
var server_port = process.env.PORT || 3000;
var apiKey = require('./ot').apiKey; //Obtiene apiKey por defecto
var apiSecret = require('./ot').apiSecret;

var credentials = require('./credentials').credentials(fun); //Obtiene la función con sessionId y token

//Con Promise (Solo publica no subscribe)

/*

var credentialsPromise = require('./credentialsPromise').credentialsPromise; //Obtiene la promesa con sessionId y token


//Definir aplicación
var app = express();

//Utilizar carpeta estática "public"
app.use(express.static(__dirname + '/public'));

//Inicializar la aplicación
init();


app.get('/', function(req, res){
  credentialsPromise().then(function(resolve){
    var obj = resolve;

    res.render('index.ejs', {
      apiKey: apiKey,
      sessionId: obj.sessionId,
      token: obj.tokenId
    });

  }, function(reject){
    console.log("no se pudo traer");
  });
});

//Definir Inicialización
function init() {
  app.listen(server_port, function() {
    console.log('La aplicación está corriendo en localhost:' + server_port);
  });
}


*/

//Con Callback (publica y subscribe correctamente)



//Función contenedora de la aplicación
function fun(obj) {

//Definir aplicación
var app = express();

//Utilizar carpeta estática "public"
app.use(express.static(__dirname + '/public'));

//Inicializar la aplicación
init();

//Routing
app.get('/', function(req, res) {
  //Renderizar las variables en las vistas
  res.render('index.ejs', {
    apiKey: apiKey,
    sessionId: obj.sessionId,
    token: obj.tokenId
  });
});

//Definir Inicialización
function init() {
  app.listen(server_port, function() {
    console.log('La aplicación está corriendo en localhost:' + server_port);
  });
}

}
