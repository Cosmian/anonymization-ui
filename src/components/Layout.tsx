import { CosmianLogo, Header, MainLayout } from "cosmian_ui"
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  const logo = <CosmianLogo link={window.location.origin} />
  const header = (
    <Header mainLogo={logo} title="Anonymization configuration tool" />
  )

  return <MainLayout header={header}>{children}</MainLayout>
}

export default Layout
