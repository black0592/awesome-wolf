import { Component } from 'react';
import Card from './Card';

class Hand extends Component {
  mapPositionToStyle(position) {
    const paddingPx = 30
    const heightPx = 54
    const paddingRightPx = 600 - heightPx - paddingPx
    const widthPx = 600 - heightPx * 2 - paddingPx * 2;
    const leftPx = heightPx + paddingPx;
    const width = [
      widthPx + 'px', heightPx + 'px', widthPx + 'px', heightPx + 'px'
    ]
    const height = [
      heightPx + 'px', widthPx + 'px', heightPx + 'px', widthPx + 'px'
    ]
    const left = [
      leftPx + 'px', paddingPx + 'px', leftPx + 'px', paddingRightPx + 'px'
    ]
    const top = [
      paddingRightPx + 'px', leftPx + 'px', paddingPx + 'px', leftPx + 'px'
    ]
    const flexDirection = [
      'row-reverse', 'column-reverse', 'row', 'column'
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
    const { relativePosition, hand, belong, player } = this.props;
    if (relativePosition === 'deck'){
      return (
        <div className={relativePosition} style={{
          position: 'absolute',
          display: 'flex',
          width: '324px',
          left: '138px',
          top: '138px',
          flexWrap: 'wrap'
        }}>
          {
            hand.map((card, index) => {
              return (
                <Card index={index} relativePosition={relativePosition} card={card} belong={belong} player={player} />
              );
            })}
        </div>
      );
    }
    const style = this.mapPositionToStyle(relativePosition);
    return (
      <div className={relativePosition} style={style}>
        {
          hand.map((card, index) => {
            return (
              <Card index={index} relativePosition={relativePosition} card={card} belong={belong} player={player} />
            );
          })}
      </div>
    );
  }
}

export default Hand;