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
  isDescending: true
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
        isDescending: true
      };
      break;
    case 'END_GAME':
      return { ...state };
      break;
    case 'PLAYER_MOVE':
      return {
        ...state,
        history: action.history.concat([
          {
            squares: action.squares
          }
        ]),
        currentBoard: action.squares,
        stepNumber: action.history.length,
        xIsNext: !state.xIsNext
      };
      break;
    case 'TOGGLE_HISTORY':
      return { ...state };
      break;
    case 'TIME_TRAVEL':
      return {
        ...state,
        stepNumber: action.move,
        xIsNext: !(action.move % 2)
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
