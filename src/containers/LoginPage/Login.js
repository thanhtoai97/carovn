/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { loginAsync } from '../../modules/Login/actions/index';
import './login.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    const { form, loginAsync } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        loginAsync(values.email, values.password);
      }
    });
  };

  render() {
    const { form, loading } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="boo">
            Forgot password
          </a>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="boo">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const form = Form.create()(LoginForm);

const mapStateToProps = state => ({
  loggedInUser: state.authReducerLogin.loggedInUser
});

const matchDispatchToProps = dispatch => ({
  loginAsync: (email, password) => dispatch(loginAsync(email, password))
});

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(form);
