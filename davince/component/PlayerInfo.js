import { Component } from 'react';
import Card from './Card';

class PlayerInfo extends Component {
  mapPositionToStyle(position) {
    const paddingPx = 10
    const heightPx = 10
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
      leftPx + 'px', paddingRightPx + 'px', leftPx + 'px', paddingPx + 'px'
    ]
    const top = [
      paddingRightPx + 'px', leftPx + 'px', paddingPx + 'px', leftPx + 'px'
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
    const { relativePosition, hand, belong, player } = this.props;
    const style = this.mapPositionToStyle(relativePosition);
    return (
      <div className={relativePosition} style={style}>
        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'pink'}}>

        </div>
      </div>
    );
  }
}

export default PlayerInfo;