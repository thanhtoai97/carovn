/* eslint-disable react/no-unused-state */
import React from 'react';
import Square from './Square';

/*
const Board = props => {
  const { squares, xIsNext, onClick } = props;
  return (
    <div className="board-row">
      {squares.map((value, square) => {
        return (
          <Square
            key={square.id}
            id={square}
            className="square"
            xIsNext={xIsNext}
            value={squares[square]}
            onClick={() => onClick(square)}
          />
        );
      })}
    </div>
  );
};
*/

/*
class Board extends React.Component {
  // Create the 3 x 3 board
  createBoard(row, col) {
    const board = [];
    let cellCounter = 0;

    for (let i = 0; i < row; i += 1) {
      const columns = [];
      for (let j = 0; j < col; j += 1) {
        columns.push(this.renderSquare((cellCounter += 1)));
      }
      board.push(
        <div key={i} className="board-row">
          {columns}
        </div>
      );
    }

    return board;
  }

  renderSquare(i) {
    const { squares, onClick } = this.props;
    return (
      <Square
        className="square"
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }

  render() {
    return <div>{this.createBoard(20, 20)}</div>;
  }
}
*/

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
