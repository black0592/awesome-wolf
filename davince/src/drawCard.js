
function drawCard(room, player, index) {
  if (!room) {
    return {
      room: {
        error: '房间不存在'
      }
    }
  }
  if(!room.deck[index]) {
    return {
      room: {
        error: '卡牌不存在'
      }
    }
  }
  const nextState = Object.assign({}, room)
  nextState.player[player].push(nextState.deck.splice(index, 1)[0]);

  return nextState;
}
export default drawCard;