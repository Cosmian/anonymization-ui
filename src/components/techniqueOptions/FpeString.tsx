import { Form, Input, Select } from "antd"


const FpeStringOptions: React.FC = () => {
  return (
    <>
      <Form.Item name={["techniqueOptions", "alphabet"]} label="Alphabet" initialValue="alpha_numeric">
        <Select
          options={[
            { value: "alpha_numeric", label: "Alpha numeric" },
            { value: "alpha", label: "Alpha" },
            { value: "numeric", label: "Numeric" },
            { value: "latin1sup", label: "Windows" },
          ]}
        />
      </Form.Item>
      <Form.Item name={["techniqueOptions", "extendWith"]} label="Extend with">
        <Input />
      </Form.Item>
    </>
  )
}

export default FpeStringOptions
