import { Menu, MenuProps, Tooltip } from "antd"
import { ItemType } from "antd/lib/menu/hooks/useItems"
import { CosmianLogo, ExternalLinkButton, Header, MainLayout } from "cosmian_ui"
import { useContext, useEffect, useState } from "react"
import {
  IoBookOutline,
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
import { Role } from "../utils/utils"

const Layout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const context = useContext(AppContext)
  const [roles, setRoles] = useState<Role[] | undefined>(undefined)

  const logo = <CosmianLogo link={window.location.origin} />
  const verifiedContent =
    "The microservice that you're querying has been verified by the application owner: code is running inside an enclave and code's fingerprint has been checked."
  const unverifiedContent = "The microservice that you're querying is not running."

  useEffect(() => {
    const handleGetRoles = async (): Promise<void> => {
      const roles: Role[] | undefined = context?.roles
      setRoles(roles)
    }
    handleGetRoles()
  }, [])

  const rightElement = (
    <>
      <ExternalLinkButton
        title="Documentation"
        url=" https://docs.cosmian.com/cloudproof_encryption/data_anonymization/"
        icon={<IoBookOutline />}
      />
      {context?.microserviceState ? (
        <>
          <Tooltip title={verifiedContent}>
            <div className="verified">
              <IoFingerPrintSharp className="icon" size={20} />
              Microservice running & verified
            </div>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title={unverifiedContent}>
            <div className="unverified">
              <IoCloudOfflineOutline className="icon" size={20} />
              Microservice is not running
            </div>
          </Tooltip>
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
      disabled: !roles?.includes(Role.Configure),
    },
    {
      icon: <IoBuildOutline />,
      key: "/finetunings",
      label: "Configuration Fine-tuning",
      disabled: !roles?.includes(Role.Finetune),
    },
    {
      icon: <IoCloudUploadOutline />,
      key: "/anonymize",
      label: "Anonymize Data",
      disabled: !roles?.includes(Role.Anonymize),
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
