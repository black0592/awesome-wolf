import { Component } from 'react';

class Card extends Component {
  render() {
    let {card, player, relativePosition, index} = this.props;
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
    } else if (relativePosition === 0) {
      className = 'checked'
      cardElement = rank
    } else {
      // className = 'unchecked'
      className = 'checked'
      cardElement = rank
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

export default Card;