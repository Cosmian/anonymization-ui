import { Table, notification } from "antd"
import { Button, RoundedFrame } from "cosmian_ui"
import { useEffect, useState } from "react"
import { DeleteAnonymizationModal } from "../components/DeleteAnonymizationModal"
import { downloadAnonymization } from "../utils/utils"
import "./style.less"


const Anonymization = (): JSX.Element => {
  const [dataSetList, setDataSetList] = useState<{ key: number, name: string, created_at: string }[]>([])
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)
  const [anonymizationToDelete, setAnonymizationToDelete] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchDataSets = async (): Promise<void> => {
      const response = await fetch("http://localhost:8000/api/anonymizations")
      const response_json = await response.json()
      const data = JSON.parse(response_json.message)
      if (data) {
        setDataSetList(data)
      }
    }
    try {
      fetchDataSets()
    } catch (error) {
      notification.error({
        duration: 3,
        message: "Error fetching anonymized Dataset list",
        description: (error as Error).message
      })
      throw new Error((error as Error).message)
    }
  }, [anonymizationToDelete])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => {
        const index = name.indexOf("_")
        const parsedName = name.substring(index + 1)
        return parsedName
      }
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
      title: "Configuration hash",
      dataIndex: "name",
      key: "hash",
      render: (name: string) => {
        return name.split("_", 1)
      }
    },
    {
      title: "",
      key: "options",
      width: 100,
      render: (data: any) => {
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
          <div className="icons">
            <Button type="dark" onClick={(e) => handleDownload(e)}>Download</Button>
            <Button type="danger" className="icon" onClick={(e) => handleAnonymizationDelete(e)}>Delete</Button>
          </div>
        )
      },
    }
  ]


  const handleDelete = async (): Promise<void> => {
    if (anonymizationToDelete) {
      const response = await fetch(`http://localhost:8000/api/anonymizations/${anonymizationToDelete}`, {
        method: "DELETE",
      })
      if (response.ok) {
        notification.success({
          duration: 3,
          message: "Delete",
          description: "Anonymization successfully deleted from microservice.",
        })
        setDeleteModalVisible(false)
        setAnonymizationToDelete(undefined)
        return
      }
      notification.error({
        duration: 3,
        message: "Delete",
        description: "An error occured.",
      })
      setDeleteModalVisible(false)
      setAnonymizationToDelete(undefined)
    }
  }

  return (
    <div className="anonymization">
      <h1>Anonymized Dataset</h1>
      <RoundedFrame>
        <p className="h4">List of anonymized Datasets</p>
        <Table
          rowKey={"key"}
          dataSource={dataSetList}
          columns={columns}
          pagination={false}
        />
      </RoundedFrame>
      <DeleteAnonymizationModal
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onDelete={() => handleDelete()}
      />
    </div>
  )
}

export default Anonymization
