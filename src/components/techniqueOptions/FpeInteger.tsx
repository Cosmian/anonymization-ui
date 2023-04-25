import { Form, InputNumber } from "antd"

const FpeIntegerOptions: React.FC = () => {
  return (
    <>
      <Form.Item name={["techniqueOptions", "radix"]} label="Radix" initialValue={10}>
        <InputNumber
          disabled
        />
      </Form.Item>
      <Form.Item name={["techniqueOptions", "digit"]} label="Digit" initialValue={9}
        rules={[{ required: true, message: "Please provide a value" }]}
      >
        <InputNumber
          min={0}
          step={1}
          precision={0}
        />
      </Form.Item>
    </>
  )
}

export default FpeIntegerOptions
