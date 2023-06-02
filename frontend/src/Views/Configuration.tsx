import { Dropdown, Table, notification } from "antd"
import { Button, OptionButton, RoundedFrame } from "cosmian_ui"
import localForage from "localforage"
import { useEffect, useState } from "react"
import { IoTrashOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { paths_config } from "../config/paths"

import { DeleteConfigModal } from "../components/DeleteConfigModal"
import { ConfigurationInfo, MetaData, downloadLocalConfiguration, downloadUploadedConfiguration } from "../utils/utils"
import "./style.less"

const Configuration = (): JSX.Element => {
  const navigate = useNavigate()
  const [localConfigList, setLocalConfigList] = useState<ConfigurationInfo[]>([])
  const [uploadedConfigList, setUploadedConfigList] = useState<any[]>([])
  const [deleteConfigModalVisible, setDeleteConfigModalVisible] = useState<boolean>(false)
  const [localConfigToDelete, setLocalConfigToDelete] = useState<string | undefined>(undefined)
  const [uploadedConfigToDelete, setUploadedConfigToDelete] = useState<string | undefined>(undefined)

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
        filteredData.sort((a: ConfigurationInfo, b: ConfigurationInfo): number => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        setLocalConfigList(filteredData)
      }
    }
    const fetchUploadedConfigurations = async (): Promise<void> => {
      const response = await fetch("http://localhost:8000/api/configurations")
      const response_json = await response.json()
      const data = JSON.parse(response_json.message)
      if (data) {
        const keys = Object.keys(data)
        const configurations = keys.reduce((acc, key) => {
          const configuration = { uuid: key, name: data[key].name, created_at: data[key].created_at, hash: data[key].hash}
          return [...acc, configuration]
        }, [])
        setUploadedConfigList(configurations)
      }
    }
    try {
      fetchLocalConfigurations()
      fetchUploadedConfigurations()
    } catch (error) {
      notification.error({
        duration: 3,
        message: "Error fetching configuration list",
        description: (error as Error).message
      })
      throw new Error((error as Error).message)
    }
  }, [uploadedConfigToDelete])

  const handleDelete = async (): Promise<void> => {
    if (localConfigToDelete) {
      if (localConfigList) {
        const updatedDataSource = localConfigList.filter(data => data.uuid!== localConfigToDelete).sort((a: ConfigurationInfo, b: ConfigurationInfo) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        setLocalConfigList(updatedDataSource)
      }
      await localForage.removeItem(localConfigToDelete)
      setDeleteConfigModalVisible(false)
      setLocalConfigToDelete(undefined)
    }
    if (uploadedConfigToDelete) {
      const response = await fetch(`http://localhost:8000/api/configurations/${uploadedConfigToDelete}`, {
        method: "DELETE",
      })
      if (response.ok) {
        notification.success({
          duration: 3,
          message: "Delete",
          description: "Configuration successfully deleted from microservice.",
        })
        setDeleteConfigModalVisible(false)
        setUploadedConfigToDelete(undefined)
        return
      }
      notification.error({
        duration: 3,
        message: "Delete",
        description: "An error occured.",
      })
      setDeleteConfigModalVisible(false)
      setUploadedConfigToDelete(undefined)
    }
  }

  const uploadedColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Creation date",
      dataIndex: "created_at",
      key: "created_at",
      render: (timestamp: any) => {
        return new Date(timestamp * 1000).toLocaleString()
      }
    },
    {
      title: "Hash",
      dataIndex: "hash",
      key: "hash",
      render: (hash: string) => {
        return hash.substring(0,9)
      }
    },
    {
      title: "",
      key: "options",
      width: 100,
      render: (configuration: ConfigurationInfo) => {
        const handleSelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
          e.stopPropagation()
          navigate(paths_config.edit, { state: { uuid: configuration.uuid, type: "uploaded" } })
        }

        const handleDownload = (): void => {
          downloadUploadedConfiguration(configuration.uuid)
        }

        const items = [
          { label: "Download Configuration", key: "download", onClick: handleDownload },
          {
            label: "Delete uploaded configuration", key: "delete", danger: true, onClick: () => {
              setDeleteConfigModalVisible(true)
              setUploadedConfigToDelete(configuration.uuid)
            }, icon: <IoTrashOutline />
          },
        ]

        return (
          <div className="icons">
            <Button type="dark" onClick={(e) => handleSelect(e)}>Details</Button>
            <Dropdown menu={{ items }} placement="bottomRight" trigger={["hover"]}>
              <div className="icon">
                <OptionButton onClick={() => { }} />
              </div>
            </Dropdown>
          </div>
        )
      },
    }
  ]

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
          navigate(paths_config.edit, { state: { uuid: configuration.uuid, type: "local" }})
        }

        const handleDownload = (): void => {
          downloadLocalConfiguration(configuration.uuid)
        }

        const handleCopy = async (): Promise<void> => {
          const configurationInitial: { configurationInfo: ConfigurationInfo, metadata: MetaData[] } | null = await localForage.getItem(configuration.uuid)
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
              setLocalConfigToDelete(configuration.uuid)
            }, icon: <IoTrashOutline />
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
        <p className="h4">List of uploaded Configuration</p>
        <Table
          rowKey={"uuid"}
          dataSource={uploadedConfigList}
          columns={uploadedColumns}
          pagination={false}
        />
      </RoundedFrame>
      <RoundedFrame>
        <p className="h4">List of local Configuration</p>
        <Table
          rowKey={"uuid"}
          dataSource={localConfigList}
          columns={localColumns}
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
