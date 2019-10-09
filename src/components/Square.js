import React from 'react';

const Square = props => {
  const winningSquareStyle = {
    backgroundColor: 'yellow'
  };
  const whenToClick = square => {
    return props.onClick(square);
  };
  const { winningSquare, id, value } = props;
  return (
    <button
      type="button"
      className="square"
      style={winningSquare ? winningSquareStyle : null}
      onClick={() => whenToClick(id)}
    >
      {value}
    </button>
  );
};

export default Square;
