// Dependencias
var express = require('express');
var server_port = process.env.PORT || 3000;
var apiKey = require('./ot').apiKey; //Obtiene apiKey por defecto
var newSession = require('./credentialsPromise').newSession(); //Obtiene la promesa con sessionId y token

//Definir aplicación
var app = express();

//Utilizar carpeta estática "public"
app.use(express.static(__dirname + '/public'));

//Utilizar carpeta estática node_modules
app.use(express.static(__dirname + '/node_modules'));

//Inicializar la aplicación
init();

//Aplicaciones externas
app.get('/', function(req, res){
  //Uso de la promesa
  newSession.then(function(req){
    //fullfilled
    var obj = req;
    //Renderizar en la vista
    res.render('index.ejs', {
      apiKey: obj.apiKey,
      sessionId: obj.sessionId,
      token: obj.tokenId
    });
  }, function(reject){ //rejected
    console.log("No se pudo traer la promise");
  });
});

//Definir Inicialización
function init() {
  app.listen(server_port, function() {
    console.log('La aplicación está corriendo en localhost:' + server_port);
  });
}
