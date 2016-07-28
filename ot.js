//Dependencias
var OpenTok = require('opentok');

// Definir API_KEY y API_SECRET
var apiKey = "45625752",
    apiSecret = "534d2e4da9064fd573588361661304842dcd93f5";
if (!apiKey || !apiSecret) {
  console.log('Debes especificar apiKey y apiSecret como variables de entorno');
  process.exit(1);
}

// Inicializar OpenTok
var opentok = new OpenTok(apiKey, apiSecret);

//Modulos de exportación
module.exports.opentok = opentok;
module.exports.apiKey = apiKey;
module.exports.apiSecret = apiSecret;
