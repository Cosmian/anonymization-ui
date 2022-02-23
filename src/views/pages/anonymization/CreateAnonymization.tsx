import { CaretRightOutlined, CheckCircleOutlined } from "@ant-design/icons"
import { Button, Collapse, Form, Input, message, Skeleton, Space, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { errorMessage } from "../../../actions/messages/messages"
import csvFile from "../../../assets/files/schema-ROCHE.csv"
import { link_config } from "../../../configs/paths"
import {
  addAnonymization,
  cleanAnonymizationDetails,
  getOneAnonymization,
  updateAnonymization,
} from "../../../redux/actions/ciphercompute/anonymization"
import { Anonymization, FileInfo, Format, Schema, Treatment } from "../../../redux/reducers/ciphercompute/anonymization/types"
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
  const [fileSchema, setFileSchema] = useState<Schema[] | undefined>()
  const [fileInfo, setFileInfo] = useState<FileInfo | undefined>()
  const [myForm, setMyForm] = useState<FormValues | undefined>()
  const [form] = Form.useForm()
  const { anonymization_uuid } = useParams<{ anonymization_uuid: string }>()
  const navigate = useNavigate()

  const update = anonymization_uuid != null

  type FormValues = {
    name?: string
    description?: string
    dataset_schema?: Schema[]
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
      anonymizationToUpdate.input_dataset.dataset_schema != null
    ) {
      const fieldsValue = {
        name: anonymizationToUpdate.name,
        description: anonymizationToUpdate.description,
      }
      form.setFieldsValue(fieldsValue)
      setMyForm(fieldsValue)
      setFileSchema(anonymizationToUpdate.input_dataset.dataset_schema as Schema[])
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
    if (!update && fileSchema) {
      const uuid = uuidv4()
      const newAnonymization: Anonymization = {
        uuid: uuid,
        name: values.name,
        description: values.description,
        created_at: now.toUTCString(),
        input_dataset: {
          dataset_schema: fileSchema,
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
    } else if (update && fileSchema) {
      const updatedAnonymization: Anonymization = {
        uuid: anonymizationToUpdate.uuid,
        name: values.name,
        description: values.description,
        created_at: now.toUTCString(),
        input_dataset: {
          dataset_schema: fileSchema,
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
    const schema = data.map((obj: any, index: number) => {
      let format: Format
      switch (obj[fields[1]]) {
        case "integer":
          format = Format.Integer
          break
        case "float":
          format = Format.Float
          break
        case "text":
          format = Format.Text
          break
        case "date":
          format = Format.Date
          break
        case "boolean":
          format = Format.Boolean
          break
        default:
          format = Format.Text
      }
      return { key: index, name: obj[fields[0]], format: format, example: obj[fields[2]], treatment: Treatment.None }
    })
    setFileSchema(schema)
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
              header="Dataset informations"
              key="1"
              className="custom-panel"
              showArrow={false}
              extra={genExtra(myForm?.name !== "" && myForm?.name != null)}
            >
              {/* Dataset name */}
              <Form.Item name="name" label="Dataset name" rules={[{ required: true }]}>
                <Input placeholder="Dataset name" onChange={updateForm} />
              </Form.Item>

              {/* Dataset description */}
              <Form.Item name="description" label="Dataset description" rules={[{ required: false }]}>
                <Input placeholder="Dataset description" />
              </Form.Item>
            </Panel>
            <Panel header="Source config" key="2" className="custom-panel" showArrow={false} extra={genExtra(fileSchema != null)}>
              <>
                <p>
                  Your schema file must be a CSV file with .csv extention. It must contains a header with 3 columns:{" "}
                  <span className="strong">column_name</span>, <span className="strong">type</span> and{" "}
                  <span className="strong">example_value</span>, columns can be separated with comma or semi-colon. The types can be:{" "}
                  <Typography.Text code>integer</Typography.Text> <Typography.Text code>float</Typography.Text>{" "}
                  <Typography.Text code>text</Typography.Text> <Typography.Text code>date</Typography.Text>.
                </p>
                <p>
                  Download our{" "}
                  <a href={csvFile} target="_blank" rel="noreferrer">
                    {" "}
                    example file
                  </a>
                  .
                </p>
                <p>
                  See <Typography.Link onClick={() => navigate(link_config.help)}>help page</Typography.Link> for more informations.
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
                disabled={myForm?.name === "" || myForm?.name == null || fileSchema == null}
              >
                {update ? "Update anonymization" : "Create anonymization"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Content>
    </>
  )
}

export default connector(CreateAnonymization)
