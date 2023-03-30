import { BackArrow, Button, RoundedFrame } from "cosmian_ui"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import JSONReader from "../components/JSONReader"
import { paths_config } from "../config/paths"
import "./style.less"

const Import = (): JSX.Element => {
  const navigate = useNavigate()
  const [configurationInfo, setConfigurationInfo] = useState<any | undefined>()
  const [fileConfig, setFileConfig] = useState<any | undefined>()
  const [fileMetadata, setFileMetadata] = useState<any | undefined>()

  const getFileInfo = (file: File): void => {
    setConfigurationInfo({
      last_modified: file.lastModified,
      name: file.name,
      size: file.size,
      type: file.type,
    })
  }

  const getFileResult = (result: any): void => {
    setFileConfig(result as any)
    const configurationList: any[] = []
    const existing = configurationList.find((el) => el.uuid === result.uuid)
    if (existing != null) {
      setFileMetadata(existing)
    } else {
      setFileMetadata(undefined)
    }
  }


  const resetFile = (): void => {

  }

  const saveFile = (): void => {
    navigate(paths_config.home)
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
      <JSONReader getFileInfo={(file) => getFileInfo(file)} getResult={(result) => getFileResult(result as any)} />
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
