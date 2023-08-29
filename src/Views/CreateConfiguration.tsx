import { Form, Input, Select, Space, notification } from "antd"
import { BackArrow, Button, FileDrop, RoundedFrame } from "cosmian_ui"
import localForage from "localforage"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { paths_config } from "../config/paths"
import { DataType, FileInfo, MetaData } from "../utils/utils"

const CreateConfiguration = (): JSX.Element => {
  const [form] = Form.useForm()

  const navigate = useNavigate()
  const [fileInfo, setFileInfo] = useState<FileInfo | undefined>()
  const [fileMetadata, setFileMetadata] = useState<MetaData[] | undefined>(undefined)

  const name = Form.useWatch("name", form)

  const parseFile = (data: { [key: string]: string }): void => {
    const metadata: MetaData[] = []
    for (const [index, [key, value]] of Object.entries(Object.entries(data))) {
      let type: DataType
      if (!Number.isNaN(Number(value))) {
        const value_number = Number(value)
        if (Number.isInteger(value_number)) {
          type = DataType.Integer
        } else {
          type = DataType.Float
        }
      } else if (Date.parse(value as string)) {
        type = DataType.Date
      } else {
        type = DataType.Text
      }
      metadata.push({ key: index, name: key, type: type, example: value, method: undefined, methodOptions: undefined, result: undefined })
    }
    setFileMetadata(metadata)
  }

  const getFileInfo = (file: File): void => {
    setFileInfo({
      last_modified: file.lastModified,
      name: file.name,
      size: file.size,
      type: file.type,
    })
  }

  const resetFile = (): void => {
    setFileInfo(undefined)
    setFileMetadata(undefined)
  }

  const saveFile = async (): Promise<void> => {
    if (fileMetadata) {
      const uuid = uuidv4()
      const delimiter = form.getFieldValue("delimiter")
      try {
        await localForage.setItem(uuid, {
          metadata: fileMetadata,
          configurationInfo: { name, created_at: new Date().toLocaleString(), file: fileInfo?.name, uuid, delimiter },
        })
        navigate(paths_config.configuration + `/${uuid}`, { state: { statuss: "local" } })
      } catch (error) {
        notification.error({
          duration: 3,
          message: "Error saving configuration",
          description: (error as Error).message,
        })
        throw new Error((error as Error).message)
      }
    }
  }

  return (
    <div className="create">
      <BackArrow onClick={() => navigate(paths_config.configurationList)} text="Back to configurations list" />
      <h1>Create configuration file</h1>
      <RoundedFrame>
        <h2 className="h4">1. Configuration information</h2>
        <Form form={form} className="header" layout="vertical" style={{ width: "100%" }}>
          <Form.Item
            name="name"
            label="Name"
            className="name"
            rules={[
              { required: true, message: "Please provide a name." },
              { min: 3, message: "Name must be at least 3 characters long." },
              { pattern: /[^\p{Zs}]/u, message: "Name should contain visible characters." },
            ]}
          >
            <Input placeholder="Configuration name" />
          </Form.Item>
          <Form.Item name="delimiter" label="Delimiter" initialValue=";">
            <Select
              style={{ width: "70px", textAlign: "center" }}
              className="delimiter"
              options={[
                { value: ";", label: ";" },
                { value: ",", label: "," },
              ]}
            />
          </Form.Item>
        </Form>
        <h2 className="h4">Upload your CSV sample</h2>
        <FileDrop
          fileType="csv"
          getFileInfo={(file) => getFileInfo(file)}
          getResult={(result) => parseFile(result.data[0])}
          updateFile={fileInfo}
        />
      </RoundedFrame>
      <Space className="buttons">
        <Button type="outline" onClick={() => resetFile()} disabled={!fileMetadata || !name}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            saveFile()
          }}
          disabled={!fileMetadata || !name}
        >
          Create configuration
        </Button>
      </Space>
    </div>
  )
}

export default CreateConfiguration
