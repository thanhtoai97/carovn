/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './App.css';
import Header from './compoments/Game';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}
export default App;