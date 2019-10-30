/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { newGame } from '../acctions/gameAction';

class MainMenu extends Component {
  newGame() {
    const { newGame } = this.props;
    newGame();
  }

  render() {
    const { grid, newGame } = this.props;
    return (
      <div className="main_menu">
        <h2>Welcome to Tic Tac Toe!</h2>
        <Link to="/game">
          <button
            type="button"
            onClick={() => newGame(grid)}
            className="menu_button"
          >
            Begin
          </button>
        </Link>
        <br />
        <Link to="/register">
          <button type="button" className="menu_button">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button type="button" className="menu_button">
            Login
          </button>
        </Link>
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
