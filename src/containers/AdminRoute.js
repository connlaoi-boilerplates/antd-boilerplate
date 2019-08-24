import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

import { message } from "antd";

const AdminRoute = ({ component: Component, authed, account, ...rest }) => {
  if (!authed) {
    message.warning("You are not authorized. Login to continue.");
  } else {
    message.info("Admin");
  }
  return (
    <Route
      {...rest}
      render={props =>
        authed && account === "PI" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
