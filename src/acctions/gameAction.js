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
export const playerMove = (historys, squares) => {
  return {
    type: 'PLAYER_MOVE',
    history: historys,
    squares
  };
};
export const toggleHistory = () => {
  return {
    type: 'TOGGLE_HISTORY'
  };
};
export const timeTravel = (move, end) => {
  return {
    type: 'TIME_TRAVEL',
    move,
    endOfGame: end
  };
};
export const sortHistory = isDecending => {
  return {
    type: 'SORT_HISTORY',
    isDecending: !isDecending
  };
};
