import { Checkbox, Form, Input } from "antd"
import { useState } from "react"

const HashOptions: React.FC = () => {
  const [isSaltEnabled, setIsSaltEnabled] = useState(false)

  const handleSaltChange = (e : React.ChangeEvent<HTMLInputElement>): void => {
    setIsSaltEnabled(e.target.checked)
  }

  return (
    <>
      <Checkbox name="salt_check" onChange={handleSaltChange}>Salt</Checkbox>
      {isSaltEnabled && (
        <Form.Item name={["techniqueOptions", "salt_value"]}>
          <Input />
        </Form.Item>
      )}
    </>
  )
}

export default HashOptions
