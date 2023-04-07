import { Form, Input } from "antd"


const HashOptions: React.FC = () => {
  // const [isSaltEnabled, setIsSaltEnabled] = useState(false)

  // const handleSaltChange = (e : React.ChangeEvent<HTMLFormElement>): void => {
  //   setIsSaltEnabled(e.target.checked)
  // }

  return (
    <>
      {/* <Checkbox name="salt_check" onChange={handleSaltChange}>Salt</Checkbox> */}
      {/* {isSaltEnabled && ( */}
        <Form.Item name={["techniqueOptions", "salt_value"]} label="Salt">
          <Input />
        </Form.Item>
      {/* )} */}
    </>
  )
}

export default HashOptions
