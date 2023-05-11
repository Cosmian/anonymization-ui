import { Form, Input } from "antd"

export const RegexOptions: React.FC = () => {
  return (
    <>
      <Form.Item name={["methodOptions", "pattern"]} label="Pattern"
        rules={[{ required: true, message: "Must match a regex pattern" , pattern: new RegExp(/^(?:(?<!\\)(?:\\\\)*\/(.*?[^\\])(?<!\\)(?:\\\\)*\/[gimy]{0,4})(?![^\/]*\/)/ // eslint-disable-line
        )}]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={["methodOptions", "replace"]} label="Replace with"
        rules={[{ required: true, message: "Please provide a replacement string" }]}
      >
        <Input />
      </Form.Item>
    </>
  )
}
