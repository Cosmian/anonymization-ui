import { Form, Select, Table, Tag } from "antd"
import { BackArrow, Button, RoundedFrame } from "cosmian_ui"
import { Key, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import TechniqueOptions from "../components/TechniqueOptions"
import { paths_config } from "../config/paths"
import { ConfigurationInfo, DataType, MetaData, TechniqueType, dataTypesSelect, getCommonTechniques, techniquesForTypes } from "../utils/utils"
import "./style.less"

const Edit = (): JSX.Element => {
  const name: string = useLocation().state?.name
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [configurationInfo, setConfigurationInfo] = useState<ConfigurationInfo>()
  const [fileMetadata, setFileMetadata] = useState<MetaData[] | undefined>(undefined)
  const [selectTechniqueOptions, setSelectTechniqueOptions] = useState<undefined | any[]>(undefined)
  const selectedType: DataType = Form.useWatch("select_type", form)
  const selectedTechnique: TechniqueType = Form.useWatch("select_technique", form)
  const [selectedExample, setSelectedExample] = useState<undefined | string | number>(undefined)

  useEffect(() => {
    const item = sessionStorage.getItem(name)
    if (item) {
      setConfigurationInfo(JSON.parse(item).configurationInfo)
      setFileMetadata(JSON.parse(item).metadata)
    }
  }, [])

  useEffect(() => {
    if (selectedType) {
      setSelectTechniqueOptions(techniquesForTypes[selectedType])
      if (selectedRowKeys.length === 1 && fileMetadata) {
        const key = selectedRowKeys[0]
        setSelectedExample(fileMetadata[Number(key)].example)
      } else {
        setSelectedExample(dataTypesSelect.find(type => type.value === selectedType)?.example)
      }
    } else {
      setSelectedExample(undefined)
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
    },
  ]

  const resetForm = (): void => {
    form.resetFields()
    setSelectedRowKeys([])
    setSelectedExample(undefined)
  }

  const saveEdit = (): void => {
    if (fileMetadata) {
      const updatedFileMetaData = [...fileMetadata]
      selectedRowKeys.map((key) => {
        updatedFileMetaData[Number(key)] = {
          ...updatedFileMetaData[Number(key)],
          ...(form.getFieldValue("select_type") && { type: form.getFieldValue("select_type") }),
          ...(form.getFieldValue("select_technique") && { technique: form.getFieldValue("select_technique") }),
          ...(form.getFieldValue("techniqueOptions") && { techniqueOptions: form.getFieldValue("techniqueOptions") })
        }
      })
      setFileMetadata(updatedFileMetaData)
      const fileName = configurationInfo?.file
      sessionStorage.setItem(name, JSON.stringify({ metadata: updatedFileMetaData, configurationInfo: { name, created_at: new Date(), file: fileName } }))
    }
    resetForm()
  }

  const resetTechnique = (): void => {
    if (fileMetadata) {
      const updatedFileMetaData = [...fileMetadata]
      selectedRowKeys.map((key) => {
        updatedFileMetaData[Number(key)] = {
          ...updatedFileMetaData[Number(key)],
          technique: undefined,
          techniqueOptions: undefined,
        }
      })
      setFileMetadata(updatedFileMetaData)
      const fileName = configurationInfo?.file
      sessionStorage.setItem(name, JSON.stringify({ metadata: updatedFileMetaData,  configurationInfo: { name, created_at: new Date(), file: fileName }  }))
    }
    resetForm()
  }

  const onSelectChange= (newSelectedRowKeys: React.Key[]): void => {
    setSelectedRowKeys(newSelectedRowKeys)
    const selectedTypes: Set<DataType> = new Set()
    const selectedTechniques: Set<string> = new Set()
    for (const key of newSelectedRowKeys) {
      if (fileMetadata) {
        selectedTypes.add(fileMetadata[Number(key)].type as DataType)
        selectedTechniques.add(fileMetadata[Number(key)].technique as string)
      }
    }
    selectedTypes.size === 1 ?
      form.setFieldValue("select_type", [...selectedTypes][0]) :
      form.setFieldValue("select_type", undefined)
    selectedTechniques.size === 1 ?
      form.setFieldValue("select_technique", [...selectedTechniques][0]) :
      form.setFieldValue("select_technique", undefined)
    setSelectTechniqueOptions(getCommonTechniques([...selectedTypes]))
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
              <Form.Item name="select_type" className="element">
                <Select
                  options={dataTypesSelect}
                />
              </Form.Item>
              <div className="element">{selectedExample}</div>
              <div className="element">
                <Form.Item name="select_technique">
                  <Select
                    disabled={!selectTechniqueOptions?.length}
                    options={selectTechniqueOptions}
                  />
                </Form.Item>
                <Form.Item>
                  <TechniqueOptions selected={selectedTechnique}/>
                </Form.Item>
              </div>
              <div className="element">result</div>
            </div>
            <Button className="save" htmlType="submit" disabled={selectedRowKeys.length === 0}>Save</Button>
          </Form>
        </div>
        <Button className="button" onClick={() => resetTechnique()} disabled={selectedRowKeys.length === 0}>Clear technique</Button>
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
