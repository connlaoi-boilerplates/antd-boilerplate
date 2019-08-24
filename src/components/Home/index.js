import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Timeline, Typography } from "antd";

import GuestLayout from "../../containers/GuestLayout";

import "./index.less";

const { Title } = Typography;

class Home extends Component {
  render() {
    const { theme } = this.props.app;

    // let app_theme = theme ? "dark" : "light";
    let background_color = theme ? "#001529" : "#fff";
    // let background_color_content = theme ? "#455560" : "#455560";
    let text_color = theme ? "#fff" : "#000";

    return (
      <GuestLayout>
        <Title level={2}>Important Dates</Title>
        <br />
        <Timeline>
          <Timeline.Item color="green">
            Create a services site 2015-09-01
          </Timeline.Item>
          <Timeline.Item color="green">
            Create a services site 2015-09-01
          </Timeline.Item>
          <Timeline.Item color="red">
            <p>Solve initial network problems 1</p>
            <p>Solve initial network problems 2</p>
            <p>Solve initial network problems 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item>
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item color="gray">
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item color="gray">
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
        </Timeline>
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
  )(Home)
);
