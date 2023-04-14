import { Form, InputNumber, Select } from "antd"

export const DateAggregationOptions: React.FC= () => {
  return (
    <Form.Item name={["techniqueOptions", "time_unit"]} label="Precision"         initialValue="Minute">
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
  )
}

export const NumberAggregationOptions: React.FC= () => {
  return (
    <Form.Item name={["techniqueOptions", "power_of_ten"]} label="Precision" initialValue="1">
      <InputNumber
        min={0}
        max={99}
        defaultValue={0}
        step={1}
        precision={0}
      />
    </Form.Item>
  )
}
