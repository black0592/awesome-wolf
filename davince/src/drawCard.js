
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
  const playerHand = room.player[player]
  const card = room.deck.splice(index, 1)[0];
  playerHand.push(card);
  return room;
}
export default drawCard;