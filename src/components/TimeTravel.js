import React from 'react';

const TimeTravel = props => {
  const { showHistory, toggleHistory, moves } = props
    ? 'show_history'
    : 'unshow_history';
  return (
    <div className="game_history">
      <button type="button" className={showHistory} onClick={toggleHistory}>
        Wish you could time travel?
      </button>
      <div className={showHistory ? 'list' : 'list_hidden'}>
        <ul>{moves}</ul>
      </div>
    </div>
  );
};

export default TimeTravel;
