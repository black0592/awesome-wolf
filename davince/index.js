var server = require('http').createServer();
var io = require('socket.io')(server);
import getInitialState from './src/getInitialState';
io.on('connection', function(client){
  const room1 = getInitialState()
  client.emit('init', room1)
  client.on('event', function(data){
    console.log('event: ',data)
    client.emit('event',data+1)
  });
  client.on('disconnect', function(){console.log('disconnect')});
});
server.listen(3000);