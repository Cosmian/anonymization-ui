import { DatePicker, DatePickerProps, Form, FormInstance, InputNumber, Radio, Select, Space } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

interface NoiseOptionsProps {
  form: FormInstance;
}

type PickerType = 'date';

export const NoiseOptions: React.FC<NoiseOptionsProps> = ({ form }) => {
  const [pickerType, setPickerType] = useState<PickerType>(form.getFieldValue(["techniqueOptions", "pickerType"]) || 'date')
  const dataType = form.getFieldValue("selectType")
  const method = form.getFieldValue(["techniqueOptions", "method"])
  const optionType = form.getFieldValue(["techniqueOptions", "optionType"]) || "params"
  const min_bound: string = form.getFieldValue(["techniqueOptions", "min_bound"])
  const max_bound: string = form.getFieldValue(["techniqueOptions", "max_bound"])

  const { Option } = Select;

  const options = [
    { label: 'Parameters', value: 'params', disabled: method === "Uniform" },
    { label: 'Boundaries', value: 'boundaries' },
  ];

  useEffect(() => {
    if (method === "Uniform") {
      form.setFieldValue(["techniqueOptions", "optionType"], "boundaries")
    }
  }, [method])

  useEffect(() => {
    if (optionType === "params") {
      form.setFieldValue(["techniqueOptions", "min_bound"], undefined)
      form.setFieldValue(["techniqueOptions", "max_bound"], undefined)
    } else if (optionType === "boundaries") {
      form.setFieldValue(["techniqueOptions", "mean"], undefined)
      form.setFieldValue(["techniqueOptions", "std_dev"], undefined)
    }
  }, [optionType])

  const PickerWithType = ({
    type,
    defaultValue,
    onChange,
  }: {
    type: PickerType
    defaultValue: string,
    onChange: DatePickerProps['onChange']
  }) => {
    if (type === 'date') return <DatePicker onChange={onChange} defaultValue={moment(defaultValue)} />;
    form.setFieldValue(["techniqueOptions", "pickerType"], type)
    return <DatePicker picker={type} onChange={onChange} defaultValue={moment(defaultValue)} />;
  };

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
          <Form.Item name={["techniqueOptions", "mean"]} label="Mean" className="radio-content" initialValue={0}>
            <InputNumber
              min={0}
              step={1}
              precision={1}
            />
          </Form.Item>
          <Form.Item name={["techniqueOptions", "std_dev"]} label="Standard deviation" className="radio-content" initialValue={1}>
            <InputNumber
              min={0}
              step={1}
              precision={1}
            />
          </Form.Item>
        </>
      }
      {optionType === "boundaries" && dataType === "Date" &&
        <Form.Item label="Minimum">
          <Space>
            <Select value={pickerType} onChange={setPickerType}>
              <Option value="date">Date</Option>
              <Option value="week">Week</Option>
              <Option value="month">Month</Option>
              <Option value="year">Year</Option>
            </Select>
            <PickerWithType type={pickerType} onChange={value => form.setFieldValue(["techniqueOptions", "min_bound"], value)} defaultValue={min_bound} />
          </Space>
        </Form.Item>
      }
      {optionType === "boundaries" && (dataType === "Integer" || dataType === "Float") &&
        <Form.Item name={["techniqueOptions", "min_bound"]} label="Minimum" className="radio-content" initialValue={min_bound}>
          <InputNumber
            min={0}
            step={1}
            precision={1}
            />
        </Form.Item>}
      {optionType === "boundaries" && dataType === "Date" &&
        <Form.Item label="Maximum">
          <Space>
            <Select value={pickerType} onChange={setPickerType}>
              <Option value="date">Date</Option>
              <Option value="week">Week</Option>
              <Option value="month">Month</Option>
              <Option value="year">Year</Option>
            </Select>
            <PickerWithType type={pickerType} onChange={value => form.setFieldValue(["techniqueOptions", "max_bound"], value)} defaultValue={max_bound} />
          </Space>
        </Form.Item>
      }
      {optionType === "boundaries" && (dataType === "Integer" || dataType === "Float") &&
        <Form.Item name={["techniqueOptions", "max_bound"]} label="Maximum" className="radio-content" initialValue={max_bound} >
          <InputNumber
            min={0}
            step={1}
            precision={1}
          />
        </Form.Item>}
    </>
  )
}
