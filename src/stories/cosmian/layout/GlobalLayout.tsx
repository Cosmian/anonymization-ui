import { Layout } from "antd"
import React from "react"
import "./global-layout.less"
import MainHeader from "./MainHeader"

const { Footer, Content } = Layout

type GlobalLayoutProps = {
  title?: string
  goHome: () => void
  footerContent: React.ReactElement
  options?: React.ReactElement
}

export const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children, title, goHome, footerContent, options }) => {
  return (
    <div className="cosmian-layout">
      <MainHeader className="main-header" title={title} goHome={goHome} options={options} />
      <div className="content-wrapper">
        <Content className="main-content">{children}</Content>
      </div>
      <Footer className="main-footer">{footerContent}</Footer>
    </div>
  )
}
