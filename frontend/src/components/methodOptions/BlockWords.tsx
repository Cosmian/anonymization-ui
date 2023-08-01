import { Form, Select } from "antd"

export const MaskWordsOptions: React.FC = () => {
  return (
    <Form.Item name={["methodOptions", "wordsList"]} rules={[{ required: true, message: "Please provide a word to mask" }]}>
      <Select mode="tags" style={{ width: "100%" }} allowClear placeholder="Type words to mask" />
    </Form.Item>
  )
}

export const TokenizeWordsOptions: React.FC = () => {
  return (
    <Form.Item name={["methodOptions", "wordsList"]} rules={[{ required: true, message: "Please provide a word to tokenize" }]}>
      <Select mode="tags" style={{ width: "100%" }} allowClear placeholder="Type words to tokenize" />
    </Form.Item>
  )
}
