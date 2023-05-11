import { Form, Input } from "antd"
import { BackArrow, Button, FileDrop, RoundedFrame } from "cosmian_ui"
import localForage from "localforage"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
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
    if (name && fileMetadata) {
      const uuid = uuidv4()
      await localForage.setItem(uuid, { metadata: fileMetadata, configurationInfo: { name, created_at: new Date().toLocaleString(), file: fileInfo?.name, uuid } })
      navigate(paths_config.edit, { state: { uuid } })
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
                { pattern: /[^\p{Zs}]/u, message: "Name should contain visible characters."},
              ]}
            >
            <Input placeholder="Configuration name" />
          </Form.Item>
        </Form>
      </div>
      <h2 className="h4">Upload your CSV sample</h2>
      <FileDrop
        fileType="csv"
        getFileInfo={(file) => getFileInfo(file)}
        getResult={(result) => parseFile(result.data[0])}
        updateFile={fileInfo} />
      </RoundedFrame><div className="buttons">
        <Button type="outline" onClick={() => resetFile()} disabled={fileMetadata === undefined || name === undefined}>Cancel</Button>
        <Button onClick={() => {
          saveFile()
        }} disabled={fileMetadata === undefined || name === undefined}>Create configuration</Button>
      </div>
    </div>
  )
}

export default Upload
