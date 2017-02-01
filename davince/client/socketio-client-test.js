var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){});
socket.on('disconnect', function(){});

socket.on('init', function (room1) {
  console.log('init', room1)
})
socket.on('event', function(data){
  console.log('event: ',data)
  socket.emit('event', data)
});
// socket.emit('event', 0)
// socket.emit('event', 0)