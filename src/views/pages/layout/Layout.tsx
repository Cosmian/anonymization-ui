import { QuestionCircleOutlined } from "@ant-design/icons"
import React from "react"
import { useNavigate } from "react-router-dom"
import { link_config } from "../../../configs/paths"
import { GlobalLayout } from "../../../stories/cosmian/layout/GlobalLayout"
import FooterContent from "../layout/Footer"
import "./layout.less"

type LayoutProps = {
  fullLayout: boolean
  children: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({ fullLayout, children }) => {
  const navigate = useNavigate()
  const goHome = (): void => {
    navigate("/")
  }

  if (fullLayout) {
    return <div>{children}</div>
  }

  return (
    <GlobalLayout goHome={goHome} footerContent={<FooterContent />} options={<Helpelement />}>
      {children}
    </GlobalLayout>
  )
}

export default Layout

const Helpelement = (): JSX.Element => {
  const navigate = useNavigate()
  const gotToHelpPage = (): void => {
    navigate(`${link_config.help}`)
  }
  return <QuestionCircleOutlined className="help" onClick={() => gotToHelpPage()} />
}
