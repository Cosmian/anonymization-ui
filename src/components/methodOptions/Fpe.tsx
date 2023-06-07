import { Form, Input, InputNumber, Select } from "antd"

export const FpeIntegerOptions: React.FC = () => {
  // for base 10 minimum precision must be 6
  return (
    <>
      <Form.Item name={["methodOptions", "radix"]} label="Radix" initialValue={10} style={{ display: "none" }}>
        <InputNumber disabled />
      </Form.Item>
      <Form.Item
        name={["methodOptions", "digit"]}
        label="Digit"
        initialValue={9}
        rules={[
          { required: true, message: "Please provide a value" },
          { min: 6, message: "Minimum value is 6" },
        ]}
      >
        <InputNumber min={6} step={1} precision={0} />
      </Form.Item>
    </>
  )
}

export const FpeStringOptions: React.FC = () => {
  return (
    <>
      <Form.Item name={["methodOptions", "alphabet"]} label="Alphabet" initialValue="alpha_numeric">
        <Select
          options={[
            { value: "alpha_numeric", label: "Alpha numeric" },
            { value: "alpha", label: "Alpha" },
            { value: "numeric", label: "Numeric" },
            { value: "latin1sup", label: "Windows" },
          ]}
        />
      </Form.Item>
      <Form.Item name={["methodOptions", "extendWith"]} label="Extend with">
        <Input />
      </Form.Item>
    </>
  )
}
