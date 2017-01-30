import { Component } from 'react';
import Card from './Card';

class ShowTurn extends Component {
  render() {
    const { turn, player } = this.props;
    return (
      <div className={'show-turn'}>
        {`${turn.player}'s ${turn.step}`}
      </div>
    );
  }
}

export default ShowTurn;