var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(client){
  console.log(client)
  client.on('event', function(data){
    client.emit('event')
  });
  client.on('disconnect', function(){console.log('disconnect')});
});
server.listen(3000);