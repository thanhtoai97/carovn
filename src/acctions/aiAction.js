/* eslint-disable no-unused-vars */
const calculateWinwer = squares => {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
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
};

const getAvailableMoves = board => {
  // returns an array of available cells
  const available = [];
  board.forEach((cell, cellIndex) => {
    if (cell === null) {
      available.push(cellIndex);
    }
  });
  return available;
};
