import { Form, Input } from "antd"

export const RegexOptions: React.FC = () => {
  return (
    <>
      <Form.Item name={["techniqueOptions", "rule"]} label="Rule"
        rules={[{ required: true, message: "Rule must match a regex pattern" , pattern: new RegExp(/^(?:(?<!\\)(?:\\\\)*\/(.*?[^\\])(?<!\\)(?:\\\\)*\/[gimy]{0,4})(?![^\/]*\/)/
        )}]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={["techniqueOptions", "replace"]} label="Replace with"
        rules={[{ required: true, message: "Please provide a replacement string" }]}
      >
        <Input />
      </Form.Item>
    </>
  )
}
