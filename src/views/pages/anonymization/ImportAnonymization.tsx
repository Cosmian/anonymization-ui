import { CaretRightOutlined, CheckCircleOutlined } from "@ant-design/icons"
import { Button, Collapse, message, Skeleton, Space } from "antd"
import React, { useEffect, useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import { useNavigate } from "react-router-dom"
import { errorMessage } from "../../../actions/messages/messages"
import { link_config } from "../../../configs/paths"
import {
  addAnonymization,
  cleanAnonymizationDetails,
  getAnonymizations,
  getOneAnonymization,
  updateAnonymization,
} from "../../../redux/actions/ciphercompute/anonymization"
import { Anonymization, FileInfo } from "../../../redux/reducers/ciphercompute/anonymization/types"
import { RootState } from "../../../redux/reducers/RootReducer"
import BackArrow from "../../../stories/cosmian/BackArrow/BackArrow"
import JSONReader from "../../../stories/cosmian/JSONReader/JSONReader"
import PageTitle from "../../../stories/cosmian/PageTitle/PageTitle"
import { Content } from "../layout/LayoutItems"
import "./createAnonymization.less"

const { Panel } = Collapse

const mapDispatchToProps = {
  addAnonymization,
  getAnonymizations,
  updateAnonymization,
  cleanAnonymizationDetails,
  getOneAnonymization,
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: RootState) => {
  return {
    anonymizationList: state.ciphercompute.anonymizations.anonymizations,
  }
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type ImportAnonymizationProps = PropsFromRedux

const ImportAnonymization: React.FC<ImportAnonymizationProps> = ({
  addAnonymization,
  getAnonymizations,
  updateAnonymization,
  cleanAnonymizationDetails,

  anonymizationList,
}) => {
  const [fileConfig, setFileConfig] = useState<Anonymization | undefined>()
  const [fileInfo, setFileInfo] = useState<FileInfo | undefined>()
  const [anonymizationToUpdate, setAnonymizationToUpdate] = useState<Anonymization | undefined>()
  const navigate = useNavigate()

  useEffect(() => {
    getAnonymizations()
    cleanAnonymizationDetails()
    return () => cleanAnonymizationDetails()
  }, [])

  const handleOnCancel = (): void => {
    cleanAnonymizationDetails()
    navigate(link_config.anonymizations)
  }

  const genExtra = (isOK: boolean): JSX.Element => (
    <CheckCircleOutlined
      onClick={(event) => {
        event.stopPropagation()
      }}
      style={isOK ? { color: "green" } : { color: "inherit" }}
    />
  )
  const getFileInfo = (file: File): void => {
    setFileInfo({
      last_modified: file.lastModified,
      name: file.name,
      size: file.size,
      type: file.type,
    })
  }

  const getFileResult = (result: Anonymization): void => {
    // TODO check if result object is type of Anonymization
    // try validation format with JOY or YUP
    setFileConfig(result as Anonymization)
    const existing = anonymizationList.find((el) => el.uuid === result.uuid)
    if (existing != null) {
      setAnonymizationToUpdate(existing)
    } else {
      setAnonymizationToUpdate(undefined)
    }
  }

  const createNewAnonymization = async (): Promise<void> => {
    if (fileConfig != null && anonymizationToUpdate == null) {
      const hide = message.loading("Adding new anonymization", 0)
      try {
        const response = await addAnonymization(fileConfig)
        navigate(`${link_config.anonymizations}/${response.uuid}/edit`)
      } catch (error) {
        errorMessage(error)
      } finally {
        hide()
      }
    } else if (fileConfig != null && anonymizationToUpdate != null) {
      const hide = message.loading("Update anonymization", 0)
      try {
        const response = await updateAnonymization(fileConfig)
        navigate(`${link_config.anonymizations}/${response.uuid}/edit`)
      } catch (error) {
        errorMessage(error)
      } finally {
        hide()
      }
    }
  }

  // JSX
  if (anonymizationList == null) {
    return <Skeleton />
  }
  return (
    <>
      <PageTitle title="Anonymization" subtitle="Import anonymization file."></PageTitle>
      <BackArrow text="Back to anonymizations list" url={link_config.anonymizations} />
      <Content>
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className="custom-collapse"
        >
          <Panel header="Import JSON config file" key="1" className="custom-panel" showArrow={false} extra={genExtra(fileConfig != null)}>
            <JSONReader getFileInfo={(file) => getFileInfo(file)} getResult={(result) => getFileResult(result as Anonymization)} />
            {anonymizationToUpdate != null && (
              <p>
                This file {fileInfo?.name} will replace existing <span className="strong">{anonymizationToUpdate.name}</span> anonymization{" "}
              </p>
            )}
          </Panel>
        </Collapse>

        <Space style={{ justifyContent: "flex-end", width: "100%", marginTop: 30 }}>
          <Button size="large" type="default" onClick={handleOnCancel}>
            Cancel
          </Button>
          <Button size="large" type="primary" onClick={createNewAnonymization} disabled={fileConfig == null}>
            Create anonymization
          </Button>
        </Space>
      </Content>
    </>
  )
}

export default connector(ImportAnonymization)
