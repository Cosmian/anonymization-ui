import { UserOutlined } from "@ant-design/icons"
import { Avatar } from "antd"
import React from "react"
import "./user.less"

export type UserPictureProps = {
  /**
   * Cat image url
   */
  url?: string
}
/**
 * User picture shown in Profile page
 */
export const UserPicture: React.FC<UserPictureProps> = ({ url }) => {
  return (
    <div className="user-picture">
      {!url && <Avatar size={110} icon={<UserOutlined />} />}
      {url && <div className="picture" style={{ backgroundImage: `url("${url}")` }} />}
    </div>
  )
}
