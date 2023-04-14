import ReloadOutlined from "@ant-design/icons/lib/icons/ReloadOutlined"
import { Checkbox, Form, FormInstance, Input } from "antd"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import { Button } from "cosmian_ui"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

interface HashOptionsProps {
  form: FormInstance;
}

export const HashShaOptions: React.FC<HashOptionsProps> = ({ form }) => {
  const [isSaltEnabled, setIsSaltEnabled] = useState(form.getFieldValue(["techniqueOptions", "salt_value"]) !== undefined)

  const handleSaltCheck = (event : CheckboxChangeEvent): void => {
    setIsSaltEnabled(event.target.checked)
    if (event.target.checked) {
      handleSaltChange()
    } else {
      form.setFieldValue(["techniqueOptions", "salt_value"], undefined)
    }
  }

  const handleSaltChange = (): void => {
    const newSalt = uuidv4()
    form.setFieldValue(["techniqueOptions", "salt_value"], newSalt)
  }

  return (
    <>
      <Form.Item name="is_salt" valuePropName="checked" initialValue={isSaltEnabled} style={{ marginBottom: 0 }}>
        <Checkbox onChange={(event) => handleSaltCheck(event)}>Add salt</Checkbox>
      </Form.Item>
      <div className="line">
        <Form.Item
          name={["techniqueOptions", "salt_value"]}
        >
          <Input disabled={!isSaltEnabled} />
        </Form.Item>
        <Button type="primary" onClick={() => handleSaltChange()} disabled={!isSaltEnabled} className="button">
          <ReloadOutlined />
          </Button>
      </div>
    </>
  )
}

export const HashArgonOptions: React.FC<HashOptionsProps> = ({ form }) => {
  const handleSaltChange = (): void => {
    const newSalt = uuidv4()
    form.setFieldValue(["techniqueOptions", "salt_value"], newSalt)
  }

  return (
    <>
      <Form.Item name="is_salt" valuePropName="checked" initialValue={true} style={{ marginBottom: 0 }}>
        <Checkbox disabled>Add salt</Checkbox>
      </Form.Item>
      <div className="line">
        <Form.Item
          name={["techniqueOptions", "salt_value"]}
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
