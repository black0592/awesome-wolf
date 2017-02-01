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
    let room = null;
    if(roomId) {
      cache.roomId = roomId
      room = rooms[roomId];
    } else {
      cache.roomId = ++roomPointer;
      room = getInitialState(roomPointer)
    }

    cache.whoAmI = addPlayer(room, userId)
    rooms[cache.roomId] = room;
    client.emit('init', room)
  })
  client.on('event', function(data){
    client.emit('event', rooms[cache.roomId])
  });
  client.on('disconnect', function(){console.log('disconnect')});
}
export default handler;