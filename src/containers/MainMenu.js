/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import { newGame } from '../acctions/gameAction';
import '../style/themes/light.css';

class MainMenu extends Component {
  newGame() {
    const { newGame } = this.props;
    newGame();
  }

  render() {
    return (
      <div className="main_menu">
        <h2>Welcome to Tic Tac Toe!</h2>
        <Link to="/game">
          <button
            type="button"
            onClick={() => newGame(400)}
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
      </div>
    );
  }
}

const matchDispatchToProps = dispatch => ({
  newGame: () => dispatch(newGame())
});

export default withRouter(connect(matchDispatchToProps)(MainMenu));
