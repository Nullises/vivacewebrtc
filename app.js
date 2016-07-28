// Dependencias
var express = require('express'),
    OpenTok = require('opentok');
var server_port = process.env.PORT || 3000;


// Definir API_KEY y API_SECRET
var apiKey = "45625752",
    apiSecret = "534d2e4da9064fd573588361661304842dcd93f5";
if (!apiKey || !apiSecret) {
  console.log('Debes especificar apiKey y apiSecret como variables de entorno');
  process.exit(1);
}

// Inicializar Express
var app = express();
app.use(express.static(__dirname + '/public'));

// Inicializar OpenTok
var opentok = new OpenTok(apiKey, apiSecret);

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
