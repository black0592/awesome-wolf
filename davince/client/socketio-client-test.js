var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){});
socket.on('event', function(data){
  console.log('event: ',data)
});
socket.on('disconnect', function(){});
socket.emit('event')