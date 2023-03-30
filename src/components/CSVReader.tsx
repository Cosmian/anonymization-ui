import ExceptionOutlined from "@ant-design/icons/lib/icons/ExceptionOutlined"
import FileAddOutlined from "@ant-design/icons/lib/icons/FileAddOutlined"
import FileDoneOutlined from "@ant-design/icons/lib/icons/FileDoneOutlined"
import FileTextOutlined from "@ant-design/icons/lib/icons/FileTextOutlined"
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined"
import { message, notification } from "antd"
import { ParseResult, parse } from "papaparse"
import React, { FC, useEffect, useState } from "react"
// import csvValidation from "../../../actions/anonymizations/csvValidation"
// import { FileInfo } from "../../../redux/reducers/ciphercompute/anonymization/types"
import "./csv-reader.less"

const TEXT_CSV = "text/csv"

export type CSVReaderProps = {
  /**
   * Get File meta
   */
  getFileInfo: (file: File) => void
  /**
   * Get parsed result
   */
  getResult: (result: ParseResult<unknown>) => void
  /**
   * In case of an update, pass your update file
   */
  // updateFile?: FileInfo
  updateFile?: any
}

const CSVReader: FC<CSVReaderProps> = ({ getResult, getFileInfo, updateFile }): JSX.Element => {
  const [hightLighted, setHightLigted] = useState(false)
  const [wrongFile, setWrongfile] = useState(false)
  const [onProcess, setOnProcess] = useState(false)
  const [fileInfos, setFileInfo] = useState({} as File)

  useEffect(() => {
    if (updateFile != null) {
      setFileInfo({ ...fileInfos, name: updateFile.name })
    } else {
      setFileInfo({} as File)
    }
  }, [updateFile])

  // Drag n drop file
  const handleOnDrop = (e: React.DragEvent): void => {
    e.preventDefault()
    const fileList = e.dataTransfer.files
    parseCSVFile(fileList as FileList)
  }
  // Selected file
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (e: any): void => {
    e.preventDefault()
    const fileList = e.target.files
    parseCSVFile(fileList as FileList)
  }

  const parseCSVFile = (csvFile: FileList): void => {
    setHightLigted(false)
    setOnProcess(true)
    setFileInfo(csvFile[0] as File)
    getFileInfo(csvFile[0])
    if (csvFile[0].type !== TEXT_CSV) {
      setOnProcess(false)
      setWrongfile(true)
      setFileInfo({} as File)
    } else {
      Array.from(csvFile)
        .filter((file) => file.type === TEXT_CSV)
        .forEach(async (file) => {
          const text = await file.text()
          const result = parse(text, { header: true })
          // verify
          // const validation = await csvValidation(result)
          // if (validation.error) {
          //   handleCsvError(validation.error)
          //   return
          // }
          message.success(`Your file ${fileInfos.name} has been successfully imported`)
          getResult(result)
          setOnProcess(false)
        })
    }
  }

  const handleCsvError = (err: string): void => {
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
    <>
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
              Drag and drop your .csv file here <br />
              or <label htmlFor="file_input">click here</label> to import a file <br />
              <input id="file_input" type="file" onInput={(e) => handleSelect(e)} accept={TEXT_CSV} />
            </p>
          </>
        )}
        {/* Loading (on process) */}
        {onProcess && !wrongFile && <LoadingOutlined spin />}

        {/* Valid */}
        {fileInfos.name != null && !wrongFile && (
          <>
            <FileDoneOutlined style={{ fontSize: 34, color: "#219653", marginBottom: 10 }} />
            <p>{fileInfos.name}</p>
          </>
        )}

        {/* Error */}
        {wrongFile && (
          <>
            <ExceptionOutlined />
            <p>Only support .csv file. Please check your file type.</p>
          </>
        )}
      </div>
      <div style={{ marginTop: ".25em" }}>Your file must have a .csv extension. The delimiter can be a comma or a semicolon.</div>
    </>
  )
}

export default CSVReader
