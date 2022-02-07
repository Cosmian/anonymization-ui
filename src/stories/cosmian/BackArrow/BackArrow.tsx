import React from "react"
import { IoArrowBackSharp } from "react-icons/io5"
import { To, useNavigate } from "react-router-dom"
import "./back-arrow.less"

export type BackArrowProps = {
  /**
   * Button content
   */
  text: string
  /**
   * Url
   */
  url: To | number

  style?: React.CSSProperties
}

const BackArrow: React.FC<BackArrowProps> = ({ text, url, style }): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div className="page-back" style={style}>
      <a onClick={() => navigate(url as To)}>
        <IoArrowBackSharp className="arrow" size={18} style={{ marginRight: "1em" }} />
        <span className="text">{text}</span>
      </a>
    </div>
  )
}

export default BackArrow
