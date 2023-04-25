import { Form, Input, Select, Table, Tag } from "antd"
import { DefaultOptionType } from "antd/lib/select"
import { BackArrow, Button, RoundedFrame } from "cosmian_ui"
import { Key, useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import TechniqueOptions from "../components/TechniqueOptions"
import { paths_config } from "../config/paths"
import { ConfigurationInfo, DataType, MetaData, TechniqueType, applyTechnique, dataTypesSelect, downloadFile, getCommonTechniques, techniquesForTypes } from "../utils/utils"
import "./style.less"

const columns = [
  {
    title: "Column name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type: string) => {
      return <Tag>{type}</Tag>
    }
  },
  {
    title: "Example",
    dataIndex: "example",
    key: "example",
  },
  {
    title: "Technique",
    dataIndex: "technique",
    key: "technique",
  },
  {
    title: "Result",
    dataIndex: "result",
    key: "result",
    render: (result: string | number ) => {
      if (result && result.toString().substring(0,5) === "Error") return <div style={{ color: "#e34319", fontStyle: "italic" }}>{ result }</div>
    }
  },
]

const Edit = (): JSX.Element => {
  const configName: string = useLocation().state?.name
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [configurationInfo, setConfigurationInfo] = useState<ConfigurationInfo>()
  const [fileMetadata, setFileMetadata] = useState<MetaData[] | undefined>(undefined)
  const [selectTechniqueList, setSelectTechniqueList] = useState<undefined | DefaultOptionType[]>(undefined)
  const [example, setExample] = useState<undefined | string | number>(undefined)
  const [result, setResult] = useState<string | number | bigint | undefined>(undefined)
  const [initialType, setInitialType] = useState<DataType | undefined>(undefined)
  const [initialTechnique, setInitialTechnique] = useState<TechniqueType | undefined>(undefined)

  const selectedType: DataType = Form.useWatch("columnType", form)
  const selectedTechnique: TechniqueType = Form.useWatch("columnTechnique", form)
  const selectedTechniqueOptions = Form.useWatch("techniqueOptions", form)

  useEffect(() => {
    const configuration = sessionStorage.getItem(configName)
    if (configuration) {
      setConfigurationInfo(JSON.parse(configuration).configurationInfo)
      setFileMetadata(JSON.parse(configuration).metadata)
    }
  }, [])

  useEffect(() => {
    if (selectedType !== initialType || selectedTechnique !== initialTechnique) {
      form.setFieldValue("techniqueOptions", undefined)
    }
  }, [selectedTechnique, selectedType])

  useEffect(() => {
    if (example && selectedTechnique) {
      handleApplyTechnique(example, selectedTechnique, selectedTechniqueOptions)
    }
  }, [example, selectedTechnique, selectedTechniqueOptions, applyTechnique])

  useEffect(() => {
    if (selectedType) {
      const selectTechniqueListElements = techniquesForTypes[selectedType]
      setSelectTechniqueList(selectTechniqueListElements)
      if (!selectTechniqueListElements.some((techniqueOption: DefaultOptionType) => techniqueOption.value === selectedTechnique)) {
        form.setFieldValue("columnTechnique", undefined)
        form.setFieldValue("techniqueOptions", undefined)
        setResult(undefined)
      }
      if (selectedRowKeys.length === 1 && fileMetadata) {
        setExample(fileMetadata[Number(selectedRowKeys[0])].example)
      } else {
        setExample(dataTypesSelect.find(type => type.value === selectedType)?.example)
      }
    } else {
      setExample(undefined)
      setResult(undefined)
    }
  }, [selectedType, selectedRowKeys])

  const handleApplyTechnique = useCallback(async (plainText: string | number, selectedTechnique: TechniqueType, selectedTechniqueOptions: unknown) => {
    const result = await applyTechnique(plainText, selectedTechnique, selectedTechniqueOptions)
    setResult(result)
  }, [])

  const resetForm = (): void => {
    form.resetFields()
    setSelectedRowKeys([])
    setSelectTechniqueList([])
    setExample(undefined)
    setResult(undefined)
  }

  const saveEdit = async (): Promise<void> => {
    if (fileMetadata) {
      const updatedFileMetaData = [...fileMetadata]
      await Promise.all(selectedRowKeys.map(async (key) => {
        if (selectedTechnique) {
          const result = await applyTechnique(updatedFileMetaData[Number(key)].example, selectedTechnique, selectedTechniqueOptions)
          updatedFileMetaData[Number(key)] = {
            ...updatedFileMetaData[Number(key)],
            ...(form.getFieldValue("columnType") && { type: form.getFieldValue("columnType") }),
            ...(form.getFieldValue("columnTechnique") && { technique: form.getFieldValue("columnTechnique"), result: result }),
            ...(form.getFieldValue("techniqueOptions") && { techniqueOptions: form.getFieldValue("techniqueOptions") }),
          }
        } else {
          const techniqueList = techniquesForTypes[selectedType]
          if (!techniqueList.some((technique: DefaultOptionType) => technique.value === updatedFileMetaData[Number(key)].technique)) {
            updatedFileMetaData[Number(key)] = {
              ...updatedFileMetaData[Number(key)],
              ...(form.getFieldValue("columnType") && { type: form.getFieldValue("columnType") }),
              technique: undefined,
              result: undefined,
              techniqueOptions: undefined,
            }
          }
        }
      }))
      setFileMetadata(updatedFileMetaData)
      sessionStorage.setItem(configName, JSON.stringify({ metadata: updatedFileMetaData, configurationInfo }))
    }
    resetForm()
  }

  const clearTechnique = (): void => {
    if (fileMetadata) {
      const updatedFileMetaData = [...fileMetadata]
      selectedRowKeys.map((key) => {
        updatedFileMetaData[Number(key)] = {
          ...updatedFileMetaData[Number(key)],
          technique: undefined,
          techniqueOptions: undefined,
          result: undefined,
        }
      })
      setResult(undefined)
      setFileMetadata(updatedFileMetaData)
      sessionStorage.setItem(configName, JSON.stringify({ metadata: updatedFileMetaData,  configurationInfo }))
    }
    resetForm()
  }

  const cancelEdit = (): void => {
    resetForm()
    setSelectedRowKeys([])
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    setSelectedRowKeys(newSelectedRowKeys)
    const selectedTypes: Set<DataType> = new Set()
    const selectedTechniques: Set<string> = new Set()
    const selectedTechniqueOptions: Set<string> = new Set()
    for (const key of newSelectedRowKeys) {
      if (fileMetadata) {
        const metaData = fileMetadata[Number(key)]
        selectedTypes.add(metaData.type as DataType)
        selectedTechniques.add(metaData.technique as string)
        selectedTechniqueOptions.add(JSON.stringify(metaData.techniqueOptions) as string)
      }
    }

    const type: DataType | undefined =  selectedTypes.size === 1 ? [...selectedTypes][0] : undefined
    form.setFieldValue("columnType", type)
    setInitialType(type)

    const technique: TechniqueType | undefined = selectedTechniques.size === 1 ? [...selectedTechniques][0] as TechniqueType : undefined
    form.setFieldValue("columnTechnique", technique)
    setInitialTechnique(technique)

    selectedTechniques.size === 1 && selectedTechniqueOptions.size === 1 && [...selectedTechniqueOptions][0] ?
      form.setFieldValue("techniqueOptions", JSON.parse([...selectedTechniqueOptions][0])) :
      form.setFieldValue("techniqueOptions", undefined)
    setSelectTechniqueList(getCommonTechniques([...selectedTypes]))
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const downloadConfiguration = (configurationName: string | undefined): void => {
    downloadFile(configurationName)
    navigate(paths_config.home)
  }

  return (
    <div className="create">
      <BackArrow
        onClick={() => navigate(paths_config.home)}
        text="Back to configurations list"
      />
      <h1>Edit techniques</h1>
      <RoundedFrame className="editBox">
        <h2 className="h4">Apply technique</h2>
        <div className="rowEdit">
          <div className="header">
            <div className="element">Type</div>
            <div className="element">Example</div>
            <div className="element">Technique</div>
            <div className="element">Result</div>
          </div>
          <Form name="edit" className="form" onFinish={saveEdit} form={form}>
            <div className="edition">
              <Form.Item name="columnType" className="element">
                <Select
                  disabled={!selectedRowKeys.length}
                  options={dataTypesSelect}
                />
              </Form.Item>
              <div className="element">
                <Input onChange={(e) => setExample(e.target.value)} value={example} />
              </div>
              <div className="element">
                <Form.Item name="columnTechnique">
                  <Select
                    disabled={!selectTechniqueList?.length}
                    options={selectTechniqueList}
                  />
                </Form.Item>
                <Form.Item>
                  <TechniqueOptions selected={selectedTechnique} form={form} />
                </Form.Item>
              </div>
              <div className="element">
                {result !== undefined && result.toString().substring(0, 5) === "Error" && <div style={{ color: "#e34319", fontStyle: "italic" }}>{result as string}</div>}
                {(result === undefined || result.toString().substring(0,5) !== "Error") && <div>{result?.toString()}</div>}
              </div>
            </div>
            <div className="buttons">
              <Button type="outline" onClick={() => cancelEdit()} disabled={selectedRowKeys.length === 0}>Cancel</Button>
              <Button htmlType="submit" disabled={selectedRowKeys.length === 0}>Save</Button>
            </div>
          </Form>
        </div>
        <Button className="button" type="outline" onClick={() => clearTechnique()} disabled={selectedRowKeys.length === 0}>Clear technique</Button>
        <Table
          rowKey={"key"}
          dataSource={fileMetadata}
          columns={columns}
          pagination={false}
          rowSelection={rowSelection}
        />
      </RoundedFrame>
      <div className="buttons">
        <Button onClick={() => downloadConfiguration(configurationInfo?.name)}>Download configuration</Button>
      </div>
    </div>
  )
}

export default Edit
