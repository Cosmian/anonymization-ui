import ReloadOutlined from "@ant-design/icons/lib/icons/ReloadOutlined"
import { Checkbox, Form, FormInstance, Input, Select } from "antd"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import { Button } from "cosmian_ui"
import { useEffect, useState } from "react"
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
  const hashType = form.getFieldValue(["techniqueOptions", "hashType"])

  useEffect(() => {
    if (hashType === "SHA2" || hashType === "SHA3") {
      form.setFieldValue(["techniqueOptions", "saltValue"], undefined)
      form.setFieldValue(["techniqueOptions", "hasSalt"], false)
    }
  }, [hashType])

  const handleSaltChange = (): void => {
    const newSalt = uuidv4()
    form.setFieldValue(["techniqueOptions", "saltValue"], newSalt)
  }

  return (
    <>
      <Form.Item name={["techniqueOptions", "hashType"]} label="Type"
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
  const [hasSaltEnabled, setHasSaltEnabled] = useState(form.getFieldValue(["techniqueOptions", "isSale"]))

  const handleSaltCheck = (event : CheckboxChangeEvent): void => {
    setHasSaltEnabled(event.target.checked)
    if (event.target.checked) {
      handleSaltChange()
    } else {
      form.setFieldValue(["techniqueOptions", "saltValue"], undefined)
    }
  }

  return (
    <>
      <Form.Item name={["techniqueOptions", "hasSalt"]} valuePropName="checked" initialValue={hasSaltEnabled} style={{ marginBottom: 0 }}>
        <Checkbox onChange={(event) => handleSaltCheck(event)}>Add salt</Checkbox>
      </Form.Item>
      <div className="line">
        <Form.Item name={["techniqueOptions", "saltValue"]}>
          <Input disabled={!hasSaltEnabled} />
        </Form.Item>
        <Button type="primary" onClick={() => handleSaltChange()} disabled={!hasSaltEnabled} className="button">
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
          name={["techniqueOptions", "saltValue"]}
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
