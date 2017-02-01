var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){});
socket.on('disconnect', function(){});

socket.on('init', function (room1) {
  console.log('init', room1)
  socket.emit('event')
})
socket.on('event', function(data){
  console.log('event: ',data)
});
socket.emit('init', {userId: 'dancerphil', roomId: null})