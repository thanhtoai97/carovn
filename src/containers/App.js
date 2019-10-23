import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import Header from '../components/Header';
import Container from '../components/Container';
import '../style/App.css';

const App = () => {
  return (
    <div>
      <Container />
    </div>
  );
};

export default withRouter(connect()(App));
