/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Redirect } from 'react-router-dom';
import { MDBRow } from 'mdbreact';
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
        message.loading('You Are Logging IN....', 2.5).then(() => {
          loginAsync(values.email, values.password);
        });
      }
    });
  };

  render() {
    const { form, loading, user } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 10 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };

    return (
      <div className="center br3 pa3 ba b--black-10">
        {user && <Redirect to="/menu" />}
        <div className="header pt-3 peach-gradient">
          <MDBRow className="d-flex justify-content-center">
            <h3 className="white-text mb-3 pt-3 font-weight-bold">Log in:</h3>
          </MDBRow>
        </div>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          className="login-form"
        >
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
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
            Or <a href="/#register"> register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const form = Form.create()(LoginForm);

const mapStateToProps = state => ({
  user: state.login.user,
  error: state.login.error
});

const matchDispatchToProps = dispatch => ({
  loginAsync: (email, password) => dispatch(loginAsync(email, password))
});

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(form);
