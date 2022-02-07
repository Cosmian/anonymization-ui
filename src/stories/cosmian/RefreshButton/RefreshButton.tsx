import { SyncOutlined } from "@ant-design/icons"
import React from "react"
import "./refresh-button.less"

export type RefreshButtonProps = {
  /**
   * Handle click action
   */
  onClick?: () => void
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick }): JSX.Element => {
  return <SyncOutlined onClick={onClick} className="refresh-button" />
}

export default RefreshButton
