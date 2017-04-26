
function addPlayer(room, userName) {
  if (!room || !room.turn) {
    return {
      room: {
        error: '房间不存在'
      }
    }
  }
  if(room.turn.step !== 'login') {
    return {
      room: {
        error: '房间已满'
      }
    }
  }
  const playerId = room.turn.player;
  room.turn.player += 1;
  room.playerInfo[playerId] = {
    userName
  }
  return {room, playerId};
}
export default addPlayer;