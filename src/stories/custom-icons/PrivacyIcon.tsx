import React, { FC } from "react"

const PrivacyIcon: FC = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.97 3.166C11.96 2.626 10.716 2.226 8 1 5.284 2.227 4.04 2.626 1.03 3.166.485 11.807 7.481 14.791 8 15c.519-.209 7.515-3.193 6.97-11.834z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.994 6C9.904 7.101 8.997 8 8 8s-1.906-.898-1.994-2C5.916 4.854 6.8 4 8 4s2.084.875 1.994 2z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 9c-1.813 0-3.652.9-3.992 2.599-.041.204.087.401.325.401h7.333c.239 0 .367-.197.326-.401C11.652 9.9 9.813 9 8 9z"
        stroke="currentColor"
        strokeMiterlimit={10}
      />
    </svg>
  )
}

export default PrivacyIcon
