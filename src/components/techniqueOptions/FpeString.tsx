import { Form, Input, Select } from "antd"


const FpeStringOptions: React.FC = () => {
  return (
    <>
      <Form.Item name={["techniqueOptions", "alphabet"]} label="Alphabet">
        <Select
          options={[
            { value: "alpha", label: "Alpha" },
            { value: "alpha_lower", label: "Alpha lower" },
            { value: "alpha_upper", label: "Alpha upper" },
            { value: "numeric", label: "Numeric" },
            { value: "hexa_decimal", label: "Hexadecimal" },
            { value: "alpha_numeric", label: "Alpha numeric" },
            { value: "chinese", label: "Chinese" },
            { value: "latin1sup", label: "Latin 1 sup" },
            { value: "latin1sup_alphanum", label: "Latin 1 sup Alphanum" }
          ]}
        />
      </Form.Item>
      <Form.Item name={["techniqueOptions", "extend_with"]} label="Extend with">
        <Input />
      </Form.Item>
    </>
  )
}

export default FpeStringOptions
