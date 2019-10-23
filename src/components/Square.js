import React from 'react';

function Square(props) {
  const winningSquareStyle = {
    backgroundColor: 'yellow'
  };
  const { winningSquare, onClick, value } = props;
  return (
    <button
      type="button"
      className="square"
      style={winningSquare ? winningSquareStyle : null}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
