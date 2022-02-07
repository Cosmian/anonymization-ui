import { Button } from "antd"
import React from "react"
import "./fof.less"

export interface FourZeroFourProps {
  /**
   * Optional click handler
   */
  onBackToHome: () => void
}

export const FourZeroFour: React.FC<FourZeroFourProps> = ({ onBackToHome }) => {
  return (
    <div className="fof">
      <p className="title">404</p>
      <p className="info-text">Sorry, the page you are trying to access does not exist.</p>
      <Button className="home-btn" size="large" danger onClick={onBackToHome}>
        Back to dashboard
      </Button>
    </div>
  )
}
