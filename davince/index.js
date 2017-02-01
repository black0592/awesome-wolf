var server = require('http').createServer();
var io = require('socket.io')(server);
import handler from './src';
io.on('connection', handler);
server.listen(3000);