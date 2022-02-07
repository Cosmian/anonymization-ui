import React, { FC } from "react"
import importIcon from "../../assets/bigicons/import.svg"
import loadingIcon from "../../assets/bigicons/loading.svg"
import successIcon from "../../assets/bigicons/success.svg"
import trashIcon from "../../assets/bigicons/trash.svg"
import "./icons.less"

export type BigIconProps = {
  type: "trash" | "import" | "loading" | "success"
  style?: React.CSSProperties
}

export const BigIcon: FC<BigIconProps> = ({ type, style }) => {
  return (
    <div className="big-icon" style={style || {}}>
      {type === "trash" && <img src={trashIcon} alt="Trash" />}
      {type === "import" && <img src={importIcon} alt="Import" />}
      {type === "loading" && <img src={loadingIcon} alt="Loading" className="spin" />}
      {type === "success" && <img src={successIcon} alt="Success" />}
    </div>
  )
}
