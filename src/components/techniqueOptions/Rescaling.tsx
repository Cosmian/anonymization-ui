import { Form, Input } from "antd"

export const RescalingOptions: React.FC = () => {
  return (
    <Form.Item name={["techniqueOptions", "scale"]}>
      <Input />
    </Form.Item>
  )
}
