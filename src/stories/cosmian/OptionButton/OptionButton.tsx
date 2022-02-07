import { EllipsisOutlined } from "@ant-design/icons"
import React from "react"
import "./optionbutton.less"

type OptionButtonProps = {
  testid: string
}

const OptionButton: React.FC<OptionButtonProps> = ({ testid }): JSX.Element => {
  return (
    <div className="circle-btn" data-testid={`options-${testid}`}>
      <EllipsisOutlined rotate={90} />
    </div>
  )
}

export default OptionButton
