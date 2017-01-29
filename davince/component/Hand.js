import { Component } from 'react';
import Card from './Card';

class Hand extends Component {
  mapPlayerToStyle(position) {
    const sidePx = 600 - 54 - 54 - 10 - 10;
    const width = [
      sidePx + 'px', '54px', sidePx + 'px', '54px'
    ]
    const height = [
      '54px', sidePx + 'px', '54px', sidePx + 'px'
    ]
    const left = [
      '64px', '536px', '64px', '10px'
    ]
    const top = [
      '536px', '64px', '10px', '64px'
    ]
    const flexDirection = [
      'row-reverse','column','row','column-reverse',
    ]
    return {
      position: 'absolute',
      display: 'flex',
      width: width[position],
      height: height[position],
      left: left[position],
      top: top[position],
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