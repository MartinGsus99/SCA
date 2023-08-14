import React from "react"
import { connect } from "react-redux"
import { Icon, Menu, Dropdown, Modal, Layout, Avatar } from "antd"
import { Link } from "react-router-dom"
import { logout, getUserInfo } from "@/store/actions"
import FullScreen from "@/components/FullScreen"
import Settings from "@/components/Settings"
import Hamburger from "@/components/Hamburger"
import BreadCrumb from "@/components/BreadCrumb"
import "./index.less"
const { Header } = Layout

const LayoutHeader = (props) => {
  const {
    token,
    avatar,
    sidebarCollapsed,
    logout,
    getUserInfo,
    showSettings,
    fixedHeader,
  } = props
  token && getUserInfo(token)
  const handleLogout = (token) => {
    Modal.confirm({
      title: "注销",
      content: "确定要退出系统吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        logout(token)
      },
    })
  }
  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout(token)
        break
      default:
        break
    }
  }
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="dashboard">
        <Link to="/dashboard">首页</Link>
      </Menu.Item>
      <Menu.Item key="project">
        <a
          target="_blank"
          href="https://github.com/NLRX-WJC/react-antd-admin-template"
          rel="noopener noreferrer"
        >
          项目地址
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">注销</Menu.Item>
    </Menu>
  )
  const computedStyle = () => {
    let styles
    if (fixedHeader) {
      if (sidebarCollapsed) {
        styles = {
          width: "calc(100% - 80px)",
        }
      } else {
        styles = {
          width: "calc(100% - 200px)",
        }
      }
    } else {
      styles = {
        width: "100%",
      }
    }
    return styles
  }
  return (
    <>
      {/* 这里是仿照antd pro的做法,如果固定header，
      则header的定位变为fixed，此时需要一个定位为relative的header把原来的header位置撑起来 */}
      {fixedHeader ? <Header /> : null}
      <Header
        style={computedStyle()}
        className={fixedHeader ? "fix-header" : ""}
      >
        <Hamburger />
        <BreadCrumb />
        <div className="right-menu">
          <FullScreen />
          {showSettings ? <Settings /> : null}
          <div className="dropdown-wrap">
            <Dropdown overlay={menu}>
              <div>
                <Avatar shape="square" size="medium" src={'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685874714&t=4c5724d830b25fb891a6d09fb48a994f'} />
                <Icon style={{ color: "rgba(0,0,0,.3)" }} type="caret-down" />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.user,
    ...state.settings,
  }
}
export default connect(mapStateToProps, { logout, getUserInfo })(LayoutHeader)
