/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
/* eslint-disable react/state-in-constructor */
import React from 'react';

export default class Logined extends React.Component {
  state = {
    loading: true,
    person: null
  };

  async componentDidMount() {
    const url = 'http://localhost:3002/me/';
    const respose = await fetch(url);
    const data = await respose.json();
    this.setState({ person: data.results[0], loading: false });
  }

  render() {
    const { loading, person } = this.state;
    return (
      <div>
        {loading || !person ? (
          <div> loading...</div>
        ) : (
          <div>
            <div>{person._id}</div>
            <div>{person.iat}</div>
          </div>
        )}
      </div>
    );
  }
}
