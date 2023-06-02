import { Table, Tag, notification } from "antd"
import { BackArrow, Button, RoundedFrame } from "cosmian_ui"
import localForage from "localforage"
import { Key, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import EditMethodBox from "../components/EditMethodBox"
import { paths_config } from "../config/paths"
import { ConfigurationInfo, MetaData, downloadFile, uploadConfiguration } from "../utils/utils"
import "./style.less"

const ellipsisStyle: React.CSSProperties = { maxWidth: 100, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }

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
  },
  {
    title: "Result",
    dataIndex: "result",
    key: "result",
    render: (result: string | number) => {
      if (result && result.toString().substring(0, 5) === "Error")
        return <div style={{ color: "#e34319", fontStyle: "italic", ...ellipsisStyle }}>{result}</div>
      return <div style={ellipsisStyle}>{result}</div>
    },
  },
]

const Edit = (): JSX.Element => {
  const configUuid: string = useLocation().state?.uuid
  const fetchType: string = useLocation().state?.type

  const navigate = useNavigate()

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [configurationInfo, setConfigurationInfo] = useState<ConfigurationInfo>()
  const [fileMetadata, setFileMetadata] = useState<MetaData[] | undefined>(undefined)

  useEffect(() => {
    const fetchConfig = async (): Promise<void> => {
      let configuration: { configurationInfo: ConfigurationInfo; metadata: MetaData[] } | null = null
      if (fetchType === "local") {
        configuration = await localForage.getItem(configUuid)
      } else {
        const response = await fetch(`http://localhost:8000/api/configurations/${configUuid}`)
        if (response.ok) {
          const response_json = await response.json()
          configuration = JSON.parse(response_json.message)
        }
      }
      if (configuration) {
        setConfigurationInfo(configuration.configurationInfo)
        setFileMetadata(configuration.metadata)
      }
    }
    fetchConfig()
  }, [])

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]): void => {
      setSelectedRowKeys(newSelectedRowKeys)
    },
  }

  const handleDownloadConfiguration = async (): Promise<void> => {
    const configuration = { configurationInfo, fileMetadata }
    const fileName = "config-" + configuration.configurationInfo.name
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
    try {
      await localForage.setItem(configUuid, { metadata: updatedFileMetaData, configurationInfo })
    } catch (error) {
      notification.error({
        duration: 3,
        message: "Error saving Configuration",
        description: (error as Error).message,
      })
      throw new Error((error as Error).message)
    }
  }

  return (
    <div className="edit-view">
      <div className={fetchType === "local" ?  "edit-main with-box" : "edit-main"}>
        <BackArrow onClick={() => navigate(paths_config.configuration)} text="Back to Configuration list" />
        <div className="head">
          <div className="head-titles">
            <h1>{configurationInfo?.name} data's columns</h1>
            {fetchType === "local" && <div>Select column(s) and define anonymization method to apply.</div>}
          </div>
          <div className="buttons">
            {fetchType === "local" && <Button type="dark" onClick={() => handleUploadConfiguration(configurationInfo?.uuid)}>Upload Configuration</Button>}
            <Button onClick={() => handleDownloadConfiguration()}>Download Configuration</Button>
          </div>
        </div>
        <RoundedFrame>
          <Table
            rowKey={"key"}
            dataSource={fileMetadata}
            columns={columns}
            pagination={false}
            rowSelection={fetchType === "local" ? rowSelection : null}
            tableLayout="auto"
            scroll={{ x: 400 }}
          />
        </RoundedFrame>
      </div>
      {fetchType === "local" && <EditMethodBox
        selectedRowKeys={selectedRowKeys}
        fileMetadata={fileMetadata}
        saveConfiguration={saveConfiguration}
        setSelectedRowKeys={setSelectedRowKeys}
      />}
    </div>
  )
}

export default Edit
