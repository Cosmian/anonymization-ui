import { Form, InputNumber } from "antd"

export const RescalingOptions: React.FC = () => {
  return (
    <>
      <Form.Item name={["methodOptions", "mean"]} label="Mean" rules={[{ required: true, message: "Please provide a value" }]}>
        <InputNumber step={1} precision={1} />
      </Form.Item>
      <Form.Item
        name={["methodOptions", "stdDev"]}
        label="Standard deviation"
        rules={[{ required: true, message: "Please provide a value" }]}
      >
        <InputNumber step={1} precision={1} />
      </Form.Item>
      <Form.Item name={["methodOptions", "scale"]} label="Scale" rules={[{ required: true, message: "Please provide a value" }]}>
        <InputNumber step={1} precision={1} />
      </Form.Item>
      <Form.Item
        name={["methodOptions", "translation"]}
        label="Translation"
        rules={[{ required: true, message: "Please provide a value" }]}
      >
        <InputNumber step={1} precision={1} />
      </Form.Item>
    </>
  )
}
