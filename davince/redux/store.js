
import { combineReducers, createStore, applyMiddleware } from 'redux';

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

function getDeck() {
  const deck = [];
  deck.push({
    background: 'white',
    color: 'black',
    rank: '-',
    isOpen: false
  });
  deck.push({
    background: 'black',
    color: 'white',
    rank: '-',
    isOpen: false
  });
  for (let i = 0; i < 12; i++) {
    deck.push({
      background: 'white',
      color: 'black',
      rank: i,
      isOpen: false
    });
    deck.push({
      background: 'black',
      color: 'white',
      rank: i,
      isOpen: false
    });
  }
  return deck;
}

function shuffle(deck) {
  deck.sort(() => Math.random() - 0.5);
}

function getInitialState() {
  const deck = getDeck();
  shuffle(deck);
  const state = {
    player: [[],[],[],[]],
    deck,
    turn: {
      player: 0,
      step: 'draw'
    }
  };
  initDraw(state);
  return {state};
}

const reducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'PLAY':
      return {};
    default:
      return state;
  }
}
const reducers = combineReducers({
  reducer
});

const createStoreWithMiddleware = applyMiddleware()(createStore);

const store = createStoreWithMiddleware(reducers);

export default store;
