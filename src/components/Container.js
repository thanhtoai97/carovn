import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainMenu from '../containers/MainMenu';
import Register from '../containers/RegisterPage/Register';
import Login from '../containers/LoginPage/Login';
import Game from '../containers/Game';
import User from '../containers/user/user';
import Settings from '../containers/Setting';

const Container = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <MainMenu />} />
      <Route exact path="/game" render={() => <Game />} />
      <Route exact path="/register" render={() => <Register />} />
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/logined" render={() => <User />} />
      <Route exact path="/settings" render={() => <Settings />} />
    </Switch>
  );
};

export default Container;
