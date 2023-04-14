import { Form, Input } from "antd"

export const RescalingOptions: React.FC = () => {
  return (
    <Form.Item name={["techniqueOptions", "regex"]}>
      <Input />
    </Form.Item>
  )
}
