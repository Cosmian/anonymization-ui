import { Form, InputNumber, Select } from "antd"

export const DateAggregationOptions: React.FC= () => {
  return (
    <Form.Item name={["techniqueOptions", "timeUnit"]} label="Precision" initialValue="Minute">
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
    <Form.Item name={["techniqueOptions", "powerOfTen"]} label="Precision (power of 10)" initialValue="1">
      <InputNumber
        min={0}
        defaultValue={1}
        step={1}
        precision={0}
        formatter={(precision) => precision ? Math.pow(10, precision).toString() : ""}
        // @ts-ignore
        parser={(value) => value ? Math.log10(Number(value)) : 0}
      />
    </Form.Item>
  )
}
