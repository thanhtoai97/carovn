/* eslint-disable react/no-unused-state */
import React from 'react';
import Square from './Square';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(400).fill(null),
      xIsNext: true
    };
  }

  renderSquare(i) {
    const { winner, squares, onClick } = this.props;
    const winningSquare = !!(winner && winner.includes(i));
    return (
      <Square
        key={`square ${i}`}
        value={squares[i]}
        onClick={() => onClick(i)}
        winningSquare={winningSquare}
      />
    );
  }

  renderSquares(n) {
    const squares = [];
    for (let i = n; i < n + 20; i += 1) {
      squares.push(this.renderSquare(i));
    }
    return squares;
  }

  renderRows(i) {
    return <div className="board-row">{this.renderSquares(i)}</div>;
  }

  render() {
    return (
      <div>
        {this.renderRows(0)}
        {this.renderRows(20)}
        {this.renderRows(40)}
        {this.renderRows(60)}
        {this.renderRows(80)}
        {this.renderRows(100)}
        {this.renderRows(120)}
        {this.renderRows(140)}
        {this.renderRows(160)}
        {this.renderRows(180)}
        {this.renderRows(200)}
        {this.renderRows(220)}
        {this.renderRows(240)}
        {this.renderRows(260)}
        {this.renderRows(280)}
        {this.renderRows(300)}
        {this.renderRows(320)}
        {this.renderRows(340)}
        {this.renderRows(360)}
        {this.renderRows(380)}
      </div>
    );
  }
}

export default Board;
