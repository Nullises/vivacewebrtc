//Script para ajustar resolución de video
var publisherProperties = {resolution: '1280x720'};
var publisher = OT.initPublisher(targetElement, publisherProperties);
publisher.on('streamCreated', function(event) {
 console.log('Stream resolution: ' + event.stream.videoDimensions.width + 'x' + event.stream.videoDimensions.height);
});
