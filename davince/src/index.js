import getInitialState from './getInitialState';
import addPlayer from './addPlayer';
import drawCard from './drawCard'
const DB = [];
const ClientPool = [];
let DBPointer = -1;
function handler(client){
  const cache = {
    roomId: null,
  };

  client.on('init', function (data) {
    const { userName, roomId } = data;
    let initRoom = null;
    let initClients = [];
    if(roomId) {
      cache.roomId = roomId
      initRoom = getRoom(roomId);
      initClients = ClientPool[roomId];
    } else {
      cache.roomId = ++DBPointer;
      initRoom = getInitialState(DBPointer)
    }
    const { room, playerId } = addPlayer(initRoom, userName)
    initClients.push({client, whoAmI: playerId});
    DB[cache.roomId] = room;
    ClientPool[cache.roomId] = initClients;
    // room.whoAmI = playerId;
    // client.emit('init', room)
    emit(cache.roomId, 'init')
  });

  client.on('draw', function(data){
    const { player, index } = data
    const { roomId } = cache;
    const initRoom = getRoom(roomId);
    const room = drawCard(initRoom, player, index)
    DB[roomId] = room;
    emit(cache.roomId)
  });

  client.on('disconnect', function(){
    console.warn('disconnect')
  });
}

function emit(roomId, namespace = 'dirt') {
  const room = DB[roomId];
  const clients = ClientPool[roomId];
  clients.forEach((item) => {
    const {client, whoAmI} = item;
    room.whoAmI = whoAmI;
    client.emit(namespace, room)
  })
}

function getRoom(roomId) {
  return Object.assign({}, DB[roomId]);
}

export default handler;