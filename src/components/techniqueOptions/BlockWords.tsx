import { Form, Select } from "antd"

export const MaskWordsOptions: React.FC = () => {
  return (
    <Form.Item name={["techniqueOptions", "wordsList"]}>
      <Select
        mode="tags"
        style={{ width: "100%" }}
        allowClear
        placeholder="Type words to mask"
      />
    </Form.Item>
  )
}

export const TokenizeWordsOptions: React.FC = () => {
  return (
    <Form.Item name={["techniqueOptions", "wordsList"]}>
      <Select
        mode="tags"
        style={{ width: "100%" }}
        allowClear
        placeholder="Type words to block"
      />
    </Form.Item>
  )
}
