/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import React from 'react';
import Board from '../components/Board';

import { playerMove, timeTravel, sortHistory } from '../acctions/gameAction';

function calculateWinwer(squares) {
  for (let i = 0; i < 400; i += 1) {
    if (
      squares[i] &&
      squares[i] === squares[i - 20] &&
      squares[i] === squares[i - 40] &&
      squares[i] === squares[i + 20] &&
      squares[i] === squares[i + 40] &&
      squares[i + 60] !== squares[i - 60]
    ) {
      return { player: squares[i], line: [i - 40, i - 20, i, i + 20, i + 40] };
    }
    if (
      squares[i] &&
      squares[i] === squares[i - 20] &&
      squares[i] === squares[i - 40] &&
      squares[i] === squares[i - 60] &&
      squares[i] === squares[i - 80] &&
      squares[i + 20] !== squares[i - 100]
    ) {
      return { player: squares[i], line: [i - 80, i - 60, i - 40, i - 20, i] };
    }
    if (
      squares[i] &&
      squares[i] === squares[i + 20] &&
      squares[i] === squares[i + 40] &&
      squares[i] === squares[i + 60] &&
      squares[i] === squares[i + 80] &&
      squares[i + 100] !== squares[i - 20]
    ) {
      return { player: squares[i], line: [i, i + 20, i + 40, i + 60, i + 80] };
    }
    if (
      squares[i] &&
      squares[i] === squares[i - 1] &&
      squares[i] === squares[i - 2] &&
      squares[i] === squares[i + 1] &&
      squares[i] === squares[i + 2] &&
      squares[i + 3] !== squares[i - 3]
    ) {
      return { player: squares[i], line: [i - 2, i - 1, i, i + 1, i + 2] };
    }
    if (
      squares[i] &&
      squares[i] === squares[i - 1] &&
      squares[i] === squares[i - 2] &&
      squares[i] === squares[i - 3] &&
      squares[i] === squares[i - 4] &&
      squares[i - 5] !== squares[i + 1]
    ) {
      return { player: squares[i], line: [i - 4, i - 3, i - 2, i - 1, i] };
    }
    if (
      squares[i] &&
      squares[i] === squares[i + 1] &&
      squares[i] === squares[i + 2] &&
      squares[i] === squares[i + 3] &&
      squares[i] === squares[i + 4] &&
      squares[i + 5] !== squares[i - 1]
    ) {
      return { player: squares[i], line: [i, i + 1, i + 2, i + 3, i + 4] };
    }
    if (
      squares[i] &&
      squares[i] === squares[i - 19] &&
      squares[i] === squares[i - 38] &&
      squares[i] === squares[i + 19] &&
      squares[i] === squares[i + 38] &&
      squares[i + 57] !== squares[i - 57]
    ) {
      return { player: squares[i], line: [i - 38, i - 19, i, i + 19, i + 38] };
    }
    if (
      squares[i] &&
      squares[i] === squares[i - 19] &&
      squares[i] === squares[i - 38] &&
      squares[i] === squares[i - 57] &&
      squares[i] === squares[i - 76] &&
      squares[i + 19] !== squares[i - 95]
    ) {
      return { player: squares[i], line: [i - 76, i - 57, i - 38, i - 19, i] };
    }
    if (
      squares[i] &&
      squares[i] === squares[i + 19] &&
      squares[i] === squares[i + 38] &&
      squares[i] === squares[i + 57] &&
      squares[i] === squares[i + 76] &&
      squares[i + 95] !== squares[i - 19]
    ) {
      return { player: squares[i], line: [i, i + 19, i + 38, i + 57, i + 76] };
    }
    if (
      squares[i] &&
      squares[i] === squares[i - 21] &&
      squares[i] === squares[i - 42] &&
      squares[i] === squares[i + 21] &&
      squares[i] === squares[i + 42] &&
      squares[i + 63] !== squares[i - 63]
    ) {
      return { player: squares[i], line: [i - 21, i - 42, i, i + 21, i + 42] };
    }
    if (
      squares[i] &&
      squares[i] === squares[i + 21] &&
      squares[i] === squares[i + 42] &&
      squares[i] === squares[i + 63] &&
      squares[i] === squares[i + 84] &&
      squares[i + 105] !== squares[i - 23]
    ) {
      return { player: squares[i], line: [i, i + 21, i + 42, i + 63, i + 84] };
    }
    if (
      squares[i] &&
      squares[i] === squares[i - 21] &&
      squares[i] === squares[i - 42] &&
      squares[i] === squares[i - 63] &&
      squares[i] === squares[i - 84] &&
      squares[i + 23] !== squares[i - 105]
    ) {
      return { player: squares[i], line: [i - 84, i - 63, i - 42, i - 21, i] };
    }
  }
  return null;
}

class Game extends React.Component {
  playerMove(i) {
    const { history, stepNumber, xIsNext, playerMove } = this.props;
    const historys = history.slice(0, stepNumber + 1);
    const current = historys[historys.length - 1];
    const squares = current.squares.slice();

    if (calculateWinwer(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    playerMove(historys, squares);
  }

  timeTravel(step) {
    const { timeTravel } = this.props;
    timeTravel(step);
  }

  sortHistory() {
    const { isDescending, sortHistory } = this.props;
    sortHistory(isDescending);
  }

  render() {
    const { history, stepNumber, xIsNext, isDescending } = this.props;
    const current = history[stepNumber];
    const winner = calculateWinwer(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'NEW GAME';
      return (
        <li key={move.id}>
          <button type="button" onClick={() => this.timeTravel(move)}>
            {move === stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner:${winner.player}`;
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            winner={winner && winner.line}
            squares={current.squares}
            onClick={i => this.playerMove(i)}
          />
        </div>
        <div className="right_col_game">
          <div>{status}</div>
          <ol>{isDescending ? moves : moves.reverse()}</ol>
          <button type="button" onClick={() => this.sortHistory()}>
            Sort By: {isDescending ? 'Descending' : 'Ascending'}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  history: state.game.history,
  currentBoard: state.game.currentBoard,
  xIsNext: state.game.xIsNext,
  isDescending: state.game.isDescending,
  stepNumber: state.game.stepNumber,
  timeTraveled: state.game.timeTraveled,
  showHistory: state.game.showHistory,
  endOfGame: state.game.endOfGame
});

const matchDispatchToProps = dispatch => ({
  playerMove: (history, squares) => dispatch(playerMove(history, squares)),
  sortHistory: isDescending => dispatch(sortHistory(isDescending)),
  timeTravel: step => dispatch(timeTravel(step))
});

export default withRouter(
  connect(
    mapStateToProps,
    matchDispatchToProps
  )(Game)
);
