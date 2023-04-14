import { Dropdown, Table } from "antd"
import { Button, RoundedFrame } from "cosmian_ui"
import { useEffect, useState } from "react"
import { IoEllipsisVertical, IoTrashOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { paths_config } from "../config/paths"


import { ConfigurationInfo, downloadFile } from "../utils/utils"
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
        return { key: index, ...info }
      }
    })
    setConfigList(elements)
    if (data) {
      setDataSource(data)
    }
  }, [sessionStorage])

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
    title: "",
    key: "options",
    width: 100,
    render: (configuration: ConfigurationInfo) => {
      const handleSelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.stopPropagation()
        navigate(paths_config.edit, { state: { name: configuration.name }})
      }

      const handleDelete = (): void => {
        if (dataSource) {
          const data = [...dataSource]
          const updatedDataSource = data.filter(data => console.log(data.name !== configuration.name))
          setDataSource(updatedDataSource)
        }
        sessionStorage.removeItem(configuration.name)
      }

      const handleDownload = (): void => {
        downloadFile(configuration.name)
      }

      const items = [
        { label: "Copy configuration", key: "copy" },
        { label: "Download configuration", key: "download", onClick: handleDownload },
        { label: "Delete configuration", key: "delete", danger: true, onClick: handleDelete, icon: <IoTrashOutline /> },
      ]

      return (
        <div className="icons">
          <Button type="dark" onClick={(e) => handleSelect(e)}>Edit</Button>
          <Dropdown menu={{ items }} placement="bottomRight" trigger={["hover"]}>
            <div className="icon">
              <IoEllipsisVertical />
            </div>
          </Dropdown>
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
          type="outline"
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
