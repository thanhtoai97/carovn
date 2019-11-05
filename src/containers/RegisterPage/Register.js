/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/state-in-constructor */
import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import {
  Form,
  Input,
  Checkbox,
  Button,
  Select,
  AutoComplete,
  Tooltip,
  Icon,
  Row,
  Col,
  message
} from 'antd';
import { MDBRow } from 'mdbreact';
import { registerAsync } from '../../modules/Register/actions/index';
import './register.css';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { name } = values;
        const { email } = values;
        const { password } = values;

        const apiBaseUrl = 'http://localhost:5000/users/';
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        };
        axios
          .post(`${apiBaseUrl}register`, { name, email, password }, { headers })
          .then(response => {
            localStorage.setItem('user', JSON.stringify(response.message));
            localStorage.setItem('is_done', true);
            message.loading('You Are Registering....', 2.5).then(() => {
              message.success('You Are Registed!', 1.0);
              window.location.href = '/';
            });
          })
          .catch(() => {
            message.loading('You Are Registering....', 2.5).then(() => {
              message.error('Email is exits!', 1.0);
              window.location.href = '/#register';
            });
          });
      }
    });
  };

  handleConfirmBlur = e => {
    const { confirmDirty } = this.state;
    const { value } = e.target;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { confirmDirty } = this.state;
    const { form } = this.props;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86'
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <article className="center br3 pa3 ba b--black-10">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <div className="header pt-3 peach-gradient">
            <MDBRow className="d-flex justify-content-center">
              <h3 className="white-text mb-3 pt-3 font-weight-bold">
                Sign up:
              </h3>
            </MDBRow>
          </div>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please input your name!',
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [
                { required: true, message: 'Please input your phone number!' }
              ]
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
          </Form.Item>
          <Form.Item label="Website">
            {getFieldDecorator('website', {
              rules: [{ required: true, message: 'Please input website!' }]
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="website"
              >
                <Input />
              </AutoComplete>
            )}
          </Form.Item>
          <Form.Item
            label="Captcha"
            extra="We must make sure that your are a human."
          >
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input the captcha you got!'
                    }
                  ]
                })(<Input />)}
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked'
            })(
              <Checkbox>
                I have read the <a href="ddd">agreement</a>
              </Checkbox>
            )}
            Or <a href="/">Login now!</a>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </article>
    );
  }
}

const form = Form.create()(RegistrationForm);

const mapStateToProps = state => ({
  registering: state.registering
});

const matchDispatchToProps = dispatch => ({
  registerAsync: (name, email, password) =>
    dispatch(registerAsync(name, email, password))
});

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(form);
