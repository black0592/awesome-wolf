import getInitialState from './getInitialState';
import addPlayer from './addPlayer';
const rooms = [];
let roomPointer = -1;
function handler(client){
  const cache = {
    roomId: null,
    whoAmI: null
  };
  client.on('init', function (data) {
    const { userId, roomId } = data;
    let preRoom = null;
    if(roomId) {
      cache.roomId = roomId
      preRoom = rooms[roomId];
    } else {
      cache.roomId = ++roomPointer;
      preRoom = getInitialState(roomPointer)
    }
    const { room, playerId } = addPlayer(preRoom, userId)
    cache.whoAmI = playerId;
    rooms[cache.roomId] = room;
    client.emit('init', room)
  })
  client.on('draw', function(data){
    console.log('draw')
    client.emit('event', rooms[cache.roomId])
  });
  client.on('event', function(data){
    client.emit('event', rooms[cache.roomId])
  });
  client.on('disconnect', function(){console.log('disconnect')});
}
export default handler;