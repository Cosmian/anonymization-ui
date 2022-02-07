import { Switch } from "antd"
import React, { useState } from "react"
import { AiFillLock, AiFillUnlock } from "react-icons/ai"
import "./encrypted-switch.less"

type EncryptedSwitchProps = {
  encryptedState: boolean
  onChange: (state: boolean) => void
}

const EncryptedSwitch: React.FC<EncryptedSwitchProps> = ({ onChange, encryptedState }): JSX.Element => {
  const [encState, setEnState] = useState(encryptedState)

  const handleChange = (checked: boolean): void => {
    onChange(checked)
    setEnState(!encState)
  }
  return (
    <div className="encrypted-switch">
      <AiFillUnlock className={encState ? "lock muted" : "lock"} />
      <Switch defaultChecked={encryptedState} onChange={handleChange} />
      <AiFillLock className={encState ? "lock" : "lock muted"} />
    </div>
  )
}

export default EncryptedSwitch
