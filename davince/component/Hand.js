import { Component } from 'react';
import Card from './Card';

class Hand extends Component {
  mapPlayerToStyle(position) {
    const flexDirection = [
      'row-reverse','column','row','column-reverse',
    ]
    return {
      display: 'flex',
      flexDirection: flexDirection[position],
      justifyContent: 'center'
    };
  }

  render() {
    const {hand, player, relativePosition} = this.props;
    const style = this.mapPlayerToStyle(relativePosition);
    return (
      <div className={relativePosition} style={style}>
        {
          hand.map((card, index) => {
            return (
              <Card index={index} card={card} player={player} relativePosition={relativePosition} />
            );
          })}
      </div>
    );
  }
}

export default Hand;