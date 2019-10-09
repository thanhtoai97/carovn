/* eslint-disable no-unreachable */
export const initialState = {
  history: [
    {
      squares: new Array(400).fill(null)
    }
  ],
  currentBoard: new Array(400).fill(null),
  stepNumber: 0,
  xIsNext: true,
  isDescending: true,
  timeTraveled: false,
  showHistory: false,
  endOfGame: false
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_GAME':
      return {
        ...state,
        history: [
          {
            squares: new Array(400).fill(null)
          }
        ],
        currentBoard: new Array(400).fill(null),
        stepNumber: 0,
        xIsNext: true,
        isDescending: true,
        showHistory: false
      };
      break;
    case 'END_GAME':
      return { ...state, endOfGame: true };
      break;
    case 'PLAYER_MOVE':
      return {
        ...state,
        history: action.historys.concat([
          {
            squares: action.squares
          }
        ]),
        currentBoard: action.squares,
        stepNumber: action.historys.length,
        xIsNext: !state.xIsNext
      };
      break;
    case 'TOGGLE_HISTORY':
      return { ...state, showHistory: !state.showHistory };
      break;
    case 'TIME_TRAVEL':
      return {
        ...state,
        stepNumber: action.move,
        currentBoard: state.history[action.move].cells,
        xIsNext: !(action.move % 2),
        timeTraveled: true,
        endOfGame: action.endOfGame
      };
      break;
    case 'SORT_HISTORY':
      return {
        ...state,
        isDescending: !state.isDescending
      };
      break;
    default:
      return state;
  }
};

export default gameReducer;
