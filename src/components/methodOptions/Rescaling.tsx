import { Form, InputNumber } from "antd"

export const RescalingOptions: React.FC = () => {
  return (
    <>
      <Form.Item
        name={["methodOptions", "mean"]}
        label="Mean"
        initialValue={1}
        rules={[{ required: true, message: "Please provide a value" }]}
      >
        <InputNumber step={1} precision={1} />
      </Form.Item>
      <Form.Item
        name={["methodOptions", "stdDev"]}
        label="Standard deviation"
        initialValue={1}
        rules={[{ required: true, message: "Please provide a value" }]}
      >
        <InputNumber step={1} precision={1} />
      </Form.Item>
      <Form.Item
        name={["methodOptions", "scale"]}
        label="Scale"
        initialValue={1}
        rules={[{ required: true, message: "Please provide a value" }]}
      >
        <InputNumber step={1} precision={1} />
      </Form.Item>
      <Form.Item
        name={["methodOptions", "translation"]}
        label="Translation"
        initialValue={1}
        rules={[{ required: true, message: "Please provide a value" }]}
      >
        <InputNumber step={1} precision={1} />
      </Form.Item>
    </>
  )
}
