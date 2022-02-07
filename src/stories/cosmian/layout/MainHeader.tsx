import { Layout } from "antd"
import React from "react"
import CosmianLogo from "../../../assets/img/logo/cosmian-orange-white.svg"
import CosmianIcon from "../../../assets/img/logo/CosmianIcon.svg"

const { Header } = Layout

type MainHeaderProps = {
  className?: string
  title?: string
  goHome: () => void
  options?: React.ReactElement
}

const MainHeader: React.FC<MainHeaderProps> = ({ className, title, options, goHome }) => {
  return (
    <Header className={className}>
      <span className="go-home" onClick={() => goHome()}>
        {title && (
          <>
            <img src={CosmianIcon} alt="Cosmian" className="logo" width="27" height="34" />
            <span className="title">{title}</span>
          </>
        )}
        {!title && (
          <>
            <img src={CosmianLogo} alt="Cosmian" className="logo" width="150" height="32" />
          </>
        )}
      </span>
      {options && <span className="header-options">{options}</span>}
    </Header>
  )
}

export default MainHeader
