import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import GuestLayout from "../../containers/GuestLayout";
import WrappedRegistrationForm from "../Register/registration-form";

import "./index.less";

class Login extends React.Component {
  render() {
    return (
      <GuestLayout>
        <WrappedRegistrationForm />
      </GuestLayout>
    );
  }
}

const mapStateToProps = state => {
  const app = state["app"];
  return {
    app
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Login)
);
