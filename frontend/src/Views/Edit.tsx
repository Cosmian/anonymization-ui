import { CloudUploadOutlined, DownloadOutlined, EditOutlined } from "@ant-design/icons"
import { Skeleton, Space, Table, Tag, Typography, notification } from "antd"
import { BackArrow, Button, RoundedFrame } from "cosmian_ui"
import localForage from "localforage"
import { Key, useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import AppContext from "../AppContext"
import EditMethodBox from "../components/EditMethodBox"
import { paths_config } from "../config/paths"
import { ConfigurationInfo, MetaData, downloadFile, getCorrelatedColumns, uploadConfiguration } from "../utils/utils"

const ellipsisStyle: React.CSSProperties = { maxWidth: 100, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }

const flattenObject = (obj: Record<string, any>): Record<string, string> => {
  return Object.entries(obj).reduce((result, [key, value]) => {
    if (key === "wordsList") {
      return { [key]: value.toString() }
    } else if (typeof value !== "object" || value === null || value === undefined) {
      return { ...result, [key]: value }
    }
    return { ...result, ...flattenObject(value) }
  }, {})
}

const Edit = (): JSX.Element => {
  const { id } = useParams()
  const fetchType: string = useLocation().state?.type
  const navigate = useNavigate()
  const context = useContext(AppContext)

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [configurationInfo, setConfigurationInfo] = useState<ConfigurationInfo>()
  const [fileMetadata, setFileMetadata] = useState<MetaData[] | undefined>(undefined)

  useEffect(() => {
    context?.checkMicroserviceHealth()
    const fetchConfig = async (): Promise<void> => {
      let configuration: { configurationInfo: ConfigurationInfo; metadata: MetaData[] } | null = null
      if (fetchType === "local" && id) {
        configuration = await localForage.getItem(id)
      } else {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/configurations/${id}`)
        if (response.ok) {
          configuration = await response.json()
        }
      }
      if (configuration) {
        setConfigurationInfo(configuration.configurationInfo)
        setFileMetadata(configuration.metadata)
      }
    }
    fetchConfig().catch((error) => {
      notification.error({
        duration: 3,
        message: "Error fetching configuration",
        description: (error as Error).message,
      })
      navigate(paths_config.configuration)
      throw new Error((error as Error).message)
    })
  }, [])

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]): void => {
      setSelectedRowKeys(newSelectedRowKeys)
    },
  }

  const handleDownloadConfiguration = async (): Promise<void> => {
    const configuration = { configurationInfo, metadata: fileMetadata }
    const fileName = "config-" + configurationInfo?.name
    const content = JSON.stringify(configuration)
    downloadFile(content, { type: "application/json" }, fileName)
  }

  const handleUploadConfiguration = (configurationUuid: string | undefined): void => {
    uploadConfiguration(configurationUuid)
    setTimeout(() => {
      navigate(paths_config.configuration)
    }, 1000)
  }

  const saveConfiguration = async (updatedFileMetaData: MetaData[]): Promise<void> => {
    setFileMetadata(updatedFileMetaData)
    if (id) {
      try {
        await localForage.setItem(id, { metadata: updatedFileMetaData, configurationInfo })
      } catch (error) {
        notification.error({
          duration: 3,
          message: "Error saving Configuration",
          description: (error as Error).message,
        })
        throw new Error((error as Error).message)
      }
    }
  }

  const renameConfigTitle = async (newTitle: string): Promise<void> => {
    if (id) {
      try {
        if (fetchType === "local") {
          const updatedConfigurationInfo = { ...(configurationInfo as ConfigurationInfo), name: newTitle }
          setConfigurationInfo(updatedConfigurationInfo)
          await localForage.setItem(id, { metadata: fileMetadata, configurationInfo: updatedConfigurationInfo })
        } else if (fetchType === "uploaded") {
          const updatedConfigurationInfo = { ...(configurationInfo as ConfigurationInfo), name: newTitle }
          setConfigurationInfo(updatedConfigurationInfo)
          const configuration = { metadata: fileMetadata, configurationInfo: updatedConfigurationInfo }
          const jsonFile = new Blob([JSON.stringify(configuration)], { type: "application/json" })
          const formData = new FormData()
          formData.append("file", jsonFile, `${configuration?.configurationInfo.name}.json`)
          const response = await fetch(`${import.meta.env.VITE_API_URL}/configurations/${id}`, {
            method: "PUT",
            body: formData,
          })
          const responseContent = await response.text()
          if (response.ok) {
            notification.success({
              duration: 3,
              message: "Rename configuration",
              description: responseContent,
            })
          } else {
            notification.error({
              duration: 3,
              message: "Rename configuration",
              description: responseContent,
            })
          }
        }
      } catch (error) {
        notification.error({
          duration: 3,
          message: "Error updating configuration",
          description: (error as Error).message,
        })
      }
    }
  }

  const columns = [
    {
      title: "Column name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        return <Tag>{type}</Tag>
      },
    },
    {
      title: "Example",
      dataIndex: "example",
      key: "example",
      render: (example: string) => {
        return <div style={ellipsisStyle}>{example}</div>
      },
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      width: 120,
    },
    {
      title: "Options",
      dataIndex: "methodOptions",
      key: "methodOptions",
      width: 120,
      render: (methodOptions: any) => {
        const flatten = methodOptions ? flattenObject(methodOptions) : {}
        return (
          <>
            <div
              style={{
                width: methodOptions ? 250 : 0,
                display: "block",
                height: "auto",
                maxHeight: 100,
                overflow: "scroll",
              }}
            >
              {Object.entries(flatten).map((value, key) => {
                if (value[0] === "correlation") {
                  return (
                    <span key={key}>
                      – <span className="strong">{value[0].charAt(0).toUpperCase() + value[0].slice(1)}</span>:{" "}
                      {getCorrelatedColumns(value[1], fileMetadata).map((name, index) => (
                        <Tag key={index}>{name}</Tag>
                      ))}{" "}
                      <br />
                    </span>
                  )
                } else {
                  return (
                    <span key={key}>
                      – <span className="strong">{value[0].charAt(0).toUpperCase() + value[0].slice(1)}</span>: {value[1]} <br />
                    </span>
                  )
                }
              })}
            </div>
          </>
        )
      },
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      width: 120,
      render: (result: string | number) => {
        if (result && result.toString().substring(0, 5) === "Error")
          return <div style={{ color: "#e34319", fontStyle: "italic", ...ellipsisStyle }}>{result}</div>
        return <div style={ellipsisStyle}>{result}</div>
      },
    },
  ]

  if (configurationInfo == null || fileMetadata == null) return <Skeleton />
  return (
    <div className="edit-view">
      <div className={fetchType === "local" ? "with-box" : ""}>
        <BackArrow onClick={() => navigate(paths_config.configuration)} text="Back to Configuration list" />
        <Typography.Title
          level={1}
          style={{ marginBottom: "1em", fontSize: "1.875rem" }}
          editable={{
            onChange: (text) => renameConfigTitle(text),
            text: configurationInfo?.name,
            autoSize: { maxRows: 1, minRows: 1 },
            icon: <EditOutlined style={{ marginLeft: "0.25em" }} />,
          }}
        >
          {configurationInfo?.name}
        </Typography.Title>
        <Space className="buttons">
          <Button onClick={() => handleDownloadConfiguration()} type="dark" icon={<DownloadOutlined />}>
            Download Configuration
          </Button>
          {fetchType === "local" && (
            <Button onClick={() => handleUploadConfiguration(configurationInfo?.uuid)} icon={<CloudUploadOutlined />}>
              Upload Configuration
            </Button>
          )}
        </Space>
        <RoundedFrame className="edit-table">
          <Table
            rowKey={"key"}
            dataSource={fileMetadata}
            columns={columns}
            pagination={false}
            rowSelection={fetchType === "local" ? rowSelection : undefined}
            tableLayout="auto"
            scroll={{ x: 800 }}
          />
        </RoundedFrame>
      </div>
      {fetchType === "local" && (
        <EditMethodBox
          selectedRowKeys={selectedRowKeys}
          fileMetadata={fileMetadata}
          saveConfiguration={saveConfiguration}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      )}
    </div>
  )
}

export default Edit
