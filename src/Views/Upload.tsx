import { Form, Input } from "antd"
import { BackArrow, Button, RoundedFrame } from "cosmian_ui"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CSVReader from "../components/CSVReader"
import { paths_config } from "../config/paths"
import { DataType, FileInfo, MetaData } from "../utils/utils"
import "./style.less"

const Upload = (): JSX.Element => {
  const navigate = useNavigate()
  const [fileInfo, setFileInfo] = useState<FileInfo | undefined>()
  const [name, setName] = useState<undefined | string>(undefined)
  const [fileMetadata, setFileMetadata] = useState<MetaData[] | undefined>(undefined)
  const [form] = Form.useForm()

  const parseFile = (data: { [key: string]: string; }): void => {
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
      } else if (value === "False" || value === "True") {
        type = DataType.Boolean
      } else if (Date.parse(value as string)) {
        type = DataType.Date
      } else {
        type = DataType.Text
      }
      metadata.push({ key: index, name: key, type: type, example: value, technique: undefined, techniqueOptions: undefined, result: undefined })
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

  const saveFile = (): void => {
    if (name && fileMetadata) {
      const fileName = fileInfo?.name
      sessionStorage.setItem(name, JSON.stringify({ metadata: fileMetadata, configurationInfo: { name, created_at: new Date(), file: fileName } }))
      navigate(paths_config.edit, { state: { name } })
    }
  }

  return (
    <div className="create">
      <BackArrow
        onClick={() => navigate(paths_config.home)}
        text="Back to configurations list"
      />
      <h1>Create configuration file</h1>
      <RoundedFrame>
      <div className="name">
          <Form layout="vertical" form={form} onValuesChange={() => setName(form.getFieldValue("name"))}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please provide a name." },
                { min: 3, message: "Name must be at least 3 characters long." },
                { pattern: /^[^\s]*$/, message: "Name should contain visible characters." },
                { validator: async (_rule, name) => {
                    const existName = Object.keys(sessionStorage).find((key) => key === name.trim())
                    if (existName) {
                      return Promise.reject(new Error("This configuration name already exists"))
                    }
                  },
                },
              ]}
            >
            <Input placeholder="Configuration name" />
          </Form.Item>
        </Form>
      </div>
      <h2 className="h4">Upload your CSV sample</h2>
      <CSVReader
        getFileInfo={(file) => getFileInfo(file)}
        getResult={(result) => parseFile(result.data[0])}
        updateFile={fileInfo} />
      </RoundedFrame><div className="buttons">
        <Button onClick={() => resetFile()} disabled={fileMetadata === undefined || name === undefined}>Cancel</Button>
        <Button onClick={() => {
          saveFile()
        }} disabled={fileMetadata === undefined || name === undefined}>Create configuration</Button>
      </div>
    </div>
  )
}

export default Upload
