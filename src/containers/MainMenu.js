/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { newGame } from '../acctions/gameAction';

// import {login_Success} from '../modules/Login/reducers/index';

class MainMenu extends Component {
  newGame() {
    const { newGame } = this.props;
    newGame();
  }

  render() {
    const { grid, newGame, user } = this.props;
    return (
      <div className="main_menu">
        <h2>Welcome {user.name} to Tic Tac Toe!</h2>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/#info"
              id="navbardrop"
              data-toggle="dropdown"
            >
              Update info
            </a>
          </li>
        </nav>
        <Link to="/game">
          <button
            type="button"
            onClick={() => newGame(grid)}
            className="menu_button"
          >
            Play Offline
          </button>
        </Link>
        <br />
        <Link to="/settings">
          <button type="button" className="menu_button">
            Settings Offline
          </button>
        </Link>
        <Link to="/online">
          <button type="button" className="menu_button">
            Play Online
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  grid: state.game.grid,
  user: state.login.user
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
