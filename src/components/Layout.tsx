import { CosmianLogo, Header, MainLayout } from "cosmian_ui"
import { ReactNode } from "react"
import "./layout.less"

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  const logo = <CosmianLogo link={window.location.origin} />
  const header = (
    <Header mainLogo={logo} title="Anonymization" />
  )

  return <MainLayout header={header}>{children}</MainLayout>
}

export default Layout
