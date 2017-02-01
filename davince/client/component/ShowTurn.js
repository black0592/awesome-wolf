import { Component } from 'react';
import Card from './Card';

class ShowTurn extends Component {
  render() {
    const { turn, player } = this.props;
    return (
      <div className={'show-turn'}
           style={{
             position: 'absolute',
             width: '324px',
             left: '138px',
             top: '408px',
             textAlign: 'center'
           }}
      >
        {`${turn.player}'s ${turn.step}`}
      </div>
    );
  }
}

export default ShowTurn;