import { Divider, Form, Input, Select } from "antd"
import { DefaultOptionType } from "antd/lib/select"
import { Button } from "cosmian_ui"
import React, { Key, useCallback, useEffect, useState } from "react"
import {
  DataType,
  MetaData,
  MethodType,
  applyMethod,
  dataTypesSelect,
  getCommonMethods,
  getCorrelatedColumns,
  methodsForTypes,
} from "../utils/utils"
import MethodInfoBox from "./MethodInfoBox"
import MethodOptions from "./MethodOptions"

interface EditMethodBoxProps {
  selectedRowKeys: Key[]
  fileMetadata: MetaData[] | undefined
  saveConfiguration: (fileMetadata: MetaData[]) => void
  setSelectedRowKeys: (rowKeys: Key[]) => void
}

const EditMethodBox: React.FC<EditMethodBoxProps> = ({ selectedRowKeys, fileMetadata, saveConfiguration, setSelectedRowKeys }) => {
  const [form] = Form.useForm()

  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [selectMethodList, setSelectMethodList] = useState<undefined | DefaultOptionType[]>(undefined)
  const [example, setExample] = useState<undefined | string | number>(undefined)
  const [result, setResult] = useState<string | number | bigint | undefined>(undefined)
  const [initialType, setInitialType] = useState<DataType | undefined>(undefined)
  const [initialMethod, setInitialMethod] = useState<MethodType | undefined>(undefined)
  const [initialMethodOptions, setInitialMethodOptions] = useState<string | undefined>(undefined)
  const [open, setOpen] = useState(false)

  const selectedType: DataType = Form.useWatch("columnType", form)
  const selectedMethod: MethodType = Form.useWatch("columnMethod", form)
  const selectedFormMethodOptions = Form.useWatch("methodOptions", form)

  // Select the right current type and method according to column's selection
  useEffect(() => {
    const columns: string[] = []
    const selectedTypes: Set<DataType> = new Set()
    const selectedMethods: Set<string> = new Set()
    const selectedMethodOptions: Set<string> = new Set()
    for (const key of selectedRowKeys) {
      if (fileMetadata) {
        const metaData = fileMetadata[Number(key)]
        columns.push(metaData.name)
        selectedTypes.add(metaData.type as DataType)
        selectedMethods.add(metaData.method as string)
        selectedMethodOptions.add(JSON.stringify(metaData.methodOptions) as string)
      }
    }
    setSelectedColumns(columns)

    const type: DataType | undefined = selectedTypes.size === 1 ? [...selectedTypes][0] : undefined
    form.setFieldValue("columnType", type)
    setInitialType(type)

    const method: MethodType | undefined = selectedMethods.size === 1 ? ([...selectedMethods][0] as MethodType) : undefined
    form.setFieldValue("columnMethod", method)
    setInitialMethod(method)

    const methodOptions: any | undefined = selectedMethodOptions.size === 1 ? [...selectedMethodOptions][0] : undefined
    setInitialMethodOptions(methodOptions)

    selectedMethods.size === 1 && selectedMethodOptions.size === 1 && [...selectedMethodOptions][0]
      ? form.setFieldValue("methodOptions", JSON.parse([...selectedMethodOptions][0]))
      : form.setFieldValue("methodOptions", undefined)
    setSelectMethodList(getCommonMethods([...selectedTypes]))
  }, [selectedRowKeys])

  // Reset form columnMethod and methodOptions when changing type selection
  useEffect(() => {
    if (selectedType !== initialType) {
      form.setFieldValue("methodOptions", undefined)
      form.setFieldValue("columnMethod", undefined)
      setResult(undefined)
    } else if (initialMethodOptions) {
      form.setFieldsValue({ methodOptions: JSON.parse(initialMethodOptions) })
    }
  }, [selectedType])

  // Reset form methodOptions when changing method selection
  useEffect(() => {
    console.log(selectedMethod, initialMethod)
    if (selectedMethod !== initialMethod) {
      form.setFieldsValue({ methodOptions: getMethodOptions(selectedMethod) })
      setResult(undefined)
    } else if (initialMethodOptions) {
      form.setFieldsValue({ methodOptions: JSON.parse(initialMethodOptions) })
    }
  }, [selectedMethod])

  useEffect(() => {
    if (example && form.getFieldValue("columnMethod") && form.getFieldValue("methodOptions")) {
      handleApplyMethod(example, form.getFieldValue("columnMethod"))
    }
  }, [example, selectedMethod, selectedFormMethodOptions])

  // Set example and result according to selected columns
  useEffect(() => {
    if (form.getFieldValue("columnType")) {
      const selectMethodListElements = methodsForTypes[selectedType]
      setSelectMethodList(selectMethodListElements)
      if (selectedRowKeys.length === 1 && fileMetadata) {
        setExample(fileMetadata[Number(selectedRowKeys[0])].example)
      } else {
        setExample(dataTypesSelect.find((type) => type.value === selectedType)?.example)
      }
    } else {
      setExample(undefined)
      setResult(undefined)
    }
  }, [selectedType, selectedRowKeys])

  // Apply method to current example to set result
  const handleApplyMethod = useCallback(async (plainText: string | number, selectedMethod: MethodType) => {
    const result = await applyMethod(plainText, selectedMethod, form.getFieldValue("methodOptions"))
    setResult(result)
  }, [])

  const resetForm = (): void => {
    form.resetFields()
    setSelectedRowKeys([])
    setSelectMethodList([])
    setExample(undefined)
    setResult(undefined)
    setOpen(false)
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
      saveConfiguration(updatedFileMetaData)
    }
    resetForm()
  }

  const saveMethod = async (): Promise<void> => {
    if (fileMetadata) {
      const updatedFileMetaData = [...fileMetadata]
      await Promise.all(
        selectedRowKeys.map(async (key) => {
          const formMethodOptions = form.getFieldsValue().methodOptions
          if (selectedMethod) {
            const rowResult = await applyMethod(
              updatedFileMetaData[Number(key)].example,
              form.getFieldValue("columnMethod"),
              form.getFieldValue("methodOptions")
            )
            updatedFileMetaData[Number(key)] = {
              ...updatedFileMetaData[Number(key)],
              ...(form.getFieldValue("columnType") && { type: form.getFieldValue("columnType") }),
              ...(form.getFieldValue("columnMethod") && { method: form.getFieldValue("columnMethod"), result: rowResult }),
              ...{ methodOptions: formMethodOptions },
            }
            if (form.getFieldValue("columnMethod") === "DeleteColumn") {
              updatedFileMetaData[Number(key)] = {
                ...updatedFileMetaData[Number(key)],
                methodOptions: {},
              }
            }
          } else {
            const methodList = methodsForTypes[selectedType]
            if (!methodList.some((method: DefaultOptionType) => method.value === updatedFileMetaData[Number(key)].method)) {
              updatedFileMetaData[Number(key)] = {
                ...updatedFileMetaData[Number(key)],
                ...(form.getFieldValue("columnType") && { type: form.getFieldValue("columnType") }),
                method: undefined,
                methodOptions: undefined,
                result: undefined,
              }
            }
          }
        })
      )
      saveConfiguration(updatedFileMetaData)
    }
    resetForm()
  }

  const customDisabledTextStyle = selectedRowKeys.length ? {} : { color: "#a1a1aa" }
  const customDisabledBackgroundStyle = selectedRowKeys.length ? {} : { backgroundColor: "#f5f5f5" }

  return (
    <div className="edit-box">
      <h2 className="h4" style={customDisabledTextStyle}>
        {selectedRowKeys.length ? `Apply method on ${selectedRowKeys.length} column(s)` : "Apply method on columns"}
      </h2>
      <Divider />
      <Form name="edit" onFinish={saveMethod} form={form}>
        <div className="select">
          <h3 className="h6" style={customDisabledTextStyle}>
            Type
          </h3>
          <Form.Item name="columnType">
            <Select disabled={!selectedRowKeys.length} options={dataTypesSelect} />
          </Form.Item>
          <h3 className="h6" style={customDisabledTextStyle}>
            Example
          </h3>
          <Form.Item>
            <Input onChange={(e) => setExample(e.target.value)} value={example} style={customDisabledBackgroundStyle} />
          </Form.Item>
          <h3 className="h6" style={customDisabledTextStyle}>
            Method
          </h3>
          <Form.Item name="columnMethod">
            <Select disabled={!selectMethodList?.length} options={selectMethodList} />
          </Form.Item>
          {selectedMethod && (
            <>
              <div className="link" onClick={() => setOpen(!open)}>
                {`More information about ${selectedMethod} treatment`}
              </div>
              <Form.Item>
                <MethodOptions
                  selected={selectedMethod}
                  form={form}
                  columns={selectedColumns}
                  getCorrelatedColumns={(uuid) => getCorrelatedColumns(uuid, fileMetadata)}
                />
              </Form.Item>
            </>
          )}
          {selectedMethod !== "DeleteColumn" && (
            <>
              <h3 className="h6" style={customDisabledTextStyle}>
                Result
              </h3>
              <Form.Item>
                {result !== undefined && result.toString().substring(0, 5) === "Error" ? (
                  <div style={{ color: "#e34319", fontStyle: "italic" }}>{result as string}</div>
                ) : (
                  <div className="input" style={customDisabledBackgroundStyle}>
                    {result?.toString()}
                  </div>
                )}
              </Form.Item>
            </>
          )}
        </div>
        <div className="buttons">
          <Button type="dark" onClick={() => clearMethod()} disabled={!selectedRowKeys.length}>
            Clear selected column(s) method
          </Button>
          <div className="horizontal-buttons">
            <Button type="outline" onClick={() => resetForm()} disabled={!selectedRowKeys.length}>
              Cancel
            </Button>
            <Button htmlType="submit" disabled={!selectedRowKeys.length}>
              Save
            </Button>
          </div>
        </div>
      </Form>
      <MethodInfoBox open={open} close={() => setOpen(false)} method={selectedMethod} />
    </div>
  )
}

export default EditMethodBox

const getMethodOptions = (method: MethodType): any => {
  switch (method) {
    case "Hash":
      return {
        hashType: "SHA2",
      }
    case "FpeInteger":
      return {
        digit: 6,
        radix: 10,
      }
    case "FpeString":
      return {
        alphabet: "alpha_numeric",
      }
    case "MaskWords" || "TokenizeWords":
      return {
        wordsList: [],
      }
    case "Regex":
      return {}
    case "AggregationDate":
      return {
        timeUnit: "Day",
      }
    case "AggregationInteger" || "AggregationFloat":
      return {
        powerOfTen: 0,
      }
    case "NoiseDate":
      return {
        distribution: "Gaussian",
        mean: {
          precision: 1,
          unit: "Day",
        },
        stdDev: {
          precision: 1,
          unit: "Day",
        },
      }
    case "NoiseInteger" || "NoiseFloat":
      return {
        distribution: "Gaussian",
        lowerBoundary: 1,
        upperBoundary: 2,
        mean: 1,
        stdDev: 1,
      }
    case "RescalingInteger" || "RescalingFloat":
      return {
        mean: 1,
        stdDev: 1,
        scale: 1,
        translation: 1,
      }
    case "DeleteColumn":
      return {}

    default:
      return {}
  }
}
