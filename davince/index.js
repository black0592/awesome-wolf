var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(client){
  client.on('event', function(data){
    console.log('event: ',data)
    client.emit('event',data+1)
  });
  client.on('disconnect', function(){console.log('disconnect')});
});
server.listen(3000);