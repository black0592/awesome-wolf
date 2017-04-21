import { Component } from 'react';

const style = {
  lineHeight: '30px',
  fontSize: '30px',
  position: 'absolute',
  top: '-35px',
}
class RoomId extends Component {
  render() {
    const { roomId } = this.props;
    return (
      <div style={style}>
        房间号：{roomId}
      </div>
    );
  }
}

export default RoomId;