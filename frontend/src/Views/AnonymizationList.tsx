import { Space, Table, notification } from "antd"
import { Button, RoundedFrame } from "cosmian_ui"
import { useContext, useEffect, useState } from "react"
import AppContext from "../AppContext"
import { DeleteAnonymizationModal } from "../components/DeleteAnonymizationModal"
import { AnonymizationType, downloadAnonymization } from "../utils/utils"

const AnonymizationList = (): JSX.Element => {
  const [dataSetList, setDataSetList] = useState<{ key: number; name: string; created_at: string }[]>([])
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)
  const [anonymizationToDelete, setAnonymizationToDelete] = useState<string | undefined>(undefined)
  const context = useContext(AppContext)

  useEffect(() => {
    context?.checkMicroserviceHealth()
    const fetchDataSets = async (): Promise<void> => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/anonymizations`)
      const data = await response.json()
      if (data) {
        setDataSetList(data)
      }
    }
    fetchDataSets().catch((error) => {
      notification.error({
        duration: 3,
        message: "Error fetching anonymized Dataset list",
        description: (error as Error).message,
      })
      console.log(error)
    })
  }, [anonymizationToDelete])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => {
        const index = name.indexOf("_", name.indexOf("_") + 1)
        return name.substring(index + 1)
      },
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
      title: "Configuration hash",
      dataIndex: "name",
      key: "hash",
      render: (name: string) => {
        return name.split("_", 1)
      },
    },
    {
      title: "",
      key: "options",
      width: 100,
      render: (data: AnonymizationType) => {
        const handleDownload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
          e.stopPropagation()
          downloadAnonymization(data.name)
        }

        const handleAnonymizationDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
          e.stopPropagation()
          setDeleteModalVisible(true)
          setAnonymizationToDelete(data.name)
        }

        return (
          <Space>
            <Button type="dark" onClick={(e) => handleDownload(e)}>
              Download
            </Button>
            <Button type="danger" onClick={(e) => handleAnonymizationDelete(e)}>
              Delete
            </Button>
          </Space>
        )
      },
    },
  ]

  const handleDelete = async (): Promise<void> => {
    if (anonymizationToDelete) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/anonymizations/${anonymizationToDelete}`, {
        method: "DELETE",
      })
      const responseContent = await response.text()
      if (response.ok) {
        notification.success({
          duration: 3,
          message: "Delete",
          description: responseContent,
        })
        setDeleteModalVisible(false)
        setAnonymizationToDelete(undefined)
        return
      }
      notification.error({
        duration: 3,
        message: "Delete",
        description: responseContent,
      })
      setDeleteModalVisible(false)
      setAnonymizationToDelete(undefined)
    }
  }

  return (
    <div className="anonymization">
      <h1>Anonymized datasets</h1>
      <RoundedFrame>
        <p className="h4">List of anonymized Datasets</p>
        <Table rowKey={"key"} dataSource={dataSetList} columns={columns} pagination={false} />
      </RoundedFrame>
      <DeleteAnonymizationModal
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onDelete={() => handleDelete()}
      />
    </div>
  )
}

export default AnonymizationList
