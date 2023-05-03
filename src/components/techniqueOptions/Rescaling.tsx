import { Form, InputNumber } from "antd"

export const RescalingOptions: React.FC = () => {
  return (
    <>
      <Form.Item name={["techniqueOptions", "mean"]} label="Mean" initialValue={0} className="ant-radio-group label"
      rules={[{ required: true, message: "Please provide a value" }]}
      >
        <InputNumber
          step={1}
          precision={1}
        />
      </Form.Item>
      <Form.Item name={["techniqueOptions", "stdDev"]} label="Standard deviation" initialValue={0} className="ant-radio-group label"
        rules={[{ required: true, message: "Please provide a value" }]}
      >
        <InputNumber
          step={1}
          precision={1}
        />
      </Form.Item>
      <Form.Item name={["techniqueOptions", "scale"]} label="Scale" initialValue={0} className="ant-radio-group label"
        rules={[{ required: true, message: "Please provide a value" }]}
      >
        <InputNumber
          step={1}
          precision={1}
        />
      </Form.Item>
      <Form.Item name={["techniqueOptions", "translation"]} label="Translation" initialValue={0} className="ant-radio-group label"
        rules={[{ required: true, message: "Please provide a value" }]}
      >
        <InputNumber
          step={1}
          precision={1}
        />
      </Form.Item>
    </>
  )
}
