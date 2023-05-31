import { Dropdown, Table, notification } from "antd"
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

const Configuration = (): JSX.Element => {
  const navigate = useNavigate()
  const [configList, setConfigList] = useState<ConfigurationInfo[]>([])
  const [deleteConfigModalVisible, setDeleteConfigModalVisible] = useState<boolean>(false)
  const [configToDelete, setConfigToDelete] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchConfigurations = async (): Promise<void> => {
      const elements = await localForage.keys()
      const data = await Promise.all(
        elements.map(async (uuid): Promise<ConfigurationInfo | undefined> => {
          const item: { configurationInfo: ConfigurationInfo; metadata: MetaData[] } | null = await localForage.getItem(uuid)
          return item?.configurationInfo
        })
      )
      if (data) {
        const filteredData = data.filter((el): el is ConfigurationInfo => !!el)
        filteredData.sort(
          (a: ConfigurationInfo, b: ConfigurationInfo): number => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        setConfigList(filteredData)
      }
    }
    try {
      fetchConfigurations()
    } catch (error) {
      notification.error({
        duration: 3,
        message: "Error fetching configuration list",
        description: (error as Error).message
      })
      throw new Error((error as Error).message)
    }
  }, [])

  const handleDelete = async (): Promise<void> => {
    if (configToDelete) {
      if (configList) {
        const updatedDataSource = configList
          .filter((data) => data.uuid !== configToDelete)
          .sort((a: ConfigurationInfo, b: ConfigurationInfo) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        setConfigList(updatedDataSource)
      }
      await localForage.removeItem(configToDelete)
      setDeleteConfigModalVisible(false)
      setConfigToDelete(undefined)
    }
  }

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
          navigate(paths_config.edit, { state: { uuid: configuration.uuid } })
        }

        const handleDownload = (): void => {
          downloadFile(configuration.uuid)
        }

        const handleCopy = async (): Promise<void> => {
          const configurationInitial: { configurationInfo: ConfigurationInfo; metadata: MetaData[] } | null = await localForage.getItem(
            configuration.uuid
          )
          if (configurationInitial && configList) {
            const uuid = uuidv4()
            const copyName = configuration.name + "_copy_" + uuid.slice(0, 4)
            const configurationInfoCopy: ConfigurationInfo = {
              name: copyName,
              created_at: new Date().toLocaleString(),
              file: configuration.file,
              uuid,
              delimiter: configuration.delimiter,
            }
            const configurationCopy = { ...configurationInitial, configurationInfo: configurationInfoCopy }
            try {
              await localForage.setItem(uuid, configurationCopy)
              setConfigList([...configList, configurationInfoCopy])
            } catch (error) {
              notification.error({
                duration: 3,
                message: "Error copying Configuration",
                description: (error as Error).message
              })
              throw new Error((error as Error).message)
            }
          }
        }

        const items = [
          { label: "Copy Configuration", key: "copy", onClick: handleCopy },
          { label: "Download Configuration", key: "download", onClick: handleDownload },
          {
            label: "Delete configuration",
            key: "delete",
            danger: true,
            onClick: () => {
              setDeleteConfigModalVisible(true)
              setConfigToDelete(configuration.uuid)
            },
            icon: <IoTrashOutline />,
          },
        ]

        return (
          <div className="icons">
            <Button type="dark" onClick={(e) => handleSelect(e)}>
              Edit
            </Button>
            <Dropdown menu={{ items }} placement="bottomRight" trigger={["hover"]}>
              <div className="icon">
                <OptionButton />
              </div>
            </Dropdown>
          </div>
        )
      },
    },
  ]

  return (
    <div className="anonymization">
      <h1>Anonymization Configuration</h1>
      <p>Define your anonymization using various anonymization methods.</p>
      <div className="buttons">
        <Button
          type="outline"
          onClick={() => {navigate(paths_config.import)}}>
          Import Configuration
        </Button>
        <Button
          onClick={() => {navigate(paths_config.upload)}}>
          Create Configuration
        </Button>
      </div>
      <RoundedFrame>
        <p className="h4">List of Configuration</p>
        <Table
          rowKey={"uuid"}
          dataSource={configList}
          columns={columns}
          pagination={false}
        />
      </RoundedFrame>
      <DeleteConfigModal
        visible={deleteConfigModalVisible}
        onCancel={() => setDeleteConfigModalVisible(false)}
        onDelete={() => handleDelete()}
      />
    </div>
  )
}

export default Configuration
