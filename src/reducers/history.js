const initialState = [
  {
    history: [
      {
        squares: new Array(400).fill(null)
      }
    ],
    currentBoard: new Array(400).fill(null),
    stepNumber: 0,
    xIsNext: true,
    isDescending: true
  }
];
const history = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_HISTORY':
      return {
        ...state,
        history: action.history.concat([
          {
            squares: action.squares
          }
        ]),
        currentBoard: action.squares,
        stepNumber: action.length,
        xIsNext: !state.xIsNext
      };
    default:
      return state;
  }
};

export default history;

/*
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

/*
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import React from 'react';
import Board from '../components/Board';

import {
  playerMove,
  timeTravel,
  toggleHistory,
  newGame
} from '../acctions/gameAction';
import TimeTravel from '../components/TimeTravel';
import '../style/App.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.playerMove = this.playerMove.bind(this);
    this.calculateWinwer = this.calculateWinwer.bind(this);
    this.movesList = this.movesList.bind(this);
    this.gameStatus = this.gameStatus.bind(this);
  }

  
  playerMove(move) {
    const { history, stepNumber, xIsNext, currentBoard } = this.props;
    const historys = history.slice(0, stepNumber + 1);
    const squares = currentBoard.slice();

    if (this.calculateWinwer(squares) || squares[move]) {
      return;
    }
    squares[move] = xIsNext ? 'X' : 'O';
    playerMove(historys, squares);
  }
  
 
  
  playerMove(i) {
    const { history, stepNumber, xIsNext } = this.props;
    const historys = history.slice(0, stepNumber + 1);
    const current = historys[historys.length - 1];
    const squaress = current.squares.slice();

    if (this.calculateWinwer(squaress) || squaress[i]) {
      return;
    }
    squaress[i] = xIsNext ? 'X' : 'O';
    playerMove(historys, squaress);
  }
  

  calculateWinwer(squares) {
    const streaks = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < streaks.length; i += 1) {
      const [a, b, c] = streaks[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return {
          winner: squares[a],
          winningLine: [a, b, c]
        };
      }
    }
    return {
      winner: null,
      winningLine: [null, null, null]
    };
  }

  movesList(history) {
    const { currentBoard, stepNumber } = this.props;
    const { winner } = this.calculateWinwer(currentBoard.slice());
    const gameStatus = this.gameStatus(winner);
    const { endOfGame } = gameStatus;
    return history.map((step, move) => {
      const player = move % 2 ? ' - X' : ' - O';
      const description = move
        ? `Go to move #${move}${player}`
        : 'Go to game Start';
      return (
        <li key={move.id}>
          <button
            type="button"
            onClick={() => timeTravel(move, endOfGame)}
            className={stepNumber === move ? 'current_step' : ''}
          >
            {description}
          </button>
        </li>
      );
    });
  }

  gameStatus(winner) {
    let status;
    let endgame;
    const { stepNumber, xIsNext } = this.props;
    if (winner) {
      status = `${winner} is the winner!`;
      endgame = true;
    } else if (!winner && stepNumber === 20) {
      status = "It's a Draw!";
      endgame = true;
    } else {
      status = `${xIsNext ? 'X' : 'O'}'s turn.`;
      endgame = false;
    }
    return { status, endgame };
  }

  sortHistory() {
    const { isDescending } = this.props;
    this.sortHistory(isDescending);
  }

  render() {
    const {
      history,
      xIsNext,
      showHistory,
      stepNumber,
      isDescending,
      currentBoard
    } = this.props;

    const current = history[stepNumber];
    const { winner } = this.calculateWinwer(current.squares);
    const movess = this.movesList(history);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move.id}>
          <button type="button" onClick={() => this.jumpTo(move)}>
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
        <div className="left_col_game">
          <button type="button" onClick={() => newGame()} className="exit_game">
            New Game
          </button>
        </div>
        <div className="game_board">
          <Board
            winner={winner && winner.line}
            squares={currentBoard}
            playerMove={i => this.playerMove(i)}
          />
        </div>
        <div className="right_col_game">
          <TimeTravel
            moves={movess}
            showHistory={showHistory}
            toggleHistory={toggleHistory}
          />
        </div>
        <div className="game-info">
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
  stepNumber: state.game.stepNumber,
  timeTraveled: state.game.timeTraveled,
  showHistory: state.game.showHistory,
  endOfGame: state.game.endOfGame
});

const matchDispatchToProps = dispatch => ({
  playerMove: (history, squares) => dispatch(playerMove(history, squares))
  
  return bindActionCreators(
    {
      playerMove,
      toggleHistory,
      timeTravel,
      newGame,
      endGame
    },
    dispatch
  );
  
});

export default withRouter(
  connect(
    mapStateToProps,
    matchDispatchToProps
  )(Game)
);
// export default Game;
*/
