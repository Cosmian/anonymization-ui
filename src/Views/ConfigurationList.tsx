import { DesktopOutlined } from "@ant-design/icons"
import { Dropdown, Space, Table, notification } from "antd"
import { Button, OptionButton, RoundedFrame } from "cosmian_ui"
import localForage from "localforage"
import { useEffect, useState } from "react"
import { IoTrashOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { DeleteModal } from "../components/DeleteModal"
import { paths_config } from "../config/paths"
import { ConfigurationInfo, MetaData, downloadLocalConfiguration } from "../utils/utils"

const ConfigurationList = (): JSX.Element => {
  const navigate = useNavigate()
  const [localConfigList, setLocalConfigList] = useState<ConfigurationInfo[]>([])
  const [deleteConfigModalVisible, setDeleteConfigModalVisible] = useState<boolean>(false)
  const [localConfigToDelete, setLocalConfigToDelete] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchLocalConfigurations = async (): Promise<void> => {
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
        setLocalConfigList(filteredData)
      }
    }
    fetchLocalConfigurations().catch(() => {
      notification.error({
        duration: 3,
        message: "Error fetching local configuration list",
      })
    })
  }, [])

  const handleDelete = async (): Promise<void> => {
    if (localConfigToDelete) {
      if (localConfigList) {
        const updatedDataSource = localConfigList
          .filter((data) => data.uuid !== localConfigToDelete)
          .sort((a: ConfigurationInfo, b: ConfigurationInfo) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        setLocalConfigList(updatedDataSource)
      }
      await localForage.removeItem(localConfigToDelete)
      setDeleteConfigModalVisible(false)
      setLocalConfigToDelete(undefined)
    }
  }

  const localColumns = [
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
          navigate(paths_config.configuration + `/${configuration.uuid}`)
        }

        const handleDownload = (): void => {
          downloadLocalConfiguration(configuration.uuid)
        }

        const handleCopy = async (): Promise<void> => {
          const configurationInitial: { configurationInfo: ConfigurationInfo; metadata: MetaData[] } | null = await localForage.getItem(
            configuration.uuid
          )
          if (configurationInitial && localConfigList) {
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
              setLocalConfigList([...localConfigList, configurationInfoCopy])
            } catch (error) {
              notification.error({
                duration: 3,
                message: "Error copying Configuration",
                description: (error as Error).message,
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
              setLocalConfigToDelete(configuration.uuid)
            },
            icon: <IoTrashOutline />,
          },
        ]

        return (
          <Space>
            <Button type="dark" onClick={(e) => handleSelect(e)}>
              Edit
            </Button>
            <Dropdown menu={{ items }} placement="bottomRight" trigger={["hover"]}>
              <div>
                <OptionButton />
              </div>
            </Dropdown>
          </Space>
        )
      },
    },
  ]

  return (
    <div className="anonymization">
      <h1>Anonymization Configuration</h1>
      <p>Define your anonymization using various anonymization methods.</p>
      <Space className="buttons">
        <Button
          type="outline"
          onClick={() => {
            navigate(paths_config.import)
          }}
        >
          Import Configuration
        </Button>
        <Button
          onClick={() => {
            navigate(paths_config.create)
          }}
        >
          Create Configuration
        </Button>
      </Space>
      <RoundedFrame>
        <h2 className="h4">
          <DesktopOutlined style={{ marginRight: ".5em" }} />
          Local Configuration
        </h2>
        <p>List of local configurations, only available on your browser. You can edit, duplicate and delete these configurations.</p>
        <Table rowKey={"uuid"} dataSource={localConfigList} columns={localColumns} pagination={false} />
      </RoundedFrame>
      <DeleteModal
        visible={deleteConfigModalVisible}
        type="configuration"
        onCancel={() => setDeleteConfigModalVisible(false)}
        onDelete={() => handleDelete()}
      />
    </div>
  )
}

export default ConfigurationList
