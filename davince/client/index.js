const {Component} = React;
const {Provider} = ReactRedux;
const {connect} = ReactRedux;
import Hand from './component/Hand';
import PlayerInfo from './component/PlayerInfo';
import RoomId from './component/RoomId';
import ShowTurn from './component/ShowTurn';
import socket from './helper/socket';

class Main_ extends Component {
  componentWillMount() {
    this.state = {roomId: null}
    // this.props.dispatch({type: 'INITDRAW'})
    // console.log(`this.props.dispatch({type: 'INITDRAW'})`)
  }
  init(room) {
    console.log('init', room)
    this.props.dispatch({type: 'INIT', payload: room})
  }

  dirt(room) {
    this.props.dispatch({type: 'DIRT', payload: room})
  }

  componentDidMount() {
    socket.on('connect', function(){});
    socket.on('disconnect', function(){});

    socket.on('init', this.init.bind(this))
    socket.on('dirt', this.dirt.bind(this));
  }

  roomHandler(event) {
    this.setState({roomId: event.target.value});
  }

  initHandler() {
    const { roomId } = this.state;
    socket.emit('init', {userName: 'dancerphil', roomId})
  }

  render() {
    const {notInit} = this.props;
    if(notInit) {
      return (
        <div>
          <input type="text" onChange={this.roomHandler.bind(this)} value={this.state.roomId}/>
          <div onClick={this.initHandler.bind(this)}>开始游戏</div>
        </div>
        )
    }
    const {roomId, whoAmI, player, deck, turn} = this.props;
    return (
      <div className="container">
        <RoomId roomId={roomId + ' whoAmI: ' + whoAmI} />
        <PlayerInfo
          relativePosition={(whoAmI + 4) % 4}
          hand={player[0]}
          belong={0}
          player={whoAmI}
        />
        <PlayerInfo
          relativePosition={(whoAmI + 3) % 4}
          hand={player[1]}
          belong={1}
          player={whoAmI}
        />
        <PlayerInfo
          relativePosition={(whoAmI + 2) % 4}
          hand={player[2]}
          belong={2}
          player={whoAmI}
        />
        <PlayerInfo
          relativePosition={(whoAmI + 1) % 4}
          hand={player[3]}
          belong={3}
          player={whoAmI}
        />
        <Hand
          relativePosition={(whoAmI + 4) % 4}
          hand={player[0]}
          belong={0}
          player={whoAmI}
        />
        <Hand
          relativePosition={(whoAmI + 3) % 4}
          hand={player[1]}
          belong={1}
          player={whoAmI}
        />
        <Hand
          relativePosition={(whoAmI + 2) % 4}
          hand={player[2]}
          belong={2}
          player={whoAmI}
        />
        <Hand
          relativePosition={(whoAmI + 1) % 4}
          hand={player[3]}
          belong={3}
          player={whoAmI}
        />
        <Hand
          relativePosition={'deck'}
          hand={deck}
          belong={'deck'}
          player={whoAmI}
        />
        <ShowTurn
          turn={turn}
          player={player}
        />
      </div>
    );
  }
}
;

const Main = connect(({reducer}) => {
  const state = reducer
  return state;
}, (dispatch) => {
  return {dispatch}
})(Main_);

import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>
  , document.getElementById('playground'));
