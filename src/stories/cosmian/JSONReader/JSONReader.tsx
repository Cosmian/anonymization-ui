import ExceptionOutlined from "@ant-design/icons/lib/icons/ExceptionOutlined"
import FileAddOutlined from "@ant-design/icons/lib/icons/FileAddOutlined"
import FileDoneOutlined from "@ant-design/icons/lib/icons/FileDoneOutlined"
import FileTextOutlined from "@ant-design/icons/lib/icons/FileTextOutlined"
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined"
import { message, notification } from "antd"
import React, { FC, useState } from "react"
import jsonValidation from "../../../actions/anonymizations/schemaValidation"
import "../CSVReader/csv-reader.less"

const APP_JSON = "application/json"

export type JSONReaderProps = {
  /**
   * Get File meta
   */
  getFileInfo: (file: File) => void
  /**
   * Get parsed result
   */
  getResult: (result: unknown) => void
}

const JSONReader: FC<JSONReaderProps> = ({ getResult, getFileInfo }): JSX.Element => {
  const [hightLighted, setHightLigted] = useState(false)
  const [wrongFile, setWrongfile] = useState(false)
  const [onProcess, setOnProcess] = useState(false)
  const [fileInfos, setFileInfo] = useState({} as File)

  // Drag n drop file
  const handleOnDrop = (e: React.DragEvent): void => {
    e.preventDefault()
    const myFile = e.dataTransfer.files[0]
    parseJsonFile(myFile)
  }

  // Selected file
  const handleSelect = (event: React.FormEvent<HTMLInputElement>): void => {
    event.preventDefault()
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length) {
      const myFile = target.files[0]
      parseJsonFile(myFile)
    } else {
      setWrongfile(true)
    }
  }

  const parseJsonFile = (jsonFile: File): void => {
    setHightLigted(false)
    setOnProcess(true)
    setFileInfo(jsonFile)
    getFileInfo(jsonFile)
    if (jsonFile.type !== APP_JSON) {
      setOnProcess(false)
      setWrongfile(true)
      setFileInfo({} as File)
    } else {
      const fileread = new FileReader()
      fileread.onload = async function (e) {
        const result = JSON.parse(e.target?.result as string) // parse json
        // verify
        const validation = await jsonValidation(result)
        if (validation.error) {
          handleJsonError(validation.error)
          return
        }
        message.success(`Your file ${jsonFile.name} has been successfully imported`)
        getResult(result)
        setOnProcess(false)
      }
      fileread.readAsText(jsonFile)
    }
  }

  const handleJsonError = (err: string): void => {
    setWrongfile(false)
    setOnProcess(false)
    setFileInfo({} as File)
    notification.error({
      message: `error with ${fileInfos.name ? fileInfos.name : "your file"}`,
      description: err,
      duration: 0,
    })
  }

  const handleOnDragOver = (e: React.DragEvent): void => {
    e.preventDefault()
    setWrongfile(false)
  }

  return (
    <div
      className={`csv-dropzone ${hightLighted ? "hover" : ""} ${wrongFile ? "error" : ""}`}
      onDragEnter={() => setHightLigted(true)}
      onDragLeave={() => setHightLigted(false)}
      onDragOver={(e) => {
        handleOnDragOver(e)
        handleOnDragOver(e)
      }}
      onDrop={(e) => handleOnDrop(e)}
    >
      {/* Default */}
      {!onProcess && !wrongFile && fileInfos.name == null && (
        <>
          {hightLighted ? <FileAddOutlined /> : <FileTextOutlined />}
          <p>
            Drag and drop your JSON configuration file here <br />
            or <label htmlFor="file_input">click here</label> to import file <br />
            <input id="file_input" type="file" onInput={(event) => handleSelect(event)} accept={APP_JSON} />
          </p>
        </>
      )}
      {/* Loading (on process) */}
      {onProcess && !wrongFile && <LoadingOutlined spin />}

      {/* Valid */}
      {fileInfos.name != null && !wrongFile && (
        <>
          <FileDoneOutlined style={{ color: "#219653" }} />
          <p>{fileInfos.name}</p>
        </>
      )}

      {/* Error */}
      {wrongFile && (
        <>
          <ExceptionOutlined style={{ fontSize: 34 }} />
          <p>Only support .json file. Please check your file type</p>
        </>
      )}
    </div>
  )
}

export default JSONReader
