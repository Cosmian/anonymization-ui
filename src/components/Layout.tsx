import { Avatar, Menu, MenuProps, Tooltip } from "antd"
import { ItemType } from "antd/lib/menu/hooks/useItems"
import { CosmianLogo, Header, MainLayout } from "cosmian_ui"
import { useContext, useEffect, useState } from "react"
import {
  IoBuildOutline,
  IoCloudOfflineOutline,
  IoCloudUploadOutline,
  IoDocumentLockOutline,
  IoFingerPrintSharp,
  IoOptionsOutline,
} from "react-icons/io5"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import AppContext from "../AppContext"
import "../Views/style.less"

const Layout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const context = useContext(AppContext)
  const [role, setRole] = useState<undefined | string>(undefined)

  const logo = <CosmianLogo link={window.location.origin} />
  const verifiedContent =
    "The microservice that you're querying has been verified by the application owner: code is running inside an enclave and code's fingerprint has been checked."
  const unverifiedContent = "The microservice that you're querying is not running."

  const UserAvatar = () => {
    return (
      <>
        <Avatar
          style={
            role === "configurationProvider" ? { color: "#fff", backgroundColor: "#f56a00" } : { color: "#fff", backgroundColor: "#87d068" }
          }
        >
          {role === "configurationProvider" ? "CP" : "DP"}
        </Avatar>
      </>
    )
  }

  useEffect(() => {
    const handleGetRole = async (): Promise<void> => {
      const role: string | undefined = context?.role
      setRole(role)
    }
    handleGetRole()
  }, [])

  const rightElement = (
    <>
      {context?.microserviceState ? (
        <>
          <Tooltip title={verifiedContent}>
            <div className="verified">
              <IoFingerPrintSharp className="icon" size={20} />
              Microservice running & verified
            </div>
          </Tooltip>
          <UserAvatar />
        </>
      ) : (
        <>
          <Tooltip title={unverifiedContent}>
            <div className="unverified">
              <IoCloudOfflineOutline className="icon" size={20} />
              Microservice is not running
            </div>
          </Tooltip>
          <UserAvatar />
        </>
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
      icon: <IoOptionsOutline />,
      key: "/configurations",
      label: "Configuration",
      disabled: role === "dataProvider",
    },
    {
      icon: <IoBuildOutline />,
      key: "/finetunings",
      label: "Configuration Fine-tuning",
      disabled: role === "configurationProvider",
    },
    {
      icon: <IoCloudUploadOutline />,
      key: "/anonymize",
      label: "Anonymize Data",
      disabled: role === "configurationProvider",
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
