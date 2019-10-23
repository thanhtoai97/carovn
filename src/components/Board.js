import React from 'react';
import Square from './Square';

const Board = props => {
  const renderSquare = move => {
    const { winner, squares, onClick } = props;
    const winningSquare = !!(winner && winner.includes(move));
    return (
      <Square
        key={`square ${move}`}
        value={squares[move]}
        onClick={() => onClick(move)}
        winningSquare={winningSquare}
      />
    );
  };

  const renderSquares = n => {
    const squares = [];
    for (let i = n; i < n + 20; i += 1) {
      squares.push(renderSquare(i));
    }
    return squares;
  };

  const renderRows = i => {
    return <div className="board-row">{renderSquares(i)}</div>;
  };

  return (
    <div>
      {renderRows(0)}
      {renderRows(20)}
      {renderRows(40)}
      {renderRows(60)}
      {renderRows(80)}
      {renderRows(100)}
      {renderRows(120)}
      {renderRows(140)}
      {renderRows(160)}
      {renderRows(180)}
      {renderRows(200)}
      {renderRows(220)}
      {renderRows(240)}
      {renderRows(260)}
      {renderRows(280)}
      {renderRows(300)}
      {renderRows(320)}
      {renderRows(340)}
      {renderRows(360)}
      {renderRows(380)}
    </div>
  );
};

export default Board;
