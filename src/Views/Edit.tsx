import { Form, Input, Select, Table, Tag } from "antd"
import { DefaultOptionType } from "antd/lib/select"
import { BackArrow, Button, RoundedFrame } from "cosmian_ui"
import { Key, useCallback, useEffect, useState } from "react"
import { IoPencil } from "react-icons/io5"
import { useLocation, useNavigate } from "react-router-dom"
import TechniqueOptions from "../components/TechniqueOptions"
import { paths_config } from "../config/paths"
import { ConfigurationInfo, DataType, MetaData, TechniqueType, applyTechnique, dataTypesSelect, getCommonTechniques, techniquesForTypes } from "../utils/utils"
import "./style.less"

const Edit = (): JSX.Element => {
  const name: string = useLocation().state?.name
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [configurationInfo, setConfigurationInfo] = useState<ConfigurationInfo>()
  const [fileMetadata, setFileMetadata] = useState<MetaData[] | undefined>(undefined)
  const [selectTechniqueList, setSelectTechniqueList] = useState<undefined | any[]>(undefined)
  const [example, setExample] = useState<undefined | string | number>(undefined)
  const [result, setResult] = useState<string | number | bigint | undefined>(undefined)
  const selectedType: DataType = Form.useWatch("selectType", form)
  const selectedTechnique: TechniqueType = Form.useWatch("selectTechnique", form)
  const selectedTechniqueOptions = Form.useWatch("techniqueOptions", form)

  useEffect(() => {
    const item = sessionStorage.getItem(name)
    if (item) {
      setConfigurationInfo(JSON.parse(item).configurationInfo)
      setFileMetadata(JSON.parse(item).metadata)
    }
  }, [])

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
        form.setFieldValue("selectTechnique", undefined)
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
        if (result === "Error - invalid options") return <div style={{ color: "#e34319", fontStyle: "italic" }}>{ result }</div>
        return <div>{ result }</div>
      }
    },
  ]

  const handleApplyTechnique = useCallback(async (plainText: string | number, selectedTechnique: TechniqueType, selectedTechniqueOptions: any) => {
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
            ...(form.getFieldValue("selectType") && { type: form.getFieldValue("selectType") }),
            ...(form.getFieldValue("selectTechnique") && { technique: form.getFieldValue("selectTechnique"), result: result }),
            ...(form.getFieldValue("techniqueOptions") && { techniqueOptions: form.getFieldValue("techniqueOptions") }),
          }
        } else {
          const techniqueList = techniquesForTypes[selectedType]
          if (!techniqueList.some((technique: DefaultOptionType) => technique.value === updatedFileMetaData[Number(key)].technique)) {
            updatedFileMetaData[Number(key)] = {
              ...updatedFileMetaData[Number(key)],
              ...(form.getFieldValue("selectType") && { type: form.getFieldValue("selectType") }),
              technique: undefined,
              result: undefined,
              techniqueOptions: undefined,
            }
          }
        }
      }))
      setFileMetadata(updatedFileMetaData)
      sessionStorage.setItem(name, JSON.stringify({ metadata: updatedFileMetaData, configurationInfo }))
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
      sessionStorage.setItem(name, JSON.stringify({ metadata: updatedFileMetaData,  configurationInfo }))
    }
    resetForm()
  }

  const cancelEdit = (): void => {
    resetForm()
    setSelectedRowKeys([])
  }

  const onSelectChange= (newSelectedRowKeys: React.Key[]): void => {
    setSelectedRowKeys(newSelectedRowKeys)
    const selectedTypes: Set<DataType> = new Set()
    const selectedTechniques: Set<string> = new Set()
    const selectedTechniqueOptions: Set<string> = new Set()
    for (const key of newSelectedRowKeys) {
      if (fileMetadata) {
        selectedTypes.add(fileMetadata[Number(key)].type as DataType)
        selectedTechniques.add(fileMetadata[Number(key)].technique as string)
        selectedTechniqueOptions.add(JSON.stringify(fileMetadata[Number(key)].techniqueOptions) as string)
      }
    }
    selectedTypes.size === 1 ?
      form.setFieldValue("selectType", [...selectedTypes][0]) :
      form.setFieldValue("selectType", undefined)
    selectedTechniques.size === 1 ?
      form.setFieldValue("selectTechnique", [...selectedTechniques][0]) :
      form.setFieldValue("selectTechnique", undefined)
    selectedTechniques.size === 1 && selectedTechniqueOptions.size === 1 && [...selectedTechniqueOptions][0] ?
      form.setFieldValue("techniqueOptions", JSON.parse([...selectedTechniqueOptions][0])) :
      form.setFieldValue("techniqueOptions", undefined)
    setSelectTechniqueList(getCommonTechniques([...selectedTypes]))
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
              <Form.Item name="selectType" className="element">
                <Select
                  disabled={!selectedRowKeys.length}
                  options={dataTypesSelect}
                />
              </Form.Item>
              <div className="element">
                <Input onChange={(e) => setExample(e.target.value)} value={example} suffix={example ? <IoPencil /> : <span/>} />
              </div>
              <div className="element">
                <Form.Item name="selectTechnique">
                  <Select
                    disabled={!selectTechniqueList?.length}
                    options={selectTechniqueList}
                  />
                </Form.Item>
                <Form.Item>
                  <TechniqueOptions selected={selectedTechnique}/>
                </Form.Item>
              </div>
              <div className="element">
                {result === "Error - invalid options" && <div style={{ color: "#e34319", fontStyle: "italic" }}>{result}</div>}
                {result !== "Error - invalid options" && <div>{result}</div>}
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
        <Button onClick={() => navigate(paths_config.home)}>Download configuration</Button>
      </div>
    </div>
  )
}

export default Edit
