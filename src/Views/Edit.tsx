import { Table, Tag, notification } from "antd"
import { BackArrow, Button, RoundedFrame } from "cosmian_ui"
import localForage from "localforage"
import { Key, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import EditMethodBox from "../components/EditMethodBox"
import { paths_config } from "../config/paths"
import { ConfigurationInfo, MetaData, downloadFile } from "../utils/utils"
import "./style.less"

const columns = [
  {
    title: "Column name",
    dataIndex: "name",
    key: "name",
    width: "10",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    width: "10",
    render: (type: string) => {
      return <Tag>{type}</Tag>
    }
  },
  {
    title: "Example",
    dataIndex: "example",
    key: "example",
    width: "30",
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
    width: "20",
  },
  {
    title: "Result",
    dataIndex: "result",
    key: "result",
    width: "30",
    render: (result: string | number ) => {
      if (result && result.toString().substring(0, 5) === "Error") return <div style={{ color: "#e34319", fontStyle: "italic" }}>{result}</div>
      return <div>{result}</div>
    }
  },
]

const Edit = (): JSX.Element => {
  const configUuid: string = useLocation().state?.uuid
  const navigate = useNavigate()

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [configurationInfo, setConfigurationInfo] = useState<ConfigurationInfo>()
  const [fileMetadata, setFileMetadata] = useState<MetaData[] | undefined>(undefined)

  useEffect(() => {
    const fetchConfig = async (): Promise<void> => {
      const configuration: { configurationInfo: ConfigurationInfo, metadata: MetaData[] } | null = await localForage.getItem(configUuid)
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
        description: (error as Error).message
      })
      throw new Error((error as Error).message)
    }
  }

  return (
    <div className="edit-view">
      <div className="edit-main">
        <BackArrow
          onClick={() => navigate(paths_config.home)}
          text="Back to configurations list"
        />
        <div className="head">
          <div className="head-titles">
            <h1>{configurationInfo?.name} anonymization columns</h1>
            <div>Select column(s) and define method to apply.</div>
          </div>
          <Button onClick={() => downloadConfiguration(configurationInfo?.uuid)}>
            Download configuration
          </Button>
        </div>
        <RoundedFrame>
          <Table
            rowKey={"key"}
            dataSource={fileMetadata}
            columns={columns}
            pagination={false}
            rowSelection={rowSelection}
          />
        </RoundedFrame>
      </div>
      <EditMethodBox selectedRowKeys={selectedRowKeys} fileMetadata={fileMetadata} saveConfiguration={saveConfiguration} setSelectedRowKeys={setSelectedRowKeys} />
    </div>
  )
}

export default Edit
