import React from "react"
import "./external-link.less"

export interface ExternalLinkProps {
  /**
   * Link content
   */
  children: string | JSX.Element
  /**
   * link url
   */
  link?: string
  /**
   * Open new window when opening link?
   */
  blank?: boolean
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({ children, link, blank }) => {
  return (
    <>
      {blank && (
        <a href={link ? link : ""} target="_blank" rel="noopener noreferrer" className="external-link">
          {children}
        </a>
      )}
      {!blank && (
        <a href={link} className="external-link">
          {children}
        </a>
      )}
    </>
  )
}

ExternalLink.defaultProps = {
  blank: false,
}
