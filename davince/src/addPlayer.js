
function addPlayer(room, userId) {
  if (!room) {
    return {
      error: '房间不存在'
    }
  }
  if(room.turn.step !== 'waiting') {
    return {
      error: '房间已满'
    }
  }
  const playerId = room.turn.player;
  room.turn.player += 1;
  room.playerInfo[playerId] = {
    userId
  }
  return room;
}
export default addPlayer;