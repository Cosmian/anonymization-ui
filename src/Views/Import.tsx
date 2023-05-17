import { notification } from "antd"
import { Metadata } from "cloudproof_js"
import { BackArrow, Button, FileDrop, RoundedFrame } from "cosmian_ui"
import localForage from "localforage"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { paths_config } from "../config/paths"
import { ConfigurationInfo, FileInfo } from "../utils/utils"
import "./style.less"

type fileResult = { metadata: Metadata[], configurationInfo: ConfigurationInfo }

const Import = (): JSX.Element => {
  const navigate = useNavigate()
  const [configurationInfo, setConfigurationInfo] = useState<ConfigurationInfo | undefined>()
  const [fileInfo, setFileInfo] = useState<FileInfo | undefined>()
  const [fileMetadata, setFileMetadata] = useState<Metadata[] | undefined>()

  const getFileInfo = (file: File): void => {
    setFileInfo({
      last_modified: file.lastModified,
      name: file.name,
      size: file.size,
      type: file.type,
    })
  }

  const getFileResult = (result: fileResult): void => {
    if (result.metadata && result.configurationInfo) {
      setFileMetadata(result.metadata)
      setConfigurationInfo(result.configurationInfo)
    } else {
      notification.error({
        duration: 4,
        message: "Import",
        description: "Error importing this JSON: is not a configuration.",
      })
      resetFile()
    }
  }

  const resetFile = (): void => {
    setFileInfo(undefined)
    setConfigurationInfo(undefined)
    setFileMetadata(undefined)
  }

  const saveFile = async (): Promise<void> => {
    if (fileMetadata) {
      const uuid = uuidv4()
      await localForage.setItem(uuid, { metadata: fileMetadata, configurationInfo: {...configurationInfo, uuid } })
      navigate(paths_config.edit, { state: { uuid } })
    }
  }

  return (
    <div className="create">
      <BackArrow
        onClick={() => navigate(paths_config.home)}
        text="Back to configurations list"
      />
      <h1>Import configuration file</h1>
      <RoundedFrame>
        <h2 className="h4">Upload your JSON file</h2>
        <FileDrop fileType="json" getFileInfo={(file) => getFileInfo(file)} getResult={(result) => getFileResult(result as fileResult)} updateFile={fileInfo} />
      </RoundedFrame>
      <div className="buttons">
        <Button type="outline" onClick={() => resetFile()} disabled={!fileMetadata}>Cancel</Button>
        <Button onClick={() => saveFile()} disabled={!fileMetadata}>Import configuration</Button>
      </div>
    </div>
  )
}

export default Import
