import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';
import Container from '../components/Container';
import '../style/App.css';

const App = () => {
  return (
    <div className="light_theme">
      <Header
        titleName="Tic-Tac-Toe"
        author="Amiry's"
        git="https://github.com/Amiryy"
      />
      <Container />
    </div>
  );
};

export default withRouter(connect()(App));
