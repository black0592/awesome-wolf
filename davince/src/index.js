import getInitialState from './getInitialState';
import addPlayer from './addPlayer';
import drawCard from './drawCard'
const rooms = [];
let roomPointer = -1;
function handler(client){
  const cache = {
    roomId: null,
    whoAmI: null
  };
  client.on('init', function (data) {
    const { userName, roomId } = data;
    let preRoom = null;
    if(roomId) {
      cache.roomId = roomId
      preRoom = rooms[roomId];
    } else {
      cache.roomId = ++roomPointer;
      preRoom = getInitialState(roomPointer)
    }
    const { room, playerId } = addPlayer(preRoom, userName)
    rooms[cache.roomId] = room;
    cache.whoAmI = playerId;
    room.whoAmI = playerId;
    client.emit('init', room)
  })
  client.on('draw', function(data){
    const room = rooms[cache.roomId]
    const nextRoom = drawCard(room, data.player, data.index)
    client.emit('dirt', nextRoom)
  });
  client.on('event', function(data){
    client.emit('dirt', rooms[cache.roomId])
  });
  client.on('disconnect', function(){console.log('disconnect')});
}
export default handler;