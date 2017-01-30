
function drawCard(hand, deck) {
  hand.push(deck.pop());
  return hand;
}

function drawFourCard(hand, deck) {
  for (let i = 0; i < 4; i++) {
    drawCard(hand, deck);
  }
  return hand;
}

function compare(a, b) {
  if (a.rank == '-' || b.rank == '-') {
    // seems good https://trello.com/c/2acMc6pd/1-1-sort-sort
    return 1;
  }
  if (a.rank < b.rank) {
    return -1;
  }
  if (a.rank > b.rank) {
    return 1;
  }
  if (a.rank == b.rank && a.background == 'white') {
    return -1;
  }
  return 1;
}

function initDraw(state) {
  const {player, deck} = state;
  player.map((hand) => {
    drawFourCard(hand, deck);
    hand.sort(compare);
  });
}

export default initDraw;