//Script para el manejo de Session

// Inicializar objeto session
var session = TB.initSession(sessionId);

// Inicializar objeto Publisher, y colocarlo en la vista con el id="publisher"
var publisher = TB.initPublisher(apiKey, 'publisher');

// Manejadores de eventos
session.on({

  // Esta función se ejecuta cuando session.connect() se complete de manera asíncrona
  sessionConnected: function(event) {
    // Publicar el publisher inicializado (esto activará 'streamCreated' en otros clientes)
    session.publish(publisher);
  },

  // Esta función se ejecuta cuando cuando otro cliente publica un stream (ej. session.publish())
  streamCreated: function(event) {
    // Crear un container para un nuevo Subscriber, asignarle un id usando the streamId, colocarlo adentro del elemento id="subscribers"
    var subContainer = document.createElement('div');
    subContainer.id = 'stream-' + event.stream.streamId;
    document.getElementById('subscribers').appendChild(subContainer);

    //Opciones para el elemento subscriber
    var optionsSubscriber = {width: 480, height: 320, insertMode: 'append', preferredResolution: {width: 1024, height: 768}, preferredFrameRate: 30};

    // Suscribir el stream que causó este evento, ponerlo dentro del contenedor que hemos creado
    session.subscribe(event.stream, subContainer, optionsSubscriber);

    //
  }

});

// Conectar la  Session usando el 'apiKey' de la aplicación y un 'token' como permiso
session.connect(apiKey, token);
