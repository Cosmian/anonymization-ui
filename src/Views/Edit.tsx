/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownloadOutlined, EditOutlined } from "@ant-design/icons"
import { Skeleton, Space, Table, Tag, Typography, notification } from "antd"
import { BackArrow, Button, RoundedFrame } from "cosmian_ui"
import localForage from "localforage"
import { Key, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import EditMethodBox from "../components/EditMethodBox"
import { paths_config } from "../config/paths"
import { ConfigurationInfo, MetaData, downloadFile, getCorrelatedColumns } from "../utils/utils"

const ellipsisStyle: React.CSSProperties = { maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }

const flattenObject = (obj: Record<string, any>): Record<string, string> | null => {
  if (obj == null) return null
  return Object.entries(obj).reduce((result, [key, value]) => {
    if (key === "wordsList") {
      return { [key]: value.toString() }
    } else if (typeof value !== "object" || !value) {
      return { ...result, [key]: value }
    }
    return { ...result, ...flattenObject(value) }
  }, {})
}

const Edit = (): JSX.Element => {
  const configUuid: string = useLocation().state?.uuid
  const navigate = useNavigate()

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [configurationInfo, setConfigurationInfo] = useState<ConfigurationInfo>()
  const [fileMetadata, setFileMetadata] = useState<MetaData[] | undefined>(undefined)

  useEffect(() => {
    const fetchConfig = async (): Promise<void> => {
      const configuration: { configurationInfo: ConfigurationInfo; metadata: MetaData[] } | null = await localForage.getItem(configUuid)
      if (configuration) {
        setConfigurationInfo(configuration.configurationInfo)
        setFileMetadata(configuration.metadata)
      }
    }
    fetchConfig()
  }, [])

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
      key: "methodOptions2",
      width: 120,
      render: (methodOptions: any) => {
        return <OptionBox methodOptions={methodOptions} fileMetadata={fileMetadata as MetaData[]} />
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]): void => {
      setSelectedRowKeys(newSelectedRowKeys)
    },
  }

  const renameConfigTitle = async (newTitle: string): Promise<void> => {
    try {
      const updatedConfigurationInfo = { ...(configurationInfo as ConfigurationInfo), name: newTitle }
      setConfigurationInfo(updatedConfigurationInfo)
      await localForage.setItem(configUuid, { metadata: fileMetadata, configurationInfo: updatedConfigurationInfo })
    } catch (error) {
      notification.error({
        duration: 3,
        message: "Error saving configuration",
        description: (error as Error).message,
      })
    }
  }

  const downloadConfiguration = (configurationUuid: string | undefined): void => {
    downloadFile(configurationUuid)
    navigate(paths_config.home)
  }

  const saveConfiguration = async (updatedFileMetaData: MetaData[]): Promise<void> => {
    setFileMetadata(updatedFileMetaData)
    try {
      await localForage.setItem(configUuid, { metadata: updatedFileMetaData, configurationInfo })
    } catch (error) {
      notification.error({
        duration: 3,
        message: "Error saving configuration",
        description: (error as Error).message,
      })
    }
  }

  if (configurationInfo == null || fileMetadata == null) return <Skeleton />
  return (
    <div className="edit-view">
      <div className="edit-main">
        <BackArrow onClick={() => navigate(paths_config.home)} text="Back to configurations list" />
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
        <Space style={{ marginTop: "2em", marginBottom: "2em", width: "100%", justifyContent: "space-between" }}>
          <p style={{ margin: 0 }}>Select column(s) and define method to apply.</p>
          <Button onClick={() => downloadConfiguration(configurationInfo?.uuid)} icon={<DownloadOutlined />}>
            Download configuration
          </Button>
        </Space>
        <RoundedFrame>
          <Table
            rowKey={"key"}
            dataSource={fileMetadata}
            columns={columns}
            pagination={false}
            rowSelection={rowSelection}
            tableLayout="auto"
            scroll={{ x: 800 }}
          />
        </RoundedFrame>
      </div>
      <EditMethodBox
        selectedRowKeys={selectedRowKeys}
        fileMetadata={fileMetadata}
        saveConfiguration={saveConfiguration}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    </div>
  )
}

export default Edit

const OptionBox: React.FC<{ methodOptions: any; fileMetadata: MetaData[] }> = ({ methodOptions, fileMetadata }) => {
  const flatten = flattenObject(methodOptions)
  if (flatten) {
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
            if (!value[1]) return <></>
            if (key != null) {
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
            }
          })}
        </div>
      </>
    )
  } else {
    return <></>
  }
}
