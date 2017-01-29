const {Component} = React;
const {createStore, applyMiddleware} = Redux;
const {Provider} = ReactRedux;
const {connect} = ReactRedux;
const {combineReducers} = Redux;
import Hand from './component/Hand';

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
    deck
  };
  initDraw(state);
  return {state};
}

class Main_ extends Component {
  render() {
    const {player, deck} = this.props.state;
    return (
      <div className="container">
        <Hand
          relativePosition={0}
          hand={player[0]}
          belong={0}
          player={0}
        />
        <Hand
          relativePosition={1}
          hand={player[1]}
          belong={1}
          player={0}
        />
        <Hand
          relativePosition={2}
          hand={player[2]}
          belong={2}
          player={0}
        />
        <Hand
          relativePosition={3}
          hand={player[3]}
          belong={3}
          player={0}
        />
        <Hand
          relativePosition={'deck'}
          hand={deck}
          belong={'deck'}
          player={0}
        />
      </div>
    );
  }
}
;

const Main = connect(({reducer}) => {
  const state = reducer.state
  return {state};
}, (dispatch) => {
  return {}
})(Main_);

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

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Main />
  </Provider>
  , document.getElementById('playground'));
