import { Table } from "antd"
import { Button, RoundedFrame } from "cosmian_ui"
import { useEffect, useState } from "react"
import { IoDownloadOutline, IoOptionsOutline, IoTrashOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { paths_config } from "../config/paths"

import { ConfigurationInfo } from "../utils/utils"
import "./style.less"

const Anonymization = (): JSX.Element => {
  const navigate = useNavigate()
  const [configList, setConfigList] = useState(Object.keys(sessionStorage))
  const [dataSource, setDataSource] = useState<{name: string, created_at: string, size: string}[] | undefined>([])

  useEffect(() => {
    const elements = Object.keys(sessionStorage)
    const data = elements.map((name, index) => {
      const item = sessionStorage.getItem(name)
      if (item) {
        const element = JSON.parse(item)
        const info = element.configurationInfo
        return { key: index, ... info }
      }
    })
    setConfigList(elements)
    if (data) {
      setDataSource(data)
    }
  }, [sessionStorage, configList])

  const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Creation date",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "File",
    dataIndex: "file",
    key: "file",
  },
  {
    title: "Options",
    key: "options",
    width: 50,
    render: (configuration: ConfigurationInfo) => {

      const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.stopPropagation()
        const updatedConfigList = [...configList].splice(configList.indexOf(configuration.name), 1)
        setConfigList(updatedConfigList)
        sessionStorage.removeItem(configuration.name)
      }

      const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.stopPropagation()
        navigate(paths_config.edit, { state: { name: configuration.name }})
      }

      const handleDownload = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.stopPropagation()
        console.log("download")
      }

      return (
        <div className="icons">
          <div
            className="icon"
            onClick={(e) => {
              handleSelect(e)
            }}
            >
            <IoOptionsOutline />
          </div>
          <div
            className="icon"
            onClick={(e) => {
              handleDownload(e)
            }}
            >
            <IoDownloadOutline />
          </div>
          <div
          className="icon"
          onClick={(e) => {
            handleDelete(e)
          }}
          >
            <IoTrashOutline />
          </div>
        </div>
      )
    },
  },
]

  return (
    <div className="anonymization">
      <h1>Anonymization configuration</h1>
      <p>Secure you datasets using various anonymization techniques.</p>
      <div className="buttons">
        <Button
          onClick={() => {navigate(paths_config.import)}}>
          Import configuration
        </Button>
        <Button
          onClick={() => {navigate(paths_config.upload)}}>
          Create configuration
        </Button>
      </div>
      <RoundedFrame className="search">
        <p className="h4">List of configurations</p>
        <Table
          rowKey={"key"}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </RoundedFrame>
    </div>
  )
}

export default Anonymization
