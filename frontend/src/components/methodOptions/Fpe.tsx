import { Form, Input, InputNumber, Select } from "antd"
import { Rule } from "antd/lib/form"

export const FpeIntegerOptions: React.FC = () => {
  return (
    <>
      <Form.Item name={["methodOptions", "radix"]} label="Radix" style={{ display: "none" }}>
        <InputNumber disabled />
      </Form.Item>
      <Form.Item
        name={["methodOptions", "digit"]}
        label="Digit"
        rules={[
          { required: true, message: "Please provide a value" },
          {
            validator: (_rule: Rule, value: number, cb: (msg?: string) => void) => {
              value < 6 ? cb("Minimum value is 6") : cb()
            },
          },
        ]}
      >
        <InputNumber step={1} min={6} />
      </Form.Item>
    </>
  )
}

export const FpeStringOptions: React.FC = () => {
  return (
    <>
      <Form.Item name={["methodOptions", "alphabet"]} label="Alphabet">
        <Select
          options={[
            { value: "alpha_numeric", label: "Alpha numeric" },
            { value: "alpha", label: "Alpha" },
            { value: "numeric", label: "Numeric" },
            { value: "latin1sup", label: "Latin-1" },
          ]}
        />
      </Form.Item>
      <Form.Item name={["methodOptions", "extendWith"]} label="Extend with">
        <Input />
      </Form.Item>
    </>
  )
}
