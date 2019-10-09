/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import { newGame } from '../acctions/gameAction';

class MainMenu extends Component {
  render() {
    return (
      <div className="main_menu">
        <h2>Welcome!</h2>
        <Link to="/game">
          <button
            type="button"
            onClick={() => newGame(400)}
            className="menu_button"
          >
            New Game
          </button>
        </Link>
        <br />
        <Link to="/settings">
          <button type="button" className="menu_button">
            Settings
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  grid: state.game.grid
});
const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      newGame
    },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    matchDispatchToProps
  )(MainMenu)
);
