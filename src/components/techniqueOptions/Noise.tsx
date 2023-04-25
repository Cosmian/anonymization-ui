import { DatePicker, DatePickerProps, Form, FormInstance, InputNumber, Radio, Select, Space } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"

interface NoiseOptionsProps {
  form: FormInstance;
}

type PickerType = "date";

export const NoiseOptions: React.FC<NoiseOptionsProps> = ({ form }) => {
  const [pickerType, setPickerType] = useState<PickerType>(form.getFieldValue(["techniqueOptions", "pickerType"]) || "date")
  const dataType = form.getFieldValue("columnType")
  const method = form.getFieldValue(["techniqueOptions", "method"])
  const optionType = form.getFieldValue(["techniqueOptions", "optionType"])
  const minBound: string = form.getFieldValue(["techniqueOptions", "minBound"])
  const maxBound: string = form.getFieldValue(["techniqueOptions", "maxBound"])

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

  const PickerWithType = ({
    type,
    defaultValue,
    onChange,
  }: {
    type: PickerType
    defaultValue: string,
    onChange: DatePickerProps["onChange"]
  }): JSX.Element => {
    if (type === "date") return <DatePicker onChange={onChange} defaultValue={moment(defaultValue)} />
    form.setFieldValue(["techniqueOptions", "pickerType"], type)
    return <DatePicker picker={type} onChange={onChange} defaultValue={moment(defaultValue)} />
  }

  const BoundaryNumber = ({ label, name, initialValue }: { label: string, name: string, initialValue: string }): JSX.Element => {
    return (
      <Form.Item name={["techniqueOptions", name]} label={label} className="radio-content" initialValue={initialValue}
        rules={[{ required: true, message: "Please provide a boundary" }]}
      >
        <InputNumber
          min={0}
          step={1}
          precision={1}
        />
      </Form.Item>
    )
  }

  const BoundaryDate = ({ label, name, initialValue }: { label: string, name: string, initialValue: string }): JSX.Element => {
    return (
      <Form.Item label={label}>
        <Space>
          <Select value={pickerType} onChange={setPickerType}
            options={[
              { value: "date", label: "Date" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
              { value: "year", label: "Year" },
            ]}
          />
          <PickerWithType type={pickerType} onChange={value => form.setFieldValue(["techniqueOptions", name], value)} defaultValue={initialValue} />
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
          <BoundaryNumber label="Minimum" name="minBound" initialValue={minBound} />
          <BoundaryNumber label="Maximum" name="maxBound" initialValue={maxBound} />
        </>

      }
    </>
  )
}
