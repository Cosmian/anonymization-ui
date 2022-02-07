import ExceptionOutlined from "@ant-design/icons/lib/icons/ExceptionOutlined"
import FileAddOutlined from "@ant-design/icons/lib/icons/FileAddOutlined"
import FileDoneOutlined from "@ant-design/icons/lib/icons/FileDoneOutlined"
import FileTextOutlined from "@ant-design/icons/lib/icons/FileTextOutlined"
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined"
import { parse, ParseResult } from "papaparse"
import React, { FC, useEffect, useState } from "react"
import { FileInfo } from "../../../redux/reducers/ciphercompute/anonymization/types"
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
  updateFile?: FileInfo
}

const CSVReader: FC<CSVReaderProps> = ({ getResult, getFileInfo, updateFile }): JSX.Element => {
  const [hightLighted, setHightLigted] = useState(false)
  const [wrongFile, setWrongfile] = useState(false)
  const [onProcess, setOnProcess] = useState(false)
  const [fileInfos, setFileInfo] = useState({} as File)

  useEffect(() => {
    if (updateFile != null) {
      setFileInfo({ ...fileInfos, name: updateFile.name })
    }
  }, [updateFile])

  // Drag n drop file
  const handleOnDrop = (e: React.DragEvent): void => {
    e.preventDefault()
    setHightLigted(false)
    setOnProcess(true)
    setFileInfo(e.dataTransfer.files[0])
    getFileInfo(e.dataTransfer.files[0])
    if (e.dataTransfer.files[0].type !== TEXT_CSV) {
      setOnProcess(false)
      setWrongfile(true)
    }
    Array.from(e.dataTransfer.files)
      .filter((file: File) => file.type === TEXT_CSV)
      .forEach(async (file) => {
        const text = await file.text()
        const result = parse(text, { header: true })
        getResult(result)
        setOnProcess(false)
      })
  }
  const handleOnDragOver = (e: React.DragEvent): void => {
    e.preventDefault()
    setWrongfile(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (e: any): void => {
    e.preventDefault()
    setHightLigted(false)
    setOnProcess(true)
    setFileInfo(e.target.files[0] as File)
    getFileInfo(e.target.files[0])
    if (e.target.files[0].type !== TEXT_CSV) {
      setOnProcess(false)
      setWrongfile(true)
    }
    Array.from(e.target.files as FileList)
      .filter((file: File) => file.type === TEXT_CSV)
      .forEach(async (file) => {
        const text = await (file as File).text()
        const result = parse(text, { header: true })
        getResult(result)
        setOnProcess(false)
      })
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
          {hightLighted ? <FileAddOutlined style={{ fontSize: 34 }} /> : <FileTextOutlined style={{ fontSize: 24 }} />}
          <p>
            Drag and drop your .csv file here <br />
            or <label htmlFor="file_input">click here</label> to import file <br />
            <input id="file_input" type="file" onInput={(e) => handleSelect(e)} accept={TEXT_CSV} />
          </p>
        </>
      )}
      {/* Loading (on process) */}
      {onProcess && <LoadingOutlined style={{ fontSize: 34 }} spin />}

      {/* Valid */}
      {fileInfos.name != null && (
        <>
          <FileDoneOutlined style={{ fontSize: 34, color: "#219653", marginBottom: 10 }} />
          <p>{fileInfos.name}</p>
        </>
      )}

      {/* Error */}
      {wrongFile && (
        <>
          <ExceptionOutlined style={{ fontSize: 34 }} />
          <p>Only support .csv file. Please check your file type</p>
        </>
      )}
    </div>
  )
}

export default CSVReader
