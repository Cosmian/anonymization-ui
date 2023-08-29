import { Checkbox, Form, InputNumber } from "antd"
import { Status } from "../../utils/utils"

interface RescalingOptionsProps {
  hidden: boolean
  status: Status
}

export const RescalingOptions: React.FC<RescalingOptionsProps> = ({ hidden, status }) => {
  return (
    <>
      <Form.Item name={["methodOptions", "fineTuning"]} valuePropName="checked">
        <Checkbox checked={false} disabled={status === "open"}>
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
