import { SearchOutlined } from "@ant-design/icons"
import { Meta, Story } from "@storybook/react"
import { Input } from "antd"
import React from "react"
import {
  IoFolderOpenOutline,
  IoHelpCircleOutline,
  IoHomeOutline,
  IoPeopleOutline,
  IoPersonCircleSharp,
  IoServerOutline,
  IoSettingsOutline,
  IoShieldCheckmarkOutline,
  IoTrashOutline,
} from "react-icons/io5"
import { BASE_PATH, paths_config } from "../../../configs/paths"
import EncryptedSwitch from "../EncryptSwitch/EncryptedSwitch"
import { GlobalLayout } from "./GlobalLayout"

export default {
  title: "Cosmian/GlobalLayout",
  component: GlobalLayout,
  decorators: [
    (Story) => (
      <div style={{}}>
        <Story />
      </div>
    ),
  ],
} as Meta

const navigationCC = [
  {
    key: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: <IoHomeOutline />,
    onlyAdmin: false,
    navLink: paths_config.dashboard,
  },
  {
    key: "computations",
    title: "Computations",
    type: "item",
    icon: <IoShieldCheckmarkOutline />,
    onlyAdmin: false,
    navLink: paths_config.computations,
  },
  {
    key: "participants",
    title: "Participants",
    type: "item",
    icon: <IoPeopleOutline />,
    onlyAdmin: false,
    navLink: paths_config.participants,
  },
  {
    key: "datasources",
    title: "Datasources",
    type: "item",
    icon: <IoServerOutline />,
    onlyAdmin: false,
    navLink: paths_config.datasources,
  },
  {
    key: "administration",
    title: "Administration",
    type: "item",
    icon: <IoSettingsOutline />,
    onlyAdmin: true,
    navLink: paths_config.administration,
  },
]
const navigationZT = [
  {
    key: "home",
    title: "Home",
    type: "item",
    icon: <IoHomeOutline />,
    onlyAdmin: false,
    navLink: "/zerotrust/home",
  },
  {
    key: "folder1",
    title: "Folder 1",
    type: "item",
    icon: <IoFolderOpenOutline />,
    onlyAdmin: false,
    navLink: "/zerotrust/folder1",
  },
  {
    key: "folder2",
    title: "Folder 2",
    type: "item",
    icon: <IoFolderOpenOutline />,
    onlyAdmin: false,
    navLink: "/zerotrust/folder2",
  },
  {
    key: "folder3",
    title: "Folder 3",
    type: "item",
    icon: <IoFolderOpenOutline />,
    onlyAdmin: false,
    navLink: "/zerotrust/folder3",
  },
  {
    key: "deletedFiles",
    title: "Deleted files",
    type: "item",
    icon: <IoTrashOutline />,
    onlyAdmin: false,
    navLink: "/zerotrust/deleted-files",
  },
]

const helpIcon = <IoHelpCircleOutline style={{ width: 24, height: 24, marginRight: 24 }} />
const userIcon = <IoPersonCircleSharp style={{ width: 34, height: 34 }} />

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story = (args: any) => <GlobalLayout {...args} />

export const CipherCompute = Template.bind({})
CipherCompute.args = {
  userInfo: {
    avatar: "",
    fname: "Marie",
    lname: "Curie",
    isAdmin: true,
  },
  navigationConfig: navigationCC,
  locationPathName: paths_config.dashboard,
  title: "Cosmian",
  appType: "ciphercompute",
  options: (
    <>
      {helpIcon}
      {userIcon}
    </>
  ),
  footerContent: (
    <>
      Cosmian Version 0.0.0 – Visit&nbsp;
      <a href="https://cosmian.com" target="_blank" rel="noopener noreferrer">
        cosmian.com
      </a>
    </>
  ),
}

export const ZeroTrust = Template.bind({})
ZeroTrust.args = {
  userInfo: {
    avatar: "",
    fname: "Marie",
    lname: "Curie",
    isAdmin: true,
  },
  navigationConfig: navigationZT,
  locationPathName: "/zerotrust",
  title: "ZeroTrust",
  appType: "zerotrust",
  options: (
    <>
      <span style={{ marginRight: "2em" }}>
        <Input placeholder="Search file or folder" size="small" prefix={<SearchOutlined />} />
      </span>
      <span style={{ marginRight: "2em" }}>
        <EncryptedSwitch encryptedState={false} onChange={() => console.log("switched")} />
      </span>
      {userIcon}
    </>
  ),
  footerContent: (
    <>
      Cosmian Version 0.0.0 – Visit&nbsp;
      <a href="https://cosmian.com" target="_blank" rel="noopener noreferrer">
        cosmian.com
      </a>
    </>
  ),
}
export const CosmianGeneric = Template.bind({})
CosmianGeneric.args = {
  userInfo: {
    avatar: "",
    fname: "Marie",
    lname: "Curie",
    isAdmin: true,
  },
  navigationConfig: navigationCC,
  locationPathName: BASE_PATH,
  appType: "ciphercompute",
  options: (
    <>
      {helpIcon}
      {userIcon}
    </>
  ),
  footerContent: (
    <>
      Cosmian version 0.0.0 – Visit&nbsp;
      <a href="https://cosmian.com" target="_blank" rel="noopener noreferrer">
        cosmian.com
      </a>
    </>
  ),
}
