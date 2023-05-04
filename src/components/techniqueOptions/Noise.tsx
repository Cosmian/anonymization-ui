import { Checkbox, DatePicker, DatePickerProps, Form, FormInstance, InputNumber, Radio, Select, Space, Tag } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

interface NoiseOptionsProps {
  form: FormInstance;
  columns: string[];
  getCorrelatedColumns: (uuid: string) => string[]
}

type PickerType = "date";

export const NoiseOptions: React.FC<NoiseOptionsProps> = ({ form, columns, getCorrelatedColumns }) => {
  const [pickerType, setPickerType] = useState<PickerType>(form.getFieldValue(["techniqueOptions", "pickerType"]) || "date")
  const [correlatedColumns, setCorrelatedColumns] = useState<string[]>([])
  const [minDate, setMinDate] = useState<Moment | undefined>(undefined)
  const dataType = form.getFieldValue("columnType")
  const method = form.getFieldValue(["techniqueOptions", "method"])
  const optionType = form.getFieldValue(["techniqueOptions", "optionType"])
  const minBound: string = form.getFieldValue(["techniqueOptions", "minBound"])
  const maxBound: string = form.getFieldValue(["techniqueOptions", "maxBound"])
  const correlationId: string = form.getFieldValue(["techniqueOptions", "correlation"])

  const options = [
    { label: "Parameters", value: "params", disabled: method === "Uniform" },
    { label: "Boundaries", value: "boundaries" },
  ]

  useEffect(() => {
    if (method === "Uniform") {
      form.setFieldValue(["techniqueOptions", "optionType"], "boundaries")
    }
  }, [method])

  useEffect(() => {
    setCorrelatedColumns(getCorrelatedColumns(correlationId))
  }, [correlationId])

  useEffect(() => {
    if (!form.getFieldValue(["techniqueOptions", "optionType"])) {
      form.setFieldValue(["techniqueOptions", "optionType"], "params")
    }
    else if (optionType === "params") {
      form.setFieldValue(["techniqueOptions", "minBound"], undefined)
      form.setFieldValue(["techniqueOptions", "maxBound"], undefined)
    } else if (optionType === "boundaries") {
      form.setFieldValue(["techniqueOptions", "mean"], undefined)
      form.setFieldValue(["techniqueOptions", "stdDev"], undefined)
    }
  }, [optionType])

  const setUuidCorrelation= (): void => {
    const uuid = uuidv4()
    form.setFieldValue(["techniqueOptions", "correlation"], uuid)
  }

  const PickerWithType = ({
    type,
    defaultValue,
    onChange,
    max,
  }: {
    type: PickerType
    defaultValue: string,
    onChange: DatePickerProps["onChange"],
    max: boolean
    }): JSX.Element => {
    if (type === "date") return <DatePicker onChange={onChange} defaultValue={moment(defaultValue)} disabledDate={(date) => max && minDate ? date.isBefore(minDate) : false} />
    form.setFieldValue(["techniqueOptions", "pickerType"], type)
    return <DatePicker picker={type} onChange={onChange} defaultValue={moment(defaultValue)} disabledDate={(date) => max && minDate ? date.isBefore(minDate) : false} />
  }

  const BoundaryDate = ({ label, name, initialValue }: { label: string, name: string, initialValue: string }): JSX.Element => {
    const max = name === "maxBound"
    return (
      <Form.Item label={label} className="radio-content">
        <Space>
          <Select value={pickerType} onChange={setPickerType}
            options={[
              { value: "date", label: "Date" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
              { value: "year", label: "Year" },
            ]}
          />
          <PickerWithType type={pickerType} onChange={value => {
            form.setFieldValue(["techniqueOptions", name], value)
            if (!max && value) {
              setMinDate(value)
            }
          }} defaultValue={initialValue} max={max} />
        </Space>
      </Form.Item>
    )
  }

  return (
    <>
      <Form.Item name={["techniqueOptions", "method"]}
        label="Method"
        initialValue="Gaussian"
      >
        <Select
          options={[
            { value: "Gaussian", label: "Gaussian" },
            { value: "Laplacian", label: "Laplacian" },
            { value: "Uniform", label: "Uniform" },
          ]}
        />
      </Form.Item>
      <div className="box">
        <Form.Item name={["techniqueOptions", "optionType"]} initialValue="params">
          <Radio.Group
            options={options}
            value={optionType}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        {optionType === "params" &&
          <>
          <Form.Item name={["techniqueOptions", "mean"]} label="Mean" className="radio-content" initialValue={0}
            rules={[{ required: true, message: "Please provide a value" }]}
          >
              <InputNumber
                min={0}
                step={1}
                precision={1}
              />
          </Form.Item>
          <Form.Item label="Standard deviation" className="radio-content input-inline">
            {dataType !== "Date" &&
              <Form.Item name={["techniqueOptions", "stdDev"]} initialValue={1}
                rules={[{ required: true, message: "Please provide a value" }]}
              >
                <InputNumber
                  min={0}
                  step={1}
                  precision={1}
                />
              </Form.Item>}
            {dataType === "Date" &&
              <>
              <Form.Item name={["techniqueOptions", "stdDev", "precision"]} initialValue={1}
                rules={[{ required: true, message: "Please provide a value" }]}
              >
                  <InputNumber
                    min={0}
                    step={1}
                    precision={1}
                  />
                </Form.Item>
                <Form.Item  name={["techniqueOptions", "stdDev", "unit"]} initialValue="Minute">
                  <Select
                    options={[
                      { value: "Minute", label: "Minute" },
                      { value: "Hour", label: "Hour" },
                      { value: "Day", label: "Day" },
                      { value: "Month", label: "Month" },
                      { value: "Year", label: "Year" },
                    ]}
                  />
                </Form.Item>
              </>
            }
          </Form.Item>
          </>
        }
        {optionType === "boundaries" && dataType === "Date" &&
          <>
            <BoundaryDate label="Minimum" name="minBound" initialValue={minBound} />
            <BoundaryDate label="Maximum" name="maxBound" initialValue={maxBound} />
          </>
        }
        {optionType === "boundaries" && (dataType === "Integer" || dataType === "Float") &&
          <>
            <Form.Item name={["techniqueOptions", "minBound"]} label="Minimum" className="radio-content" initialValue={minBound}
              rules={[{ required: true, message: "Please provide a boundary" }]}
            >
              <InputNumber
                min={0}
                step={1}
                precision={1}
              />
            </Form.Item>
            <Form.Item name={["techniqueOptions", "maxBound"]} label="Maximum" className="radio-content" initialValue={maxBound}
              rules={[{ required: true, message: "Please provide a boundary" }]}
            >
              <InputNumber
                min={minBound}
                step={1}
                precision={1}
              />
            </Form.Item>
          </>
        }
      </div>
      {form.getFieldValue(["techniqueOptions", "correlation"]) === undefined && <Form.Item name="is_correlated" valuePropName="checked" initialValue={undefined} style={{ marginBottom: 0 }} className="tags-list">
        <Checkbox onChange={() => setUuidCorrelation()} disabled={columns.length < 2}>Apply correlated noise for columns:</Checkbox>
        <>
          {columns.map((name, index) => (
            <Tag key={index}>{name}</Tag>
          ))}
        </>
      </Form.Item>}
      {form.getFieldValue(["techniqueOptions", "correlation"]) !== undefined && <div className="tags-list">Correlated noise applied between:
        <>
          {correlatedColumns.map((name, index) => (
            <Tag key={index}>{name}</Tag>
          ))}
        </>
      </div>}
    </>
  )
}
