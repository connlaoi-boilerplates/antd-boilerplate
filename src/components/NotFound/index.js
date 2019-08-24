import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Result, Button, Typography } from "antd";

import GuestLayout from "../../containers/GuestLayout";

import "./index.less";

const { Title } = Typography;

class NotFound extends Component {
  render() {
    const { theme } = this.props.app;

    // let app_theme = theme ? "dark" : "light";
    let background_color = theme ? "#001529" : "#fff";
    // let background_color_content = theme ? "#455560" : "#455560";
    let text_color = theme ? "#fff" : "#000";

    return (
      <GuestLayout>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              Back Home
            </Button>
          }
        />
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
  )(NotFound)
);
