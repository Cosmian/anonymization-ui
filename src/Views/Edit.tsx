import { Table, Tag } from "antd"
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
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type: string) => {
      return <Tag>{type}</Tag>
    }
  },
  {
    title: "Example",
    dataIndex: "example",
    key: "example",
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
    render: (result: string | number ) => {
      if (result && result.toString().substring(0,5) === "Error") return <div style={{ color: "#e34319", fontStyle: "italic" }}>{ result }</div>
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
    await localForage.setItem(configUuid, { metadata: updatedFileMetaData, configurationInfo })
  }

  return (
    <div className="editView">
      <div className="editMain">
        <BackArrow
          onClick={() => navigate(paths_config.home)}
          text="Back to configurations list"
        />
        <div className="head">
          <h1>Edit methods</h1>
          <Button onClick={() => downloadConfiguration(configurationInfo?.uuid)}>Download configuration</Button>
        </div>
        <RoundedFrame>
          <h2 className="h4">{configurationInfo?.name} anonymization columns</h2>
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
