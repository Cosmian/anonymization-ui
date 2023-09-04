import { Checkbox, Form, FormInstance, InputNumber } from "antd"
import { Step } from "../../utils/utils"
import { getMethodOptions } from "../EditMethodBox"

interface RescalingOptionsProps {
  form: FormInstance
  hidden: boolean
  step: Step
}

export const RescalingOptions: React.FC<RescalingOptionsProps> = ({ form, hidden, step }) => {
  return (
    <>
      <Form.Item name={["methodOptions", "fineTuning"]} valuePropName="checked">
        <Checkbox
          checked={false}
          disabled={step === "finetuning"}
          // if finetuned is checked, inner form Items will be hidden but can be empty (differents options selected) - this will fill methodOptions with default values when checking fineTuning.
          onChange={() => form.setFieldsValue({ methodOptions: getMethodOptions(form.getFieldValue("columnMethod")) })}
        >
          This method needs fine-tuning
        </Checkbox>
      </Form.Item>
      <Form.Item
        name={["methodOptions", "mean"]}
        label="Mean"
        rules={[{ required: true, message: "Please provide a value" }]}
        hidden={hidden}
      >
        <InputNumber step={1} precision={1} />
      </Form.Item>
      <Form.Item
        name={["methodOptions", "stdDev"]}
        label="Standard deviation"
        rules={[{ required: true, message: "Please provide a value" }]}
        hidden={hidden}
      >
        <InputNumber step={1} precision={1} />
      </Form.Item>
      <Form.Item
        name={["methodOptions", "scale"]}
        label="Scale"
        rules={[{ required: true, message: "Please provide a value" }]}
        hidden={hidden}
      >
        <InputNumber step={1} precision={1} />
      </Form.Item>
      <Form.Item
        name={["methodOptions", "translation"]}
        label="Translation"
        rules={[{ required: true, message: "Please provide a value" }]}
        hidden={hidden}
      >
        <InputNumber step={1} precision={1} />
      </Form.Item>
    </>
  )
}
