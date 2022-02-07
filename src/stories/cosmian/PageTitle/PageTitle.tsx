import { Typography } from "antd"
import React from "react"
import "./page-title.less"
const { Title } = Typography

export type PageTitleProps = {
  /**
   * Unique h1 title for the page
   */
  title: string

  /**
   * Subtitle content
   */
  subtitle?: string | JSX.Element

  /**
   * Optional call to action button
   */
  option?: JSX.Element
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, option }) => {
  return (
    <div className="page-title">
      <div className="wrapper">
        <div>
          <Title level={1}>{title}</Title>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {option && <div className="option-block">{option}</div>}
      </div>
    </div>
  )
}

export default PageTitle
