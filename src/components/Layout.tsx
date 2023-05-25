import { Tooltip } from "antd"
import { CosmianLogo, Header, MainLayout, MainNavigation, NavigationItem } from "cosmian_ui"
import { IoBuildOutline, IoDocumentLockOutline, IoFingerPrintSharp } from "react-icons/io5"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { paths_config } from "../config/paths"

const Layout = (): JSX.Element => {
  const location = useLocation()
  const locationPathName = location.pathname
  const navigate = useNavigate()

  const logo = <CosmianLogo link={window.location.origin} />
  const content = "The microservice that you're querying has been verified by the application owner : code is running inside an enclave and code's fingerprint has been checked."
  const rightElement = <Tooltip title={content}>
      <div className="verified">
        <div>Microservice verified<IoFingerPrintSharp className="icon" size={20} /></div>
      </div>
    </Tooltip>
  const header = (
    <Header mainLogo={logo} title="Data anonymization" userMenu={rightElement} />
  )

  const navigationElements: NavigationItem[] = [{
    icon: <IoDocumentLockOutline/>,
    key: "Anonymize",
    navLink: "/",
    title: "Anonymization",
    type: "item"
  },
  {
    icon: <IoBuildOutline />,
    key: "Configurations",
    navLink: paths_config.configuration,
    title: "Configurations",
    type: "item"
  }]

  const navigationClick = (key: string): void => {
    const index = navigationElements.findIndex((navItem): boolean => navItem.key === key)
    navigate(navigationElements[index].navLink)
  }

  return <MainLayout header={header} navigation={<MainNavigation locationPathName={locationPathName} navigationConfig={navigationElements} handleClick={navigationClick} />}>
    <Outlet />
  </MainLayout>
}

export default Layout
