import { Drawer } from "antd"
import { Button } from "cosmian_ui"
import React from "react"
import { methodsInfo } from "../utils/utils"

interface MethodInfoBoxProps {
  open: boolean;
  method: string;
  close: () => void
}

const MethodInfoBox: React.FC<MethodInfoBoxProps> = ({ open, method, close }) => {
  return (
    <Drawer title={`${method} method`} placement="right" onClose={close} open={open} style={{ position: "fixed", right: "378px", top: "60px" }} closable={false} zIndex={90}>
      <div className="infoBox">
        <div className="infoText">{methodsInfo[method]}</div>
        <Button type="outline" onClick={close}>Close</Button>
      </div>
    </Drawer>
  )
}

export default MethodInfoBox
