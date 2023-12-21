import { CosmianLogo, Header, MainLayout } from "cosmian_ui"
import { Outlet } from "react-router-dom"
import "../Views/style.less"

const Layout: React.FC = () => {
  const logo = <CosmianLogo link={window.location.origin} />

  const header = (
    <div className="header">
      <Header mainLogo={logo} title="Data anonymization" />
    </div>
  )

  return (
    <MainLayout header={header}>
      <Outlet />
    </MainLayout>
  )
}

export default Layout
