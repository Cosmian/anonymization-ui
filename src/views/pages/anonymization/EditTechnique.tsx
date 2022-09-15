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
import {
  AddNoise,
  Aggregate,
  BlockWords,
  DataType,
  Hash,
  Metadata,
  Technique,
  TechniqueOptions,
} from "../../../redux/reducers/ciphercompute/anonymization/types"
import { RootState } from "../../../redux/reducers/RootReducer"
import BackArrow from "../../../stories/cosmian/BackArrow/BackArrow"
import PageTitle from "../../../stories/cosmian/PageTitle/PageTitle"
import { Content } from "../layout/LayoutItems"
import AnonymizationDrawer from "./components/AnonymizationDrawer"
import TechniqueOption from "./components/TechniqueOptions"
import "./edit-technique.less"

const EditableContext = React.createContext<FormInstance<{ techniques: Technique[] }> | null>(null)

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
type EditTechniqueProps = ConnectedProps<typeof connector>

type EditableTableProps = Parameters<typeof Table>[0]
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>

const initialTableColumns = [
  {
    title: "Column name",
    dataIndex: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    width: 150,
    render: (type: DataType) => <Tag>{type}</Tag>,
  },
  {
    title: "Example",
    dataIndex: "example",
    key: "example",
    render: (example: string, dataset_metadata: Metadata) => {
      if (dataset_metadata.type === DataType.Date) {
        const date = new Date(example)
        return <span>{date.toUTCString()}</span>
      } else {
        return <span>{example}</span>
      }
    },
  },
  {
    title: "Technique",
    dataIndex: "technique",
    editable: true,
    render: (technique: Technique) => (
      <span className={technique === Technique.None ? "editable" : "editable strong"}>
        {technique}
        <EditOutlined style={{ marginLeft: 15 }} />
      </span>
    ),
  },
  {
    title: "Technique details",
    render: (anonymization: Metadata) => getDetails(anonymization),
  },
  {
    title: "Treated example",
    dataIndex: "treated_example",
  },
] as ColumnTypes

const getDetails = (anonymizationdata: Metadata): JSX.Element => {
  if (anonymizationdata.technique_options == null) {
    return <span>{"–"}</span>
  } else if (anonymizationdata.technique === Technique.Hash) {
    return (
      <>
        <div>
          <span className="strong">Hash:</span> {(anonymizationdata.technique_options as Hash).hash_function}
        </div>
        <div>
          <span className="strong">Salt:</span>{" "}
          {(anonymizationdata.technique_options as Hash).salt ? (anonymizationdata.technique_options as Hash).salt : "no"}
        </div>
      </>
    )
  } else if (anonymizationdata.technique === Technique.AddNoise) {
    return (
      <>
        <div>
          <span className="strong">Noise type:</span> {(anonymizationdata.technique_options as AddNoise).noise_type}
        </div>
        <div>
          <span className="strong">Standard deviation:</span> {(anonymizationdata.technique_options as AddNoise).standard_deviation}
        </div>
        {anonymizationdata.type === DataType.Date && (
          <div>
            <span className="strong">Precision:</span> {(anonymizationdata.technique_options as AddNoise).precision_type}
          </div>
        )}
      </>
    )
  } else if (anonymizationdata.technique === Technique.Aggregate) {
    return (
      <>
        <div>
          <span className="strong">Aggregation type:</span> {(anonymizationdata.technique_options as Aggregate).aggregation_type}
        </div>
        <div>
          <span className="strong">Precision:</span> {(anonymizationdata.technique_options as Aggregate).precision}
        </div>
      </>
    )
  } else if (anonymizationdata.technique === Technique.BlockWords) {
    return (
      <>
        <div>
          <span className="strong">Block type:</span> {(anonymizationdata.technique_options as BlockWords).block_type}
        </div>
        <div>
          <span className="strong">Word list:</span>{" "}
          {(anonymizationdata.technique_options as BlockWords).word_list.map((word, index) => (
            <>
              {word}
              {index < (anonymizationdata.technique_options as BlockWords).word_list.length - 1 ? ", " : ""}
            </>
          ))}
        </div>
      </>
    )
  } else {
    return <>-</>
  }
}

const EditTechnique: FC<EditTechniqueProps> = ({
  getOneAnonymization,
  updateAnonymization,
  cleanAnonymizationDetails,
  anonymizationDetails,
}) => {
  const { anonymization_uuid } = useParams<{ anonymization_uuid: string }>()
  const [datasetShema, setDatasetMetadata] = useState([] as Metadata[])
  const [activeRow, setActiveRow] = useState<Metadata | undefined>()
  const [displayDrawer, setDisplayDrawer] = useState(false)
  const [displayOption, setDisplayOption] = useState(false)
  const [activeTechnique, setActiveTechnique] = useState<Technique | undefined>()
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
      setDatasetMetadata(anonymizationDetails.input_dataset.dataset_metadata)
    }
  }, [anonymizationDetails])

  const handleChange = (row: Metadata): void => {
    setActiveRow(row)
    setActiveTechnique(row.technique)
    setDisplayOption(true)
    window.scrollTo({
      top: 210,
      behavior: "smooth",
    })
  }

  const handleSaveTechnique = (
    rowKey: number,
    technique: Technique,
    technique_options?: TechniqueOptions,
    treated_example?: string
  ): void => {
    const updatedMetadata = { ...datasetShema[rowKey] }
    updatedMetadata.technique = technique
    if (technique_options) {
      updatedMetadata.technique_options = technique_options
    }
    if (treated_example) {
      updatedMetadata.treated_example = treated_example
    }
    if (technique === Technique.None) {
      delete updatedMetadata.technique_options
      delete updatedMetadata.treated_example
    }
    const newData = [...datasetShema]
    newData[rowKey] = updatedMetadata
    setDatasetMetadata(newData)
    const anonymizationToUpdate = { ...anonymizationDetails }
    anonymizationToUpdate.input_dataset.dataset_metadata = newData
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
      onCell: (record: Metadata) => ({
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
    anonymizationDetails.input_dataset.delimiter = ";"
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
      <PageTitle title="Anonymization" subtitle={`Provide privacy techniques.`}></PageTitle>
      <BackArrow text="Back to anonymizations list" url={link_config.anonymizations} />
      <Content>
        <div className="edit-dataset">
          <h2>{anonymizationDetails.name}</h2>
          {activeRow != null && displayOption && (
            <TechniqueOption
              activeRow={activeRow}
              openInfo={() => setDisplayDrawer(true)}
              onCancel={handleOnCancel}
              onSave={handleSaveTechnique}
              onChangeTechnique={setActiveTechnique}
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
        <AnonymizationDrawer visible={displayDrawer} technique={activeTechnique} closeDrawer={() => setDisplayDrawer(false)} />
        <Space style={{ marginTop: 30, width: "100%", justifyContent: "flex-end" }}>
          <Button size="large" type="primary" onClick={downloadFile}>
            Download configuration file
          </Button>
        </Space>
      </Content>
    </>
  )
}

export default connector(EditTechnique)

interface EditableRowProps {
  index: number
  children?: React.ReactNode
}
const EditableRow: React.FC<EditableRowProps> = ({ ...props }) => {
  const [form] = Form.useForm<{ techniques: Technique[] }>()
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
  dataIndex: keyof Metadata
  record: Metadata
  handleChange: (record: Metadata) => void
}
const EditableCell: React.FC<EditableCellProps> = ({ title, editable, children, dataIndex, record, handleChange, ...restProps }) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<Input>(null)
  const form = useContext(EditableContext)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus() // Focus on selected technique
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
            <Select.Option value={Technique.None} disabled={disableTechnique(record.type, Technique.None)} data-cy={record.key}>
              {Technique.None}
            </Select.Option>
            <Select.Option value={Technique.Hash} disabled={disableTechnique(record.type, Technique.Hash)} data-cy={record.key}>
              {Technique.Hash}
            </Select.Option>
            <Select.Option value={Technique.Aggregate} disabled={disableTechnique(record.type, Technique.Aggregate)} data-cy={record.key}>
              {Technique.Aggregate}
            </Select.Option>
            <Select.Option value={Technique.AddNoise} disabled={disableTechnique(record.type, Technique.AddNoise)} data-cy={record.key}>
              {Technique.AddNoise}
            </Select.Option>
            <Select.Option value={Technique.BlockWords} disabled={disableTechnique(record.type, Technique.BlockWords)} data-cy={record.key}>
              {Technique.BlockWords}
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

// function to disable options in technique list
export const disableTechnique = (type: DataType, technique: Technique): boolean => {
  switch (technique) {
    case Technique.Hash:
      return !(type === DataType.Integer || type === DataType.Float || type === DataType.Text)
    case Technique.Aggregate:
    case Technique.AddNoise:
      return !(type === DataType.Date || type === DataType.Integer || type === DataType.Float)
    case Technique.BlockWords:
      return !(type === DataType.Text)
    case Technique.None:
      return false
    default:
      return true
  }
}
