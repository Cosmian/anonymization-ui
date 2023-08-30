import { CheckCircleOutlined, ToolOutlined } from "@ant-design/icons"
import { Space, Table, notification } from "antd"
import { Button, RoundedFrame } from "cosmian_ui"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../AppContext"
import { paths_config } from "../config/paths"
import { Status, UploadedConfigurationInfo } from "../utils/utils"

const FineTuningList = (): JSX.Element => {
  const navigate = useNavigate()
  const context = useContext(AppContext)
  const [configList, setConfigList] = useState<UploadedConfigurationInfo[]>([])

  useEffect(() => {
    context?.checkMicroserviceHealth()
    const fetchConfigurations = async (): Promise<void> => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/configurations`, {
        credentials: "include",
      })
      const data = await response.json()
      if (data) {
        const keys = Object.keys(data)
        const configurations: UploadedConfigurationInfo[] = keys.reduce((acc: UploadedConfigurationInfo[], key) => {
          const configuration: UploadedConfigurationInfo = {
            uuid: key,
            name: data[key].name,
            created_at: data[key].created_at,
            hash: data[key].hash,
            status: data[key].status,
          }
          return [...acc, configuration]
        }, [])
        configurations.sort(
          (a: UploadedConfigurationInfo, b: UploadedConfigurationInfo): number =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        setConfigList(configurations)
      }
    }
    fetchConfigurations().catch(() => {
      notification.error({
        duration: 3,
        message: "Error fetching configuration list",
      })
    })
  }, [])

  const configColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Creation date",
      dataIndex: "created_at",
      key: "created_at",
      render: (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleString()
      },
    },
    {
      title: "Hash",
      dataIndex: "hash",
      key: "hash",
      render: (hash: string) => {
        return hash.substring(0, 9)
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Status) => {
        switch (status) {
          case "open":
            return (
              <div className="pending">
                <ToolOutlined />
                <span className="status">Fine-tuning pending</span>
              </div>
            )
          case "closed":
            return (
              <div className="finalized">
                <CheckCircleOutlined />
                <span className="status">Finalized</span>
              </div>
            )
          case "finetuned":
            return (
              <div className="finalized">
                <CheckCircleOutlined />
                <span className="status">Fine-tuned</span>
              </div>
            )
        }
      },
    },
    {
      title: "",
      key: "options",
      width: 100,
      render: (configuration: UploadedConfigurationInfo) => {
        const closed = configuration.status === "closed"
        const handleSelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
          e.stopPropagation()
          navigate(paths_config.configuration + `/${configuration.uuid}`, { state: { status: closed ? "closed" : "open" } })
        }

        return (
          <Space className="optionButtons">
            {closed ? (
              <Button type="dark" onClick={(e) => handleSelect(e)}>
                Details
              </Button>
            ) : (
              <Button type="primary" onClick={(e) => handleSelect(e)}>
                Edit
              </Button>
            )}
          </Space>
        )
      },
    },
  ]

  return (
    <div className="finetuning">
      <h1>Fine-tune Configuration</h1>
      <RoundedFrame>
        <h2 className="h4">Uploaded configurations</h2>
        <p>List of configurations uploaded on your Microservice Encryption server. You can fine-tune these configurations when needed.</p>
        <Table rowKey={"uuid"} dataSource={configList} columns={configColumns} pagination={false} />
      </RoundedFrame>
    </div>
  )
}

export default FineTuningList
