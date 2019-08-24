import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from "antd";

import { toggleTheme, toggleCollapsed, toggleLayout } from "../../actions/app";

import "./index.less";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class GuestLayout extends Component {
  onMenuClick = e => {
    if (e.key === "home") {
      this.props.history.push(`/`);
    } else {
      this.props.history.push(`/${e.key}`);
    }
  };

  render() {
    const {
      handleToggleTheme,
      handleToggleCollapsed,
      handleToggleLayout,
      children
    } = this.props;
    const { theme, collapsed, layout } = this.props.app;

    let app_layout = layout ? "inline" : "vertical";
    let app_theme = theme ? "dark" : "light";
    let background_color = theme ? "#001529" : "#fff";
    let background_color_content = theme ? "#455560" : "#455560";
    let text_color = theme ? "#fff" : "#000";
    
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    return (
      <Layout className="rootContainer">
        <Header style={{ background: background_color, padding: "0 25px" }}>
          <Menu
            theme={app_theme}
            mode="horizontal"
            style={{ lineHeight: "64px" }}
            onClick={this.onMenuClick}
          >
            <Menu.Item key="home">
              <img
                style={{
                  height: "58px"
                }}
                src="./logo-re.png"
              />
            </Menu.Item>
            <Menu.Item key="register" style={{ float: "right" }}>
              Register
            </Menu.Item>
            <Menu.Item key="login" style={{ float: "right" }}>
              Login
            </Menu.Item>
          </Menu>
        </Header>
        <Layout
          style={{
            background: background_color,
            color: text_color
          }}
        >
          <Layout
            style={{
              padding: "0 50px 50px",
              background: background_color_content,
              color: text_color
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
                background: background_color_content,
                color: text_color
              }}
            >
              <Breadcrumb.Item>
                Where wisdom and insight are exchanged, and knowledge is
                created.
              </Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="contentContainer"
              style={{ background: "#fff", color: text_color }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
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

const mapDispatchToProps = dispatch => ({
  handleToggleTheme: () => dispatch(toggleTheme()),
  handleToggleCollapsed: () => dispatch(toggleCollapsed()),
  handleToggleLayout: () => dispatch(toggleLayout())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GuestLayout)
);
