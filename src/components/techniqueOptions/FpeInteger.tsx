import { Form, Select } from "antd"

const FpeIntegerOptions: React.FC = () => {
  return (
    <>
      <Form.Item name={["techniqueOptions", "radix"]} label="Radix">
        <Select
          options={[
            { value: "2", label: "2" },
            { value: "5", label: "20" },
          ]}
        />
      </Form.Item>
      <Form.Item name={["techniqueOptions", "digit"]} label="Digit">
        <Select
          options={[
            { value: "2", label: "2" },
            { value: "20", label: "20" },
          ]}
        />
      </Form.Item>
    </>
  )
}

export default FpeIntegerOptions
