//Dependencias
var opentok = require('./ot').opentok;
//var apiKey = require('./ot').apiKey;
var apiSecret = require('./ot').apiSecret;

//Definir variables
var sessionId;
var token;

//Definir función de crear nueva sesión
var newSession = function(callbackS){
  //Crear nueva sesión
  opentok.createSession({mediaMode:"relayed"}, function(err, session){
    if(err) throw err;
    else {
      //Definir Objeto sesión
      var objSession = {};
      //Obtener sessionId
      objSession.sessionId = session.sessionId;
      //Llamar a función de generar token
      newTok(objSession,callbackS);
    }
  });
}

//Definir función de generar token
var newTok = function(obj, fn){
    //Generar token
    token = opentok.generateToken(obj.sessionId);
    //Almacenar objeto (obj.tokenId) en variable token
    obj.tokenId = token;
    //Definir "obj"
    fn(obj);
}


//Exportar la nueva sesión con sessionId y token
module.exports.credentials = newSession;
