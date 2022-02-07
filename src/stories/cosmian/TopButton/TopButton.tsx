import { Button, Space } from "antd"
import React from "react"
import "./top-button.less"

export type TopButtonProps = {
  /**
   * Contrast color (default is true)
   */
  contrast?: boolean
  /**
   * If button is disabled (default is false)
   */
  disabled?: boolean
  /**
   * Optional button icon
   */
  icon?: JSX.Element
  /**
   * Handle click action
   */
  onClick?: () => void
}

const TopButton: React.FC<TopButtonProps> = ({ children, onClick, disabled, icon, contrast }): JSX.Element => {
  const customClass = contrast ? "btn-peach" : "btn-primary"

  return (
    <Button type="primary" className={disabled ? "" : customClass} size="large" disabled={disabled} onClick={onClick}>
      {icon && (
        <Space>
          <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
          {children}
        </Space>
      )}
      {!icon && <>{children}</>}
    </Button>
  )
}

TopButton.defaultProps = {
  disabled: false,
  contrast: true,
}

export default TopButton
