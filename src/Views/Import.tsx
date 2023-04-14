import { notification } from "antd"
import { Metadata } from "cloudproof_js"
import { BackArrow, Button, RoundedFrame } from "cosmian_ui"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import JSONReader from "../components/JSONReader"
import { paths_config } from "../config/paths"
import { ConfigurationInfo, FileInfo } from "../utils/utils"
import "./style.less"

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

  const getFileResult = (result: any): void => {
    setFileMetadata(result.metadata)
    setConfigurationInfo(result.configurationInfo)
  }

  const resetFile = (): void => {
    setFileInfo(undefined)
    setConfigurationInfo(undefined)
    setFileMetadata(undefined)
  }

  const saveFile = (): void => {
    const configurationName = configurationInfo?.name
    const configurationList: any[] = Object.keys(sessionStorage)
    const existing = configurationList.find((element) => element === configurationName)
    if (existing != null) {
      notification.error({
        duration: 3,
        message: "Import",
        description: "A configuration already exists with this name.",
      })
      resetFile()
    } else {
      if (configurationName && fileMetadata) {
        sessionStorage.setItem(configurationName, JSON.stringify({ metadata: fileMetadata, configurationInfo }))
        navigate(paths_config.edit, { state: { name: configurationName } })
      }
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
      <JSONReader getFileInfo={(file) => getFileInfo(file)} getResult={(result) => getFileResult(result as any)} updateFile={fileInfo} />
      </RoundedFrame><div className="buttons">
        <Button onClick={() => resetFile()} disabled={fileMetadata === undefined}>Cancel</Button>
        <Button onClick={() => {
          saveFile()
        }} disabled={fileMetadata === undefined}>Import configuration</Button>
      </div>
    </div>
  )
}

export default Import
