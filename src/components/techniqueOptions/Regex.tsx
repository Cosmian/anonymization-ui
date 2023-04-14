import { Form, Input } from "antd"

export const RegexOptions: React.FC = () => {
  return (
    <Form.Item name={["techniqueOptions", "regex"]}>
      <Input />
    </Form.Item>
  )
}
