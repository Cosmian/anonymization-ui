import { EditOutlined } from "@ant-design/icons"
import { Button, Form, FormInstance, Input, Select, Skeleton, Space, Table, Tag } from "antd"
import { NamePath } from "antd/lib/form/interface"
import { isEmpty } from "lodash"
import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { errorMessage } from "../../../actions/messages/messages"
import { link_config } from "../../../configs/paths"
import { cleanAnonymizationDetails, getOneAnonymization, updateAnonymization } from "../../../redux/actions/ciphercompute/anonymization"
import { Format, Schema, Treatment, TreatmentOptions } from "../../../redux/reducers/ciphercompute/anonymization/types"
import { RootState } from "../../../redux/reducers/RootReducer"
import BackArrow from "../../../stories/cosmian/BackArrow/BackArrow"
import PageTitle from "../../../stories/cosmian/PageTitle/PageTitle"
import { Content } from "../layout/LayoutItems"
import AnonymizationDrawer from "./components/AnonymizationDrawer"
import TreatmentOption from "./components/TreatmentOptions"
import "./edit-treatment.less"

const EditableContext = React.createContext<FormInstance<{ treatments: Treatment[] }> | null>(null)

const mapDispatchToProps = {
  getOneAnonymization,
  updateAnonymization,
  cleanAnonymizationDetails,
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: RootState) => {
  return {
    anonymizationDetails: state.ciphercompute.anonymizations.anonymizationDetails,
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type EditTreatmentProps = ConnectedProps<typeof connector>

type EditableTableProps = Parameters<typeof Table>[0]
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>

const initialTableColumns = [
  {
    title: "Column name",
    dataIndex: "name",
  },
  {
    title: "Format",
    dataIndex: "format",
    width: 150,
    render: (format: Format) => <Tag>{format}</Tag>,
  },
  {
    title: "Example",
    dataIndex: "example",
    key: "example",
    render: (example: string, dataset_schema: Schema) => {
      if (dataset_schema.format === Format.Date) {
        const date = new Date(example)
        return <span>{date.toUTCString()}</span>
      } else {
        return <span>{example}</span>
      }
    },
  },
  {
    title: "Treatment",
    dataIndex: "treatment",
    editable: true,
    render: (treatment: Treatment) => (
      <span className={treatment === Treatment.None ? "editable" : "editable strong"}>
        {treatment}
        <EditOutlined style={{ marginLeft: 15 }} />
      </span>
    ),
  },
  {
    title: "Treated example",
    dataIndex: "treated_example",
  },
] as ColumnTypes

const EditTreatment: FC<EditTreatmentProps> = ({
  getOneAnonymization,
  updateAnonymization,
  cleanAnonymizationDetails,
  anonymizationDetails,
}) => {
  const { anonymization_uuid } = useParams<{ anonymization_uuid: string }>()
  const [datasetShema, setDatasetSchema] = useState([] as Schema[])
  const [activeRow, setActiveRow] = useState<Schema | undefined>()
  const [displayDrawer, setDisplayDrawer] = useState(false)
  const [displayOption, setDisplayOption] = useState(false)
  const [activeTreatment, setActiveTreatment] = useState<Treatment | undefined>()
  const navigate = useNavigate()

  useEffect(() => {
    const getAnonymization = async (): Promise<void> => {
      try {
        getOneAnonymization(anonymization_uuid as string)
      } catch (err) {
        errorMessage(err)
        navigate(`${link_config.anonymizations}`)
      }
    }
    getAnonymization()
    return () => cleanAnonymizationDetails()
  }, [])

  useEffect(() => {
    if (anonymizationDetails != null && !isEmpty(anonymizationDetails)) {
      setDatasetSchema(anonymizationDetails.input_dataset.dataset_schema)
    }
  }, [anonymizationDetails])

  const handleChange = (row: Schema): void => {
    setActiveRow(row)
    setActiveTreatment(row.treatment)
    setDisplayOption(true)
    window.scrollTo({
      top: 210,
      behavior: "smooth",
    })
  }

  const handleSaveTreatment = (
    rowKey: number,
    treatment: Treatment,
    treatment_options?: TreatmentOptions,
    treated_example?: string
  ): void => {
    const updatedSchema = { ...datasetShema[rowKey] }
    updatedSchema.treatment = treatment
    if (treatment_options) {
      updatedSchema.treatment_options = treatment_options
    }
    if (treated_example) {
      updatedSchema.treated_example = treated_example
    }
    if (treatment === Treatment.None) {
      delete updatedSchema.treatment_options
      delete updatedSchema.treated_example
    }
    const newData = [...datasetShema]
    newData[rowKey] = updatedSchema
    setDatasetSchema(newData)
    const anonymizationToUpdate = { ...anonymizationDetails }
    anonymizationToUpdate.input_dataset.dataset_schema = newData
    updateAnonymization(anonymizationToUpdate)
    setDisplayOption(false)
  }

  const handleOnCancel = (): void => {
    setActiveRow(undefined)
    setDisplayOption(false)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns = initialTableColumns.map((col: any) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: Schema) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleChange: handleChange,
      }),
    }
  })

  const downloadFile = async (): Promise<void> => {
    const fileName = "config-" + anonymizationDetails.name
    const json = JSON.stringify(anonymizationDetails)
    const blob = new Blob([json], { type: "application/json" })
    const href = await URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = href
    link.download = fileName + ".json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (anonymizationDetails == null || isEmpty(anonymizationDetails)) {
    return <Skeleton className="skeleton-margin" />
  }

  return (
    <>
      <PageTitle title="Anonymization" subtitle={`Provide privacy treatments.`}></PageTitle>
      <BackArrow text="Back to anonymizations list" url={link_config.anonymizations} />
      <Content>
        <div className="edit-dataset">
          <h2>{anonymizationDetails.name}</h2>
          {activeRow != null && displayOption && (
            <TreatmentOption
              activeRow={activeRow}
              openInfo={() => setDisplayDrawer(true)}
              onCancel={handleOnCancel}
              onSave={handleSaveTreatment}
              onChangeTreatment={setActiveTreatment}
            />
          )}
          <Table
            components={components}
            columns={columns as ColumnTypes}
            dataSource={datasetShema}
            scroll={{ x: 900 }}
            rowKey="name"
            tableLayout="fixed"
            rowClassName={() => "editable-row"}
            pagination={false}
          />
        </div>
        <AnonymizationDrawer visible={displayDrawer} treatment={activeTreatment} closeDrawer={() => setDisplayDrawer(false)} />
        <Space style={{ marginTop: 30, width: "100%", justifyContent: "flex-end" }}>
          <Button size="large" type="primary" onClick={downloadFile}>
            Download configuration file
          </Button>
        </Space>
      </Content>
    </>
  )
}

export default connector(EditTreatment)

interface EditableRowProps {
  index: number
  children?: React.ReactNode
}
const EditableRow: React.FC<EditableRowProps> = ({ ...props }) => {
  const [form] = Form.useForm<{ treatments: Treatment[] }>()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Schema
  record: Schema
  handleChange: (record: Schema) => void
}
const EditableCell: React.FC<EditableCellProps> = ({ title, editable, children, dataIndex, record, handleChange, ...restProps }) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<Input>(null)
  const form = useContext(EditableContext)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus() // Focus on selected treatment
    }
  }, [editing])

  const toggleEdit = (): void => {
    setEditing(!editing)
    form?.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const onChange = async (): Promise<void> => {
    try {
      const values = await form?.validateFields()
      toggleEdit()
      handleChange({ ...record, ...values })
    } catch (errInfo) {
      console.log("Save failed:", errInfo)
    }
  }

  let childNode = children

  if (editable) {
    if (editing) {
      childNode = (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex as NamePath}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select onSelect={onChange} onBlur={onChange}>
            <Select.Option value={Treatment.None} disabled={disableTreatment(record.format, Treatment.None)} data-cy={record.key}>
              {Treatment.None}
            </Select.Option>
            <Select.Option value={Treatment.Hash} disabled={disableTreatment(record.format, Treatment.Hash)} data-cy={record.key}>
              {Treatment.Hash}
            </Select.Option>
            <Select.Option value={Treatment.Aggregate} disabled={disableTreatment(record.format, Treatment.Aggregate)} data-cy={record.key}>
              {Treatment.Aggregate}
            </Select.Option>
            <Select.Option value={Treatment.AddNoise} disabled={disableTreatment(record.format, Treatment.AddNoise)} data-cy={record.key}>
              {Treatment.AddNoise}
            </Select.Option>
            <Select.Option
              value={Treatment.BlockWords}
              disabled={disableTreatment(record.format, Treatment.BlockWords)}
              data-cy={record.key}
            >
              {Treatment.BlockWords}
            </Select.Option>
          </Select>
        </Form.Item>
      )
    } else {
      childNode = (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
          {children}
        </div>
      )
    }
  }

  return <td {...restProps}>{childNode}</td>
}

// function to disable options in treatment list
export const disableTreatment = (format: Format, treatment: Treatment): boolean => {
  switch (treatment) {
    case Treatment.Hash:
      return !(format === Format.Integer || format === Format.Float || format === Format.Text)
    case Treatment.Aggregate:
    case Treatment.AddNoise:
      return !(format === Format.Date || format === Format.Integer || format === Format.Float)
    case Treatment.BlockWords:
      return !(format === Format.Text)
    case Treatment.None:
      return false
    default:
      return true
  }
}
