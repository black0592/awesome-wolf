const {Component} = React;
const {createStore, applyMiddleware} = Redux;
const {Provider} = ReactRedux;
const {connect} = ReactRedux;
const {combineReducers} = Redux;

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
    if (Math.random() < 0.5) {
      return -1;
    }
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
  Object.keys(player).map((key) => {
    const hand = player[key];
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
    player: {
      east: [],
      south: [],
      west: [],
      north: []
    },
    deck
  };
  initDraw(state);
  return {state};
}

class Main_ extends Component {
  render() {
    const {player} = this.props.state;
    return (
      <div className="container">
        <div style={{
          position: 'absolute',
          width: '580px',
          height: '580px',
          left: 'calc(50% - 290px)',
          top: 'calc(50% - 290px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <Hand
            hand={player.north}
            player="north"
          />
          <Hand
            hand={player.south}
            player="south"
          />
        </div>
        <div style={{
          position: 'absolute',
          width: '580px',
          height: '580px',
          left: 'calc(50% - 290px)',
          top: 'calc(50% - 290px)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Hand
            hand={player.west}
            player="west"
          />
          <Hand
            hand={player.east}
            player="east"
          />
        </div>
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

class Hand extends Component {
  mapPlayerToStyle(player) {
    const flexDirection = {
      east: 'column-reverse',
      south: 'row-reverse',
      west: 'column',
      north: 'row'
    };
    return {
      display: 'flex',
      flexDirection: flexDirection[player],
      justifyContent: 'center'
    };
  }

  render() {
    const {hand, player} = this.props;
    const style = this.mapPlayerToStyle(player);
    return (
      <div className={player} style={style}>
        {
          hand.map((card) => <Card card={card} player={player}/>)}
      </div>
    );
  }
}
class Card extends Component {

  render() {
    let {card, player} = this.props;
    if (!card) {
      card = {
        background: '#eee',
        color: 'eee',
        rank: '',
        isOpen: false
      };
    }
    const {background, color, rank, isOpen} = card;
    let cardElement = null;
    let className = ''
    if (isOpen) {
      className = 'checked'
      cardElement = rank
    } else if (player === 'south') {
      className = 'checked'
      cardElement = rank
    } else {
      className = 'unchecked'
      cardElement = 'T'
    }
    const cardFaceStyle = {
      background,
      color,
      position: 'absolute',
      height: '100%',
      width: '100%',
      backfaceVisibility: 'hidden',
      boxShadow: '1px 1px 2px #aaa'
    }
    return (
      <div
        style={{
          display: 'inline-block',
          margin: '2px',
          width: '50px',
          height: '50px',
          fontSize: '40px',
          fontFamily: 'fantasy',
          textAlign: 'center',
          perspective: '200px',
          transformStyle: 'preserve-3d',
          cursor: 'pointer'
        }}
        className={'card-container ' + className}
      >
        <div
          className="card"
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <div
            className="cover"
            style={ cardFaceStyle }
          >
            {'<'}
          </div>
          <div
            className="rank"
            style={ cardFaceStyle }
          >
            {cardElement}
          </div>
        </div>
      </div>
    );
  }
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

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Main />
  </Provider>
  , document.getElementById('playground'));
