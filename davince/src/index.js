import getInitialState from './getInitialState';
const rooms = [];
let roomPointer = -1;
function handler(client){
  let roomIdCache = null;
  client.on('init', function (data) {
    const { userId, roomId } = data;
    let room = null;
    if(roomId) {
      roomIdCache = roomId
      room = rooms[roomId];
    } else {
      roomIdCache = ++roomPointer;
      room = getInitialState(roomPointer)
    }

    // addPlayer(room)
    rooms[roomIdCache] = room;
    client.emit('init', room)
  })
  client.on('event', function(data){
    client.emit('event', rooms[roomIdCache])
  });
  client.on('disconnect', function(){console.log('disconnect')});
}
export default handler;