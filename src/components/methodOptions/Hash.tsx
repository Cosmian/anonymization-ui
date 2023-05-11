import ReloadOutlined from "@ant-design/icons/lib/icons/ReloadOutlined"
import { Checkbox, Form, FormInstance, Input, Select } from "antd"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import { Button } from "cosmian_ui"
import { v4 as uuidv4 } from "uuid"

interface HashOptionsProps {
  form: FormInstance;
}

interface HashShaOptionsProps {
  form: FormInstance;
  handleSaltChange: () => void
}

interface HashArgonOptionsProps {
  handleSaltChange: () => void
}

export const HashOptions: React.FC<HashOptionsProps> = ({ form }) => {
  const hashType = form.getFieldValue(["methodOptions", "hashType"])

  const handleSaltChange = (): void => {
    const newSalt = uuidv4()
    form.setFieldValue(["methodOptions", "saltValue"], newSalt)
  }

  return (
    <>
      <Form.Item name={["methodOptions", "hashType"]} label="Type"
        rules={[{ required: true, message: "Please select a type" }]}
      >
        <Select
          options={[
            { value: "SHA2", label: "SHA 2" },
            { value: "SHA3", label: "SHA 3" },
            { value: "Argon2", label: "Argon 2" },
          ]}
        />
      </Form.Item>
      {(hashType === "SHA2" || hashType === "SHA3") && <HashShaOptions form={form} handleSaltChange={handleSaltChange} />}
      {(hashType === "Argon2") && <HashArgonOptions handleSaltChange={handleSaltChange} />}
    </>
  )
}

const HashShaOptions: React.FC<HashShaOptionsProps> = ({ form, handleSaltChange }) => {
  const salt: string | undefined = form.getFieldValue(["methodOptions", "saltValue"])

  const handleSaltCheck = (event: CheckboxChangeEvent): void => {
    if (event.target.checked) {
      handleSaltChange()
    } else {
      form.setFieldValue(["methodOptions", "saltValue"], undefined)
    }
  }

  return (
    <>
      <Form.Item valuePropName="checked" style={{ marginBottom: 0 }}>
        <Checkbox onChange={(event) => handleSaltCheck(event)} checked={salt !== undefined}>Add salt</Checkbox>
      </Form.Item>
      <div className="line">
        <Form.Item name={["methodOptions", "saltValue"]}>
          <Input disabled={!salt}/>
        </Form.Item>
        <Button type="primary" onClick={() => handleSaltChange()} disabled={!salt} className="button">
          <ReloadOutlined />
        </Button>
      </div>
    </>
  )
}

const HashArgonOptions: React.FC<HashArgonOptionsProps> = ({ handleSaltChange }) => {
  return (
    <>
      <Form.Item initialValue={true} style={{ marginBottom: 0 }}>
        <Checkbox checked disabled>Add salt</Checkbox>
      </Form.Item>
      <div className="line">
        <Form.Item
          name={["methodOptions", "saltValue"]}
          initialValue={uuidv4()}
          rules={[{ required: true, message: "Salt is mandatory" }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" onClick={() => handleSaltChange()} className="button">
          <ReloadOutlined />
        </Button>
      </div>
    </>
  )
}
