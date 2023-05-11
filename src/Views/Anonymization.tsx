import { Dropdown, Table } from "antd"
import { Button, OptionButton, RoundedFrame } from "cosmian_ui"
import localForage from "localforage"
import { useEffect, useState } from "react"
import { IoTrashOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { paths_config } from "../config/paths"

import { DeleteConfigModal } from "../components/DeleteConfigModal"
import { ConfigurationInfo, MetaData, downloadFile } from "../utils/utils"
import "./style.less"

const Anonymization = (): JSX.Element => {
  const navigate = useNavigate()
  const [configList, setConfigList] = useState<ConfigurationInfo[]>([])
  const [deleteConfigModalVisible, setDeleteConfigModalVisible] = useState<boolean>(false)

  useEffect(() => {
    const fetchConfigurations = async (): Promise<void> => {
      const elements = await localForage.keys()
      const data = await Promise.all(elements.map(async (uuid): Promise<ConfigurationInfo | undefined> => {
        const item: { configurationInfo: ConfigurationInfo, metadata: MetaData[] } | null = await localForage.getItem(uuid)
        if (item) {
          return item.configurationInfo
        }
        return undefined
      }))
      if (data) {
        const filteredData = data.filter((el): el is ConfigurationInfo => !!el)
        filteredData.sort((a: ConfigurationInfo, b: ConfigurationInfo): number => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        setConfigList(filteredData)
      }
    }
    fetchConfigurations()
  }, [])

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
      render: (date: Date) => {
        return new Date(date).toLocaleString()
      }
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
          navigate(paths_config.edit, { state: { uuid: configuration.uuid }})
        }

        const handleDelete = async (): Promise<void> => {
          if (configList) {
            const updatedDataSource = configList.filter(data => data.name !== configuration.name).sort((a: ConfigurationInfo, b: ConfigurationInfo) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
            setConfigList(updatedDataSource)
          }
          await localForage.removeItem(configuration.uuid)
          setDeleteConfigModalVisible(false)
      }

        const handleDownload = (): void => {
          downloadFile(configuration.uuid)
        }

        const handleCopy = async (): Promise<void> => {
          const configurationInitial: { configurationInfo: ConfigurationInfo, metadata: MetaData[] } | null = await localForage.getItem(configuration.uuid)
          if (configurationInitial && configList) {
            const uuid = uuidv4()
            const copyName = configuration.name + "_copy_" + uuid.slice(0, 4)
            const configurationInfoCopy: ConfigurationInfo = { name: copyName, created_at: new Date().toLocaleString(), file: configuration.file, uuid }
            const configurationCopy = {...configurationInitial, configurationInfo: configurationInfoCopy}
            await localForage.setItem(uuid, configurationCopy)
            setConfigList([...configList, configurationInfoCopy])
          }
        }

        const items = [
          { label: "Copy configuration", key: "copy", onClick: handleCopy },
          { label: "Download configuration", key: "download", onClick: handleDownload },
          { label: "Delete configuration", key: "delete", danger: true, onClick: () => setDeleteConfigModalVisible(true), icon: <IoTrashOutline /> },
        ]

        return (
          <div className="icons">
            <Button type="dark" onClick={(e) => handleSelect(e)}>Edit</Button>
            <Dropdown menu={{ items }} placement="bottomRight" trigger={["hover"]}>
              <div className="icon">
              <OptionButton onClick={() => {}}/>
              </div>
            </Dropdown>
            <DeleteConfigModal
              visible={deleteConfigModalVisible}
              onCancel={() => setDeleteConfigModalVisible(false)}
              onDelete={() => handleDelete()}
            />
          </div>
        )
      },
    },
  ]

  return (
    <div className="anonymization">
      <h1>Anonymization configuration</h1>
      <p>Secure you datasets using various anonymization methods.</p>
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
          rowKey={"uuid"}
          dataSource={configList}
          columns={columns}
          pagination={false}
        />
      </RoundedFrame>
    </div>
  )
}

export default Anonymization
