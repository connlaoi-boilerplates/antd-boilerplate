import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  Layout,
  Menu,
  Dropdown,
  Breadcrumb,
  Button,
  Switch,
  Icon,
  Popconfirm,
  message,
} from "antd";
import { MenuOutline } from "@ant-design/icons";

import { toggleTheme, toggleCollapsed, toggleLayout } from "../../actions/app";
import { logoutUser } from "../../actions/auth";
import "./index.less";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class UserLayout extends Component {
  render(children) {
    const { handleToggleTheme, handleToggleCollapsed, handleToggleLayout } =
      this.props;
    const { theme, collapsed, layout } = this.props.app;
    const { firstName, lastName } = this.props.auth;

    let app_layout = layout ? "inline" : "vertical";
    let app_theme = theme ? "dark" : "light";
    let background_color = theme ? "#001529" : "#fff";
    let background_color_content = theme ? "#FFFFFF" : "#FFFFFF";
    let text_color = theme ? "#fff" : "#000";

    const menu = (
      <Menu>
        <Menu.Item key="0">
          <span>
            <Icon type="setting" />
            <span> Settings</span>
          </span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="language">
          <span>
            {/* <Icon type="global" /> */}
            <span>
              <Switch
                checkedChildren="English"
                unCheckedChildren="French"
                checked={true}
              />
            </span>
          </span>
        </Menu.Item>
        <Menu.Item key="theme-color">
          <span>
            <span>
              <Switch
                checkedChildren="Dark"
                unCheckedChildren="Light"
                checked={false}
              />
            </span>
          </span>
        </Menu.Item>

        <Menu.Divider />
        <SubMenu
          key="preferences"
          title={
            <span>
              {/* <Icon type="setting" /> */}
              <span> Theme</span>
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
        <Menu.Divider />
        <Menu.Item key="logout" style={{ float: "bottom" }}>
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
            <span>
              <Icon type="logout" />
              <span> Logout</span>
            </span>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
    // The debounce function receives our function as a parameter
    const debounce = (fn) => {
      // This holds the requestAnimationFrame reference, so we can cancel it if we wish
      let frame;

      // The debounce function returns a new function that can receive a variable number of arguments
      return (...params) => {
        // If the frame variable has been defined, clear it now, and queue for next frame
        if (frame) {
          cancelAnimationFrame(frame);
        }

        // Queue our function call for the next frame
        frame = requestAnimationFrame(() => {
          // Call our function and pass any params we received
          fn(...params);
        });
      };
    };

    // Reads out the scroll position and stores it in the data attribute
    // so we can use it in our stylesheets
    const storeScroll = () => {
      document.documentElement.dataset.scroll = window.scrollY;
    };

    // Listen for new scroll events, here we debounce our `storeScroll` function
    document.addEventListener("scroll", debounce(storeScroll), {
      passive: true,
    });

    // Update scroll position for first time
    storeScroll();

    return (
      <Layout className="rootContainer">
        {/* TOP NAV */}
        <Header
          style={{
            position: "fixed",
            marginLeft: collapsed ? "80px" : "200px",
          }}
        >
          <Menu
            className="ant-header-custom"
            theme={app_theme}
            mode="horizontal"
            style={{
              lineHeight: "64px",
            }}
          >
            <Menu.Item key="home" className="ant-menu-item-no-highlight">
              <img
                style={{
                  height: "33px",
                  zIndex: 1001,
                }}
                src="./logo_extended.png"
                // src="./logo_stacked.png"
                // src="./store_icon.png"
              />
            </Menu.Item>
            <Menu.Item
              key="dropdown"
              className="ant-menu-item-no-highlight"
              style={{ float: "right" }}
            >
              <Dropdown overlay={menu}>
                <Button
                  className="ant-dropdown-link ant-dropdown-link-user-dropdown"
                  onClick={(e) => e.preventDefault()}
                >
                  Joe Doe <Icon type="down" />
                </Button>
              </Dropdown>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          {/* SIDE DRAWER */}
          <Sider
            collapsible={false}
            collapsed={collapsed}
            onCollapse={handleToggleCollapsed}
            breakpoint={700}
            theme={app_theme}
            style={{
              position: "fixed",
              height: "100%",
            }}
          >
            <Menu
              theme={app_theme}
              mode={app_layout}
              defaultSelectedKeys={["dashboard"]}
              defaultOpenKeys={["dashboard"]}
              style={{
                height: "100%",
                borderRight: 0,
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
              }}
            >
              {/* Collapse Toggle */}
              <Menu.Item key="collapse" onClick={handleToggleCollapsed}>
                <span>
                  <Icon type="menu" />
                  <span>{collapsed ? "Expand" : ""}</span>
                </span>
              </Menu.Item>

              {/* Menu Options */}
              <SubMenu
                key="patient-profile-header"
                title={
                  <span>
                    <Icon type="dashboard" />
                    <span>Patient Profile</span>
                  </span>
                }
              >
                <Menu.Item key="patient-profile1">
                  <span>
                    <Icon type="dashboard" />
                    <span>Profile Dashboard</span>
                  </span>
                </Menu.Item>
                <Menu.Item key="patient-profile2">
                  <span>
                    <Icon type="dashboard" />
                    <span>Contacts</span>
                  </span>
                </Menu.Item>
                <Menu.Item key="patient-profile3">
                  <span>
                    <Icon type="dashboard" />
                    <span>Insurance</span>
                  </span>
                </Menu.Item>
                <Menu.Item key="patient-profile4">
                  <span>
                    <Icon type="dashboard" />
                    <span>Care Team</span>
                  </span>
                </Menu.Item>
                <Menu.Item key="patient-profile5">
                  <span>
                    <Icon type="dashboard" />
                    <span>Visuals</span>
                  </span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="care-plan-header"
                title={
                  <span>
                    <Icon type="line-chart" />
                    <span>Care Plan</span>
                  </span>
                }
              >
                <Menu.Item key="careplan-1">
                  <span>
                    <Icon type="line-chart" />
                    <span>Plan Dashboard</span>
                  </span>
                </Menu.Item>
                <Menu.Item key="careplan-2">
                  <span>
                    <Icon type="line-chart" />
                    <span>Calendar</span>
                  </span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="telemed-header"
                title={
                  <span>
                    <Icon type="video-camera" />
                    <span>Telemedicine</span>
                  </span>
                }
              >
                <Menu.Item key="telemed-1">
                  <span>
                    <Icon type="video-camera" />
                    <span>Instant Call</span>
                  </span>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>

          {/* CONTENT */}
          <Layout
            style={{
              padding: "66px 24px 24px 24px",
              // background: background_color_content,
              color: text_color,
              height: "2000px",
              background: "#fff",
              marginLeft: collapsed ? "80px" : "200px",
              transition: "margin 0.2s",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
                color: "#000",
              }}
            >
              <Breadcrumb.Item>Joe Doe</Breadcrumb.Item>
              <Breadcrumb.Item>Care Plan</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="contentContainer"
              style={{ background: "#7b7daf", color: text_color }}
            >
              {/* <div
                style={{
                  height: "2000px",
                  background: "linear-gradient(#a4a6db, #797BAC)",
                  borderRadius: "10px",
                }}
              /> */}
              {/* {children} */}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const app = state["app"];
  const auth = state["auth"];
  return {
    app,
    auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleToggleTheme: () => dispatch(toggleTheme()),
  handleToggleCollapsed: () => dispatch(toggleCollapsed()),
  handleToggleLayout: () => dispatch(toggleLayout()),
  handleLogout: () => dispatch(logoutUser()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserLayout)
);

{
  /* <Layout className="rootContainer">
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
      </Layout> */
}
