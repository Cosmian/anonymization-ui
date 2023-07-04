import { Menu, MenuProps, Tooltip } from "antd"
import { ItemType } from "antd/lib/menu/hooks/useItems"
import { CosmianLogo, Header, MainLayout } from "cosmian_ui"
import { useContext } from "react"
import { IoBuildOutline, IoCloudOfflineOutline, IoCloudUploadOutline, IoDocumentLockOutline, IoFingerPrintSharp } from "react-icons/io5"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import AppContext from "../AppContext"
import "../Views/style.less"

const Layout = (): JSX.Element => {
  const location = useLocation()
  const navigate = useNavigate()
  const context = useContext(AppContext)

  const logo = <CosmianLogo link={window.location.origin} />
  const verifiedContent =
    "The microservice that you're querying has been verified by the application owner : code is running inside an enclave and code's fingerprint has been checked."
  const unverifiedContent = "The microservice that you're querying is not running."
  const rightElement = (
    <>
      {context?.microserviceState ? (
        <Tooltip title={verifiedContent}>
          <div className="verified">
            Microservice running & verified
            <IoFingerPrintSharp className="icon" size={20} />
          </div>
        </Tooltip>
      ) : (
        <Tooltip title={unverifiedContent}>
          <div className="unverified">
            Microservice is not running
            <IoCloudOfflineOutline className="icon" size={20} />
          </div>
        </Tooltip>
      )}
    </>
  )

  const items: MenuProps["items"] = [
    {
      icon: <IoDocumentLockOutline />,
      key: "/anonymizations",
      label: "Anonymized datasets",
    },
    {
      icon: <IoBuildOutline />,
      key: "/configurations",
      label: "Configuration",
    },
    {
      icon: <IoCloudUploadOutline />,
      key: "/anonymize",
      label: "Anonymize",
    },
  ]

  const navigationClick = (item: ItemType): void => {
    navigate(item?.key as string)
  }

  const header = (
    <div className="header">
      <Header mainLogo={logo} title="Data anonymization" userMenu={rightElement} />
      <Menu
        mode="horizontal"
        items={items}
        onClick={navigationClick}
        selectedKeys={location.pathname !== "/" ? [location.pathname] : ["/anonymizations"]}
      />
    </div>
  )

  return (
    <MainLayout header={header}>
      <Outlet />
    </MainLayout>
  )
}

export default Layout
