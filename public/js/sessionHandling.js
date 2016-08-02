//Definir variables
var session;
var publisher;
var connectionCount = 0;

//Función para conectar
function connect(){
  //Iniciar sesión con apiKey y sessionId (vista)
  session = OT.initSession(apiKey, sessionId);
  //Eventos de conexión: creada, destruida, sesión desconectada y stream creado
  session.on({
    connectionCreated: function(event){
      connectionCount++;
      console.log(connectionCount + ' conexiones.');
    },
    connectionDestroyed: function(event){
      connectionCount--;
      console.log(connectionCount + ' conexiones.');
    },
    sessionDisconnected: function sessionDisconnectHandler(event){
      console.log('Desconectado de la sesión');
      document.getElementById('disconnectBtn').style.display = 'none';
      if(event.reason == 'networkDisconnected'){
        alert('Su conexión ha terminado');
      }
    },
    streamCreated: function(event){
      var subscriberProperties = {width: 640, height: 480,
        insertMode: 'append',
        preferredResolution: {width: 1024, height: 768},
        preferredFrameRate: 30
      }
      //Subscriber
      var subscriber = session.subscribe(event.stream, 'subscribers', subscriberProperties, function(error){
        if(error){
          console.log(error);
        }else{
          console.log('Subscriber añadido');
        }
      });
    }
  });
  //Manejo de errores
  session.connect(token, function(error){
    if(error){
      console.log('Imposible conectar: ', error.message);
    }else{
      document.getElementById('disconnectBtn').style.display = 'block';
      console.log('Conectado a la sesión');
    }
    if(session.capabilities.publish == 1){
      session.publish(publisher);
    }else{
      console.log("Usted no puede emitir stream de audio/video");
    }
  });
}

//Función para desconectar
function disconnect(){
  session.disconnect();
}

connect();

//Iniciar publicación / Establecer resolución y frameRate (tasa de refrescamiento)
publisher = OT.initPublisher('publisher', {
  resolution: '1024x768',
  frameRate: 30
});

//Eventos de publicación
publisher.on({
  //Crear stream y destruir stream
  streamCreated: function(event){
    console.log("El publisher ha comenzado a emitir stream");
  },
  streamDestroyed: function(event){
    alert("El publisher ha dejado de emitir stream. Motivo: " + event.reason);
  }
});
