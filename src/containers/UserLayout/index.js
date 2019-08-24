import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  Layout,
  Menu,
  Breadcrumb,
  Switch,
  Icon,
  Popconfirm,
  message
} from "antd";

import { toggleTheme, toggleCollapsed, toggleLayout } from "../../actions/app";
import { logoutUser } from "../../actions/auth";
import "./index.less";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class UserLayout extends Component {
  render(children) {
    const {
      handleToggleTheme,
      handleToggleCollapsed,
      handleToggleLayout
    } = this.props;
    const { theme, collapsed, layout } = this.props.app;
    const { firstName, lastName } = this.props.auth;

    let app_layout = layout ? "inline" : "vertical";
    let app_theme = theme ? "dark" : "light";
    let background_color = theme ? "#001529" : "#fff";
    let background_color_content = theme ? "#455560" : "#455560";
    let text_color = theme ? "#fff" : "#000";

    return (
      <Layout className="rootContainer">
        <Header style={{ background: background_color, padding: "0 80px" }}>
          <img
            style={{
              height: "64px",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1001
            }}
            src="./logo-re.png"
          />
          <Menu
            theme={app_theme}
            mode="horizontal"
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="home" disabled>
              HUB
            </Menu.Item>
            <Menu.Item key="logout" style={{ float: "right" }}>
              <Popconfirm
                arrowPointAtCenter
                placement="bottomLeft"
                title="Are you sure you want to logout?"
                onConfirm={() => {
                  this.props.history.push("/");
                  this.props.handleLogout();
                  message.success("Logged out. Have a nice day!");
                }}
                okText="Yes"
                cancelText="No"
              >
                Logout
              </Popconfirm>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout
          style={{
            background: background_color,
            color: text_color
          }}
        >
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={handleToggleCollapsed}
            breakpoint={700}
            theme={app_theme}
          >
            <Menu
              theme={app_theme}
              mode={app_layout}
              defaultSelectedKeys={["dashboard"]}
              defaultOpenKeys={["dashboard"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="dashboard">
                <span>
                  <Icon type="dashboard" />
                  <span>Dashboard</span>
                </span>
              </Menu.Item>
              <Menu.Item key="analytics">
                <span>
                  <Icon type="line-chart" />
                  <span>Analytics</span>
                </span>
              </Menu.Item>
              <Menu.Item key="profile">
                <span>
                  <Icon type="user" />
                  <span>My Profile</span>
                </span>
              </Menu.Item>
              <SubMenu
                key="preferences"
                title={
                  <span>
                    <Icon type="setting" />
                    <span>Preferences</span>
                  </span>
                }
              >
                <Menu.Item key="theme">
                  <span>
                    <Icon type="bg-colors" />
                    <span>
                      <Switch
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                        checked={theme}
                        onClick={handleToggleTheme}
                      />
                    </span>
                  </span>
                </Menu.Item>
                <Menu.Item key="layout">
                  <span>
                    <Icon type="layout" />
                    <span>
                      <Switch
                        checkedChildren="Inline"
                        unCheckedChildren="Vertical"
                        checked={layout}
                        onClick={handleToggleLayout}
                      />
                    </span>
                  </span>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
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
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="contentContainer"
              style={{ background: background_color, color: text_color }}
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
  handleToggleLayout: () => dispatch(toggleLayout()),
  handleLogout: () => dispatch(logoutUser())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserLayout)
);
