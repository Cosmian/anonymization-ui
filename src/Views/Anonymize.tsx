import { Form, Select, UploadProps, notification } from "antd"
import { RcFile } from "antd/lib/upload"
import Dragger from "antd/lib/upload/Dragger"
import { Button, RoundedFrame } from "cosmian_ui"
import { useEffect, useState } from "react"
import { IoDownloadOutline } from "react-icons/io5"
import { ConfigurationInfo } from "../utils/utils"
import "./style.less"


const Anonymize = (): JSX.Element => {
  const [form] = Form.useForm()

  const [file, setFile] = useState<RcFile | undefined>()
  const fileList = file ? [file] : []
  const [configList, setConfigList] = useState<{ value: string, label: string }[]>([])

  const configuration = Form.useWatch("configuration", form)

  useEffect(() => {
    const fetchConfigurations = async (): Promise<void> => {
      const response = await fetch("http://127.0.0.1:5000/configurations")
      const data: { [key: string] : ConfigurationInfo } = await response.json()
      const configurations: { value: string, label: string }[] = Object.keys(data).map((key: string) => {
        const configuration = data[key]
          return {
            value: key, label: configuration.name
          }
      })
      if (configurations) {
        setConfigList(configurations)
      }
    }
    fetchConfigurations()
  }, [])

  const props: UploadProps = {
    name: "file",
    accept: ".csv",
    multiple: false,
    maxCount: 1,
    fileList: fileList,
    beforeUpload: async (file) => {
      setFile(file)
      return false
    },
    onChange(info) {
      const { status } = info.file
      if (status === "done") {
        notification.success({
          duration: 3,
          message: "Upload",
          description: "File successfully uploaded.",
        })
      } else if (status === "error") {
        notification.error({
          duration: 3,
          message: "Upload",
          description: "File error on upload.",
        })
      }
    },
    onRemove() {
      setFile(undefined)
    },
  }

  const resetForm = (): void => {
    setFile(undefined)
    form.setFieldValue("configuration", undefined)
  }

  const anonymizeFile = async (): Promise<void> => {
    if (file) {
      const formData = new FormData()
      formData.append("file", file)
      const configurationId = form.getFieldValue("configuration")
      const response = await fetch(`http://127.0.0.1:5000/${configurationId}`, {
        method: "POST",
        body: formData
      })
      if (response.ok) {
        const res = await response.text()
        const link = document.createElement("a")
        const blob = new Blob([res], { type: "text/csv" })
        link.href = URL.createObjectURL(blob)
        link.download = "anonymized-file"
        link.click()
        resetForm()
        return
      }
    }
    notification.error({
      duration: 3,
      message: "Download",
      description: "File error on anonymization.",
    })
  }

  return (
    <div className="anonymize">
      <h1>Anonymize data</h1>
      <RoundedFrame>
        <h2 className="h4">1. Select Configuration</h2>
        <Form form={form}>
          <Form.Item name="configuration">
            <Select
              options={configList}
            />
          </Form.Item>
        </Form>
        <h2 className="h4 title">2. Select your dataset (CSV file)</h2>
        <Dragger {...props}>
          <IoDownloadOutline />
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            File must be a csv file
          </p>
        </Dragger>
      </RoundedFrame><div className="buttons">
        <Button type="outline" onClick={() => resetForm()} disabled={!file || !configuration}>Cancel</Button>
        <Button onClick={() => {
          anonymizeFile()
        }} disabled={!file || !configuration}>Anonymize CSV</Button>
      </div>
    </div>
  )
}

export default Anonymize
