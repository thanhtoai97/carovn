/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/state-in-constructor */
import React from 'react';
// import axios from 'axios';

import { connect } from 'react-redux';
import { Input, Col, Button } from 'antd';

import { registerAsync } from '../../modules/Register/actions/index';

const InputGroup = Input.Group;

class CompactDemo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    window.location.href = '/menu';
  };

  render() {
    const { user } = this.props;
    return (
      <article className="center br3 pa3 ba b--black-10">
        <div>
          <InputGroup size="large">
            <Col>
              <h2>Email:</h2>
              <Input defaultValue={user.email} />
            </Col>
          </InputGroup>
          <InputGroup size="large">
            <Col>
              <h2>Name:</h2>
              <Input defaultValue={user.name} />
            </Col>
          </InputGroup>
          <Button href="/#menu" type="primary">
            Update
          </Button>
        </div>
      </article>
    );
  }
}

const mapStateToProps = state => ({
  registering: state.registering,
  user: state.login.user
});

const matchDispatchToProps = dispatch => ({
  registerAsync: (name, email, password) =>
    dispatch(registerAsync(name, email, password))
});

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(CompactDemo);
