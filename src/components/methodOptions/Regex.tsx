import { Form, Input } from "antd"

export const RegexOptions: React.FC = () => {
  return (
    <>
      <Form.Item label="Pattern" required>
        <div className="inline">
          <div className="bound">/</div>
          <Form.Item name={["methodOptions", "pattern"]} rules={[{ required: true, message: "Please provide a regex pattern" }]}>
            <Input />
          </Form.Item>
          <div className="bound">/g</div>
        </div>
      </Form.Item>
      <Form.Item
        name={["methodOptions", "replace"]}
        label="Replace with"
        rules={[{ required: true, message: "Please provide a replacement string" }]}
      >
        <Input />
      </Form.Item>
    </>
  )
}
