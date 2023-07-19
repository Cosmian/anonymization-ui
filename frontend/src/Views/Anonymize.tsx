import { Form, Select, Space, UploadProps, notification } from "antd"
import { RcFile } from "antd/lib/upload"
import Dragger from "antd/lib/upload/Dragger"
import { Button, RoundedFrame } from "cosmian_ui"
import { useContext, useEffect, useState } from "react"
import { IoCheckboxOutline, IoDownloadOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import AppContext from "../AppContext"
import { paths_config } from "../config/paths"
import { UploadedConfigurationInfo, encryptContent } from "../utils/utils"

const Anonymize = (): JSX.Element => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const context = useContext(AppContext)

  const [file, setFile] = useState<RcFile | undefined>()
  const fileList = file ? [file] : []
  const [configList, setConfigList] = useState<{ value: string; label: string }[]>([])
  const [loading, setLoading] = useState(false)

  const configuration = Form.useWatch("configuration", form)

  useEffect(() => {
    context?.checkMicroserviceHealth()
    const fetchConfigurations = async (): Promise<void> => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/configurations`)
      const data: { [key: string]: UploadedConfigurationInfo } = await response.json()
      const configurations: { value: string; label: string }[] = Object.keys(data).map((key: string) => {
        const configuration = data[key]
        return {
          value: key,
          label: configuration.name + " - " + configuration.hash.substring(0, 9),
        }
      })
      if (configurations) {
        setConfigList(configurations)
      }
    }
    fetchConfigurations()
  }, [])

  const uploadProps: UploadProps = {
    name: "file",
    accept: ".csv",
    multiple: false,
    maxCount: 1,
    fileList: fileList,
    beforeUpload: async (file) => {
      setFile(file)
      return false
    },
    onRemove() {
      setFile(undefined)
    },
  }

  const resetForm = (): void => {
    setFile(undefined)
    form.setFieldValue("configuration", undefined)
  }

  const readFileContentAsync = (file: Blob): Promise<string | Uint8Array> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = function (event) {
        if (event && event.target && event.target.result) {
          const fileContent = event.target.result
          if (typeof fileContent === "string") {
            resolve(fileContent)
          } else {
            resolve(fileContent as Uint8Array)
          }
        } else {
          reject(new Error("Error with file content."))
        }
      }
      reader.onerror = function () {
        reject(new Error("Error reading the file."))
      }
      reader.readAsText(file)
    })
  }

  const anonymizeFile = async (): Promise<void> => {
    if (file && context && context.enclaveKey) {
      const content = await readFileContentAsync(file as Blob)
      const encryptedContent = await encryptContent(content, context.enclaveKey)
      const dataFile = new Blob([encryptedContent], { type: "text/csv" })
      const formData = new FormData()
      formData.append("file", dataFile, file.name)
      const configurationId = form.getFieldValue("configuration")
      const response = await fetch(`${import.meta.env.VITE_API_URL}/anonymize/${configurationId}`, {
        method: "POST",
        body: formData,
      })
      const responseContent = await response.text()
      if (response.ok && responseContent) {
        notification.success({
          duration: 3,
          message: "Anonymization",
          description: responseContent,
        })
        setLoading(false)
        navigate(paths_config.anonymizationList)
        return
      }
      setLoading(false)
      notification.error({
        duration: 3,
        message: "Anonymization",
        description: responseContent,
      })
    }
  }

  return (
    <div className="anonymize">
      <h1>Anonymize data</h1>
      <RoundedFrame>
        <h2 className="h4">1. Select Uploaded Configuration</h2>
        <Form form={form}>
          <Form.Item name="configuration">
            <Select options={configList} />
          </Form.Item>
        </Form>
        <h2 className="h4 title">2. Select your dataset (CSV file)</h2>
        <Dragger {...uploadProps}>
          {fileList.length === 0 ? (
            <>
              <IoDownloadOutline />
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">File must be a csv file</p>
            </>
          ) : (
            <>
              <IoCheckboxOutline />
              <p className="ant-upload-text">File successfully uploaded</p>
            </>
          )}
        </Dragger>
      </RoundedFrame>
      <Space className="buttons">
        <Button type="outline" onClick={() => resetForm()} disabled={!file || !configuration}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            setLoading(true)
            anonymizeFile()
          }}
          disabled={!file || !configuration}
          loading={loading}
        >
          Send to anonymize
        </Button>
      </Space>
    </div>
  )
}

export default Anonymize
