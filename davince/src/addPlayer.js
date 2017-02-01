
function addPlayer(room, userId) {
  if (!room) {
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
  const nextState = Object.assign({}, room)
  nextState.turn.player += 1;
  nextState.playerInfo[playerId] = {
    userId
  }
  return {room: nextState, playerId};
}
export default addPlayer;