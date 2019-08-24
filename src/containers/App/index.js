import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.less";

// import GuestLayout from '../../containers/GuestLayout'
// import UserLayout from '../../containers/UserLayout'

import PrivateRoute from "../PrivateRoute";
import AdminRoute from "../AdminRoute";

import Home from "../../components/Home";
import Login from "../../components/Login";
import Register from "../../components/Register";
import NotFound from "../../components/NotFound";
import Dashboard from "../../components/Dashboard";

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <Router>
        <Switch>
          {/* Public Routes */}
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={Login} />

          {/* Private Routes */}
          <PrivateRoute
            exact
            path="/dashboard"
            authed={this.props.auth.isAuthenticated}
            // account={this.props.auth.user.accountType}
            component={Dashboard}
          />

          {/* Admin Routes */}
          {/* <AdminRoute
            exact
            path="/admin/dashboard"
            authed={this.props.auth.isAuthenticated}
            account={this.props.auth.user.accountType}
            component={Dashboard}
          /> */}

          {/* Not Found */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const auth = state["auth"];
  return {
    auth
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
