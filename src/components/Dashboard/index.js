import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Timeline, Typography } from "antd";

import UserLayout from "../../containers/UserLayout";

import "./index.less";

const { Title } = Typography;

class Dashboard extends Component {
  render() {
    const { theme } = this.props.app;

    // let app_theme = theme ? "dark" : "light";
    let background_color = theme ? "#001529" : "#fff";
    // let background_color_content = theme ? "#455560" : "#455560";
    let text_color = theme ? "#fff" : "#000";

    return (
      <UserLayout>
        <Title level={2}>Dashboard</Title>
      </UserLayout>
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
  )(Dashboard)
);
