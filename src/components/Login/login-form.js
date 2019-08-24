import React from "react";
import { connect } from "react-redux";

import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Typography
} from "antd";

import { loadUser } from "../../actions/auth";

import "./index.less";

const { Title } = Typography;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleLoadUser(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8, offset: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16, offset: 4 }
      }
    };
    return (
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        className="login-form"
      >
        <Title style={{ textAlign: "center" }}>Login</Title>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Row justify={"center"}>
            <Col xs={{ span: 10 }} md={{ span: 10, offset: 2 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Col>
            <Col xs={{ span: 14 }} md={{ span: 10, offset: 2 }}>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col xs={{ span: 12 }} md={{ span: 10, offset: 2 }}>
              <a
                className="login-form-forgot"
                onClick={() => {
                  this.props.history.push("/forgot-password");
                }}
              >
                Forgot password
              </a>
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 10, offset: 1 }}>
              <a
                className="login-form-forgot"
                onClick={() => {
                  this.props.history.push("/register");
                }}
              >
                Register now!
              </a>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

const mapDispatchToProps = dispatch => ({
  handleLoadUser: params => dispatch(loadUser(params))
});

export default connect(
  null,
  mapDispatchToProps
)(WrappedNormalLoginForm);
