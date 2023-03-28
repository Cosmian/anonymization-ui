import { Table } from "antd"
import { Button, RoundedFrame } from "cosmian_ui"
import { useNavigate } from "react-router-dom"
import { paths_config } from "../config/paths"
import "./style.less"

const Anonymization = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div className="anonymization">
      <h1>Anonymization</h1>
      <p>Secure you datasets using various anonymization techniques.</p>
      <div className="buttons">
        <Button
          onClick={() => {console.log("coucou")}}>
          Import anonymization
        </Button>
        <Button
          onClick={() => {navigate(paths_config.create)}}>
          Create anonymization
        </Button>
      </div>
      <RoundedFrame className="search">
        <p className="h4">List of configurations</p>
        <Table
          rowKey={"uuid"}
          dataSource={[]}
          columns={[]}
          pagination={false}
        />
      </RoundedFrame>
    </div>
  )
}

export default Anonymization
