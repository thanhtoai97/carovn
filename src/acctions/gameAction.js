export const newGame = () => {
  return {
    type: 'NEW_GAME'
  };
};
export const endGame = () => {
  return {
    type: 'END_GAME'
  };
};
export const playerMove = (history, squares) => {
  return {
    type: 'PLAYER_MOVE',
    history,
    squares
  };
};

export const changeHistory = (history, squares) => {
  return {
    type: 'CHANGE_HISTORY',
    history,
    squares
  };
};
export const toggleHistory = () => {
  return {
    type: 'TOGGLE_HISTORY'
  };
};
export const timeTravel = move => {
  return {
    type: 'TIME_TRAVEL',
    move
  };
};
export const sortHistory = isDecending => {
  return {
    type: 'SORT_HISTORY',
    isDecending: !isDecending
  };
};

export const setGrid = grid => {
  if (grid === 400) {
    return {
      type: 'SET_GRID_400'
    };
  }
  return {
    type: 'SET_GRID_9'
  };
};
