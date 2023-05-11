import { Form, Input, Select, Table, Tag } from "antd"
import { DefaultOptionType } from "antd/lib/select"
import { BackArrow, Button, RoundedFrame } from "cosmian_ui"
import localForage from "localforage"
import { Key, useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import MethodOptions from "../components/MethodOptions"
import { paths_config } from "../config/paths"
import { ConfigurationInfo, DataType, MetaData, MethodType, applyMethod, dataTypesSelect, downloadFile, getCommonMethods, methodsForTypes } from "../utils/utils"
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
    title: "Method",
    dataIndex: "method",
    key: "method",
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
  const configUuid: string = useLocation().state?.uuid
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [configurationInfo, setConfigurationInfo] = useState<ConfigurationInfo>()
  const [fileMetadata, setFileMetadata] = useState<MetaData[] | undefined>(undefined)
  const [selectMethodList, setSelectMethodList] = useState<undefined | DefaultOptionType[]>(undefined)
  const [example, setExample] = useState<undefined | string | number>(undefined)
  const [result, setResult] = useState<string | number | bigint | undefined>(undefined)
  const [initialType, setInitialType] = useState<DataType | undefined>(undefined)
  const [initialMethod, setInitialMethod] = useState<MethodType | undefined>(undefined)

  const selectedType: DataType = Form.useWatch("columnType", form)
  const selectedMethod: MethodType = Form.useWatch("columnMethod", form)
  const selectedMethodOptions = Form.useWatch("methodOptions", form)

  useEffect(() => {
    const fetchConfig = async (): Promise<void> => {
      const configuration: { configurationInfo: ConfigurationInfo, metadata: MetaData[] } | null = await localForage.getItem(configUuid)
      if (configuration) {
        setConfigurationInfo(configuration.configurationInfo)
        setFileMetadata(configuration.metadata)
      }
    }
    fetchConfig()
  }, [])

  useEffect(() => {
    if (selectedType !== initialType || selectedMethod !== initialMethod) {
      form.setFieldValue("methodOptions", undefined)
    }
  }, [selectedMethod, selectedType])

  useEffect(() => {
    if (example && selectedMethod) {
      handleApplyMethod(example, selectedMethod, selectedMethodOptions)
    }
  }, [example, selectedMethod, selectedMethodOptions, applyMethod])

  useEffect(() => {
    if (selectedType) {
      const selectMethodListElements = methodsForTypes[selectedType]
      setSelectMethodList(selectMethodListElements)
      if (!selectMethodListElements.some((methodOption: DefaultOptionType) => methodOption.value === selectedMethod)) {
        form.setFieldValue("columnMethod", undefined)
        form.setFieldValue("methodOptions", undefined)
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

  const handleApplyMethod = useCallback(async (plainText: string | number, selectedMethod: MethodType, selectedMethodOptions: unknown) => {
    const result = await applyMethod(plainText, selectedMethod, selectedMethodOptions)
    setResult(result)
  }, [])

  const resetForm = (): void => {
    form.resetFields()
    setSelectedRowKeys([])
    setSelectMethodList([])
    setExample(undefined)
    setResult(undefined)
  }

  const saveEdit = async (): Promise<void> => {
    if (fileMetadata) {
      const updatedFileMetaData = [...fileMetadata]
      await Promise.all(selectedRowKeys.map(async (key) => {
        if (selectedMethod) {
          const result = await applyMethod(updatedFileMetaData[Number(key)].example, selectedMethod, selectedMethodOptions)
          updatedFileMetaData[Number(key)] = {
            ...updatedFileMetaData[Number(key)],
            ...(form.getFieldValue("columnType") && { type: form.getFieldValue("columnType") }),
            ...(form.getFieldValue("columnMethod") && { method: form.getFieldValue("columnMethod"), result: result }),
            ...(form.getFieldValue("methodOptions") && { methodOptions: form.getFieldValue("methodOptions") }),
          }
        } else {
          const methodList = methodsForTypes[selectedType]
          if (!methodList.some((method: DefaultOptionType) => method.value === updatedFileMetaData[Number(key)].method)) {
            updatedFileMetaData[Number(key)] = {
              ...updatedFileMetaData[Number(key)],
              ...(form.getFieldValue("columnType") && { type: form.getFieldValue("columnType") }),
              method: undefined,
              result: undefined,
              methodOptions: undefined,
            }
          }
        }
      }))
      setFileMetadata(updatedFileMetaData)
      await localForage.setItem(configUuid, { metadata: updatedFileMetaData, configurationInfo })
    }
    resetForm()
  }

  const clearMethod = async (): Promise<void> => {
    if (fileMetadata) {
      const updatedFileMetaData = [...fileMetadata]
      selectedRowKeys.map((key) => {
        updatedFileMetaData[Number(key)] = {
          ...updatedFileMetaData[Number(key)],
          method: undefined,
          methodOptions: undefined,
          result: undefined,
        }
      })
      setResult(undefined)
      setFileMetadata(updatedFileMetaData)
      await localForage.setItem(configUuid, { metadata: updatedFileMetaData,  configurationInfo })
    }
    resetForm()
  }

  const cancelEdit = (): void => {
    resetForm()
    setSelectedRowKeys([])
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    setSelectedRowKeys(newSelectedRowKeys)
    const columns: string[] = []
    const selectedTypes: Set<DataType> = new Set()
    const selectedMethods: Set<string> = new Set()
    const selectedMethodOptions: Set<string> = new Set()
    for (const key of newSelectedRowKeys) {
      if (fileMetadata) {
        const metaData = fileMetadata[Number(key)]
        columns.push(metaData.name)
        selectedTypes.add(metaData.type as DataType)
        selectedMethods.add(metaData.method as string)
        selectedMethodOptions.add(JSON.stringify(metaData.methodOptions) as string)
      }
    }
    setSelectedColumns(columns)

    const type: DataType | undefined =  selectedTypes.size === 1 ? [...selectedTypes][0] : undefined
    form.setFieldValue("columnType", type)
    setInitialType(type)

    const method: MethodType | undefined = selectedMethods.size === 1 ? [...selectedMethods][0] as MethodType : undefined
    form.setFieldValue("columnMethod", method)
    setInitialMethod(method)

    selectedMethods.size === 1 && selectedMethodOptions.size === 1 && [...selectedMethodOptions][0] ?
      form.setFieldValue("methodOptions", JSON.parse([...selectedMethodOptions][0])) :
      form.setFieldValue("methodOptions", undefined)
    setSelectMethodList(getCommonMethods([...selectedTypes]))
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const downloadConfiguration = (configurationUuid: string | undefined): void => {
    downloadFile(configurationUuid)
    navigate(paths_config.home)
  }

  const getCorrelatedColumns = (uuid: string): string[] => {
    if (fileMetadata && uuid) {
      const columns = fileMetadata.reduce((acc: string[], column: MetaData) => {
        if (column.methodOptions) {
          const options = column.methodOptions
          if (options?.correlation === uuid) {
            return [...acc, column.name]
          }
          return acc
        }
        return acc
      }, [] as string[])
      if (columns.length !== 1) return columns
      else return []
    }
    return []
  }

  return (
    <div className="edit">
      <BackArrow
        onClick={() => navigate(paths_config.home)}
        text="Back to configurations list"
      />
      <h1>Edit methods</h1>
      <div className="buttons">
        <Button onClick={() => downloadConfiguration(configurationInfo?.uuid)}>Download configuration</Button>
      </div>
      <RoundedFrame className="editBox">
        <h2 className="h4">{`Apply method on ${selectedRowKeys.length} column${selectedRowKeys.length > 1 ? "s" : ""}`}</h2>
        <div className="rowEdit">
          <div className="header">
            <div className="element">Type</div>
            <div className="element">Example</div>
            <div className="element">Method</div>
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
                <Form.Item name="columnMethod">
                  <Select
                    disabled={!selectMethodList?.length}
                    options={selectMethodList}
                  />
                </Form.Item>
                {selectedMethod && <div className="link">
                  {`More information about ${selectedMethod} treatment`}
                </div>}
                <Form.Item>
                  <MethodOptions selected={selectedMethod} form={form} columns={selectedColumns} getCorrelatedColumns={getCorrelatedColumns} />
                </Form.Item>
              </div>
              <div className="element">
                {result !== undefined && result.toString().substring(0, 5) === "Error" && <div style={{ color: "#e34319", fontStyle: "italic" }}>{result as string}</div>}
                {(result === undefined || result.toString().substring(0, 5) !== "Error") && <div>{result?.toString()}</div>}
              </div>
            </div>
            <div className="buttons">
              <div>
                <Button type="outline" onClick={() => cancelEdit()} disabled={selectedRowKeys.length === 0}>Cancel</Button>
                <Button className="button" type="dark" onClick={() => clearMethod()} disabled={selectedRowKeys.length === 0}>Clear selected column(s) method</Button>
                <Button htmlType="submit" disabled={selectedRowKeys.length === 0}>Save</Button>
              </div>
            </div>
          </Form>
        </div>
      </RoundedFrame>
      <RoundedFrame>
        <h2 className="h4">{configurationInfo?.name} anonymization columns</h2>
        <Table
          rowKey={"key"}
          dataSource={fileMetadata}
          columns={columns}
          pagination={false}
          rowSelection={rowSelection}
        />
      </RoundedFrame>
    </div>
  )
}

export default Edit
