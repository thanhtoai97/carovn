import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainMenu from '../containers/MainMenu';
import Register from '../containers/RegisterPage/Register';
import Login from '../containers/LoginPage/Login';
import Game from '../containers/Game';
import User from '../containers/user/user';

const Container = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <MainMenu />} />
      <Route exact path="/game" render={() => <Game />} />
      <Route exact path="/register" render={() => <Register />} />
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/logined" render={() => <User />} />
    </Switch>
  );
};

export default Container;
