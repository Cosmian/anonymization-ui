import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import React from "react"
import "./fallback.less"

export const FallbackAnimation: React.FC = () => {
  const antIcon = <LoadingOutlined spin />

  return (
    <div className="fallback">
      <Spin indicator={antIcon} />
    </div>
  )
}
