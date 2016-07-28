// Dependencias
var express = require('express');
var opentok = require('./ot').opentok;
var apiKey = require('./ot').apiKey;
var apiSecret = require('./ot').apiSecret;
var server_port = process.env.PORT || 3000;



// Inicializar Express
var app = express();
app.use(express.static(__dirname + '/public'));


// Crear una Session y almacenarla en Express
opentok.createSession(function(err, session) {
  if (err) throw err;
  app.set('sessionId', session.sessionId);
  // Esperar que la Session sea creada para inicializar la aplicación
  init();
});

//Obtener la Session (sessionId)
app.get('/', function(req, res) {
  var sessionId = app.get('sessionId'),
      // Generar un token nuevo para el cliente
      token = opentok.generateToken(sessionId);

  //Renderizar las variables en las vistas
  res.render('index.ejs', {
    apiKey: apiKey,
    sessionId: sessionId,
    token: token
  });
});


// Inicializar la aplicación Express
function init() {
  app.listen(server_port, function() {
    console.log('La aplicación está corriendo en localhost:' + server_port);
  });
}
