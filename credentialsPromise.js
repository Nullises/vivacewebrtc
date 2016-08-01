//Dependencias
var opentok = require('./ot').opentok;
var apiKey = require('./ot').apiKey;
var apiSecret = require('./ot').apiSecret;

//Definir variables
var sessionId;
var token;

//Definir función de crear nueva sesión
var newSession = function(){
  // *** Regresar una promise
  return new Promise(function(resolve, reject) {
    opentok.createSession({mediaMode:"relayed"}, function(err, session){
      // *** Reject en error
      if (err) {
          reject(err);
      } else {
        var objSession = {};
        objSession.sessionId = session.sessionId;
        // *** Llamar a newTok `resolve` con el objeto cuando esté listo
        newTok(objSession, resolve);
      }
    });
  });
};

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
module.exports.credentialsPromise = newSession;
