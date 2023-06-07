import { Form, InputNumber, Select } from "antd"

export const DateAggregationOptions: React.FC = () => {
  return (
    <Form.Item name={["methodOptions", "timeUnit"]} label="Precision" initialValue="Day">
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

export const NumberAggregationOptions: React.FC<{ float: boolean }> = ({ float = false }) => {
  return (
    <Form.Item name={["methodOptions", "powerOfTen"]} label="Precision (power of 10)" initialValue={1}>
      <InputNumber
        min={float ? undefined : 0}
        step={1}
        precision={0}
        formatter={(precision) => (precision ? Math.pow(10, precision).toString() : "")}
        parser={(value) => (value ? (Math.log10(Number(value)) as 0) : 0)}
      />
    </Form.Item>
  )
}
