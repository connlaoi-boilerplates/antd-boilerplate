import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import GuestLayout from "../../containers/GuestLayout";
import WrappedNormalLoginForm from "./login-form";

import "./index.less";

class Login extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.auth.isLoginLoading &&
      this.props.auth.isLoginSuccess &&
      this.props.auth.isAuthenticated
    ) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <GuestLayout>
        <WrappedNormalLoginForm />
      </GuestLayout>
    );
  }
}

const mapStateToProps = state => {
  const app = state["app"];
  const auth = state["auth"];
  return {
    app,
    auth
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Login)
);
