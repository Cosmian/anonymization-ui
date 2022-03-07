import { CaretRightOutlined, CheckCircleOutlined } from "@ant-design/icons"
import { Button, Collapse, Form, Input, message, Skeleton, Space, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { errorMessage } from "../../../actions/messages/messages"
import csvFile from "../../../assets/files/metadata_example.csv"
import { link_config } from "../../../configs/paths"
import {
  addAnonymization,
  cleanAnonymizationDetails,
  getOneAnonymization,
  updateAnonymization,
} from "../../../redux/actions/ciphercompute/anonymization"
import { Anonymization, DataType, FileInfo, Metadata, Technique } from "../../../redux/reducers/ciphercompute/anonymization/types"
import { RootState } from "../../../redux/reducers/RootReducer"
import BackArrow from "../../../stories/cosmian/BackArrow/BackArrow"
import CSVReader from "../../../stories/cosmian/CSVReader/CSVReader"
import PageTitle from "../../../stories/cosmian/PageTitle/PageTitle"
import { Content } from "../layout/LayoutItems"
import "./createAnonymization.less"

const { Panel } = Collapse

const mapDispatchToProps = {
  addAnonymization,
  getOneAnonymization,
  updateAnonymization,
  cleanAnonymizationDetails,
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: RootState) => {
  return {
    anonymizationToUpdate: state.ciphercompute.anonymizations.anonymizationDetails,
  }
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type CreateAnonymizationProps = PropsFromRedux

const CreateAnonymization: React.FC<CreateAnonymizationProps> = ({
  addAnonymization,
  getOneAnonymization,
  updateAnonymization,
  cleanAnonymizationDetails,
  anonymizationToUpdate,
}) => {
  const [fileMetadata, setFileMetadata] = useState<Metadata[] | undefined>()
  const [fileInfo, setFileInfo] = useState<FileInfo | undefined>()
  const [myForm, setMyForm] = useState<FormValues | undefined>()
  const [form] = Form.useForm()
  const { anonymization_uuid } = useParams<{ anonymization_uuid: string }>()
  const navigate = useNavigate()

  const update = anonymization_uuid != null

  type FormValues = {
    name?: string
    description?: string
    dataset_metadata?: Metadata[]
    output_type?: string
    output_path?: string
  }

  useEffect(() => {
    if (update) {
      try {
        getOneAnonymization(anonymization_uuid)
      } catch (error) {
        errorMessage(error)
      }
    } else {
      cleanAnonymizationDetails()
    }
    return () => cleanAnonymizationDetails()
  }, [])

  useEffect(() => {
    // set form initial values in update case
    if (
      anonymizationToUpdate != null &&
      anonymizationToUpdate.input_dataset != null &&
      anonymizationToUpdate.input_dataset.dataset_metadata != null
    ) {
      const fieldsValue = {
        name: anonymizationToUpdate.name,
        description: anonymizationToUpdate.description,
      }
      form.setFieldsValue(fieldsValue)
      setMyForm(fieldsValue)
      setFileMetadata(anonymizationToUpdate.input_dataset.dataset_metadata as Metadata[])
      setFileInfo(anonymizationToUpdate.input_dataset.file_info)
    } else {
      form.setFieldsValue({})
      setMyForm({} as FormValues)
    }
  }, [anonymizationToUpdate])

  const updateForm = (): void => {
    setMyForm(form.getFieldsValue())
  }

  const handleOnSubmit = async (): Promise<void> => {
    const values = await form.validateFields()
    const now = new Date()
    if (!update && fileMetadata) {
      const uuid = uuidv4()
      const newAnonymization: Anonymization = {
        uuid: uuid,
        name: values.name,
        description: values.description,
        created_at: now.toUTCString(),
        input_dataset: {
          dataset_metadata: fileMetadata,
          file_info: fileInfo as FileInfo,
        },
      }
      const hide = message.loading("Adding anonymization", 0)
      try {
        const response = await addAnonymization(newAnonymization)
        form.resetFields()
        navigate(`${link_config.anonymizations}/${response.uuid}/edit`)
      } catch (error) {
        errorMessage(error)
      } finally {
        hide()
      }
    } else if (update && fileMetadata) {
      const updatedAnonymization: Anonymization = {
        uuid: anonymizationToUpdate.uuid,
        name: values.name,
        description: values.description,
        created_at: now.toUTCString(),
        input_dataset: {
          dataset_metadata: fileMetadata,
          file_info: fileInfo as FileInfo,
        },
      }
      const hide = message.loading("Update anonymization", 0)
      try {
        updateAnonymization(updatedAnonymization)
        form.resetFields()
        navigate(`${link_config.anonymizations}/${anonymizationToUpdate.uuid}/edit`)
      } catch (error) {
        errorMessage(error)
      } finally {
        hide()
      }
    }
  }

  const handleOnCancel = (): void => {
    navigate(link_config.anonymizations)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseFile = (data: any, fields: string[]): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metadata = data.map((obj: any, index: number) => {
      let type: DataType
      switch (obj[fields[1]]) {
        case "integer":
          type = DataType.Integer
          break
        case "float":
          type = DataType.Float
          break
        case "text":
          type = DataType.Text
          break
        case "date":
          type = DataType.Date
          break
        case "boolean":
          type = DataType.Boolean
          break
        default:
          type = DataType.Text
      }
      return { key: index, name: obj[fields[0]], type: type, example: obj[fields[2]], technique: Technique.None }
    })
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

  const genExtra = (isOK: boolean): JSX.Element => (
    <CheckCircleOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation()
      }}
      style={isOK ? { color: "green" } : { color: "inherit" }}
    />
  )

  // JSX
  if (update && anonymizationToUpdate == null) {
    return <Skeleton className="skeleton-margin" />
  }
  return (
    <>
      <PageTitle title="Anonymization" subtitle={update ? `Update your anonymization` : `Create new anonymization.`}></PageTitle>
      <BackArrow text="Back to anonymizations list" url={link_config.anonymizations} />
      <Content>
        <Form
          form={form}
          name="create_anonymize_dataset"
          onFinish={() => handleOnSubmit()}
          layout="vertical"
          size={"large"}
          requiredMark="optional"
          validateMessages={{
            required: "${label} is required",
          }}
        >
          <Collapse
            bordered={false}
            defaultActiveKey={["1", "2", "3"]}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="custom-collapse"
          >
            <Panel
              header="Your anonymization"
              key="1"
              className="custom-panel"
              showArrow={false}
              extra={genExtra(myForm?.name !== "" && myForm?.name != null)}
            >
              {/* Dataset name */}
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input placeholder="My dataset" onChange={updateForm} />
              </Form.Item>

              {/* Dataset description */}
              <Form.Item name="description" label="Description" rules={[{ required: false }]}>
                <Input placeholder="Confidential data from 2020" />
              </Form.Item>
            </Panel>
            <Panel header="Dataset metadata" key="2" className="custom-panel" showArrow={false} extra={genExtra(fileMetadata != null)}>
              <>
                <p>
                  Import a CSV file to describe the structure of your dataset. It should start with a header with three columns: <br />
                  <ul>
                    <li>
                      <span className="strong">column_name</span>: the name of the column
                    </li>
                    <li>
                      <span className="strong">type</span>: the column data type (<Typography.Text code>integer</Typography.Text>,{" "}
                      <Typography.Text code>float</Typography.Text>, <Typography.Text code>text</Typography.Text> or{" "}
                      <Typography.Text code>date</Typography.Text>)
                    </li>
                    <li>
                      <span className="strong">example_value</span>: an example so you can preview what an anonymization technique is doing
                    </li>
                  </ul>
                </p>
                <p>
                  You can download an{" "}
                  <a href={csvFile} target="_blank" rel="noreferrer">
                    example file
                  </a>{" "}
                  or read the <Typography.Link onClick={() => navigate(link_config.help)}>help page</Typography.Link> for more information.
                </p>

                {/* Source */}
                {update && (
                  <>
                    <p>
                      <span className="strong">Existing file:</span> {fileInfo?.name} – <span className="strong">Type:</span>{" "}
                      {fileInfo?.type} – <span className="strong">Size:</span> {fileInfo?.size} –{" "}
                      <span className="strong">Last modified date:</span> {fileInfo?.last_modified}{" "}
                    </p>
                    <CSVReader
                      getFileInfo={(file) => getFileInfo(file)}
                      getResult={(result) => parseFile(result.data, result.meta?.fields as string[])}
                      updateFile={fileInfo}
                    />
                  </>
                )}
                {!update && (
                  <CSVReader
                    getFileInfo={(file) => getFileInfo(file)}
                    getResult={(result) => parseFile(result.data, result.meta?.fields as string[])}
                  />
                )}
              </>
            </Panel>
          </Collapse>

          {/* Final buttons */}
          <Form.Item style={{ marginTop: "2em" }}>
            <Space style={{ justifyContent: "flex-end", width: "100%" }}>
              <Button size="large" type="default" onClick={handleOnCancel}>
                Cancel
              </Button>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                disabled={myForm?.name === "" || myForm?.name == null || fileMetadata == null}
              >
                {update ? "Edit anonymization" : "Create anonymization"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Content>
    </>
  )
}

export default connector(CreateAnonymization)
