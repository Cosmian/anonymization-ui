import { Checkbox, Form, FormInstance, InputNumber, Select, Tag } from "antd"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Step } from "../../utils/utils"
import { getMethodOptions } from "../EditMethodBox"

interface NoiseOptionsProps {
  form: FormInstance
  columns: string[]
  getCorrelatedColumns: (uuid: string) => string[]
  step: Step
}

interface NoiseSubOptionsProps {
  form: FormInstance
  distribution: "Gaussian" | "Laplace" | "Uniform"
  fineTuning: boolean
  step: Step
}

interface DurationInputProps {
  label: string
  name: string
  fineTuning: boolean
  step: Step
}

export const NoiseOptions: React.FC<NoiseOptionsProps> = ({ form, columns, getCorrelatedColumns, step }) => {
  const [correlatedColumns, setCorrelatedColumns] = useState<string[]>([])
  const distribution = form.getFieldValue(["methodOptions", "distribution"])
  const correlationId: string = form.getFieldValue(["methodOptions", "correlation"])
  const dataType = form.getFieldValue("columnType")
  const correlated = form.getFieldValue(["methodOptions", "correlation"]) && correlatedColumns.length !== 0
  const fineTuning = form.getFieldValue(["methodOptions", "fineTuning"])

  useEffect(() => {
    setCorrelatedColumns(getCorrelatedColumns(correlationId))
  }, [correlationId])

  useEffect(() => {
    if (distribution !== "Uniform") {
      form.setFieldValue(["methodOptions", "lowerBoundary"], undefined)
      form.setFieldValue(["methodOptions", "upperBoundary"], undefined)
    } else {
      form.setFieldValue(["methodOptions", "mean"], undefined)
      form.setFieldValue(["methodOptions", "stdDev"], undefined)
    }
  }, [distribution])

  const setUuidCorrelation = (): void => {
    const uuid = uuidv4()
    form.setFieldValue(["methodOptions", "correlation"], uuid)
  }

  const noiseFormOptions = [
    { value: "Gaussian", label: "Gaussian" },
    { value: "Laplace", label: "Laplace" },
    { value: "Uniform", label: "Uniform" },
  ]

  return (
    <>
      {!correlated ? (
        <Form.Item
          valuePropName="checked"
          initialValue={undefined}
          style={{ marginBottom: 0 }}
          className="tags-list"
          name={["methodOptions", "correlation"]}
        >
          <>
            <Checkbox onChange={() => setUuidCorrelation()} disabled={columns.length < 2 || step === "finetuning"}>
              Apply correlated noise for columns:
            </Checkbox>
            {columns.map((name, index) => (
              <Tag key={index}>{name}</Tag>
            ))}
          </>
        </Form.Item>
      ) : (
        <b className="tags-list">
          Correlated noise applied between:
          {correlatedColumns.map((name, index) => (
            <Tag key={index}>{name}</Tag>
          ))}
        </b>
      )}
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
        name={["methodOptions", "distribution"]}
        label="Distribution"
        hidden={form.getFieldValue(["methodOptions", "fineTuning"]) && step === "local"}
        rules={[{ required: true, message: "Please select a value" }]}
      >
        <Select options={noiseFormOptions} />
      </Form.Item>
      {dataType === "Date" ? (
        <NoiseDateOptions form={form} distribution={distribution} fineTuning={fineTuning} step={step} />
      ) : (
        <NoiseNumberOptions form={form} distribution={distribution} fineTuning={fineTuning} step={step} />
      )}
    </>
  )
}

const NoiseNumberOptions: React.FC<NoiseSubOptionsProps> = ({ form, distribution, fineTuning, step }) => {
  const hiddenOptions: boolean = fineTuning && step === "local"
  return (
    <>
      <div className="box">
        {distribution !== "Uniform" ? (
          <>
            {!hiddenOptions && <div className="subtitle">Distribution's parameters:</div>}
            <Form.Item
              name={["methodOptions", "mean"]}
              label="Mean"
              className="option-parameter"
              rules={[{ required: true, message: "Please provide a value" }]}
              hidden={hiddenOptions}
            >
              <InputNumber min={0} step={1} precision={1} />
            </Form.Item>
            <Form.Item
              name={["methodOptions", "stdDev"]}
              label="Standard deviation"
              className="option-parameter"
              rules={[{ required: true, message: "Please provide a value" }]}
              hidden={hiddenOptions}
            >
              <InputNumber min={0} step={1} precision={1} />
            </Form.Item>
          </>
        ) : (
          <>
            {!hiddenOptions && <div className="subtitle">Distribution's range:</div>}
            <Form.Item
              name={["methodOptions", "lowerBoundary"]}
              label="Minimum"
              className="option-parameter"
              rules={[{ required: true, message: "Please provide a boundary" }]}
              hidden={hiddenOptions}
            >
              <InputNumber min={0} step={1} precision={1} />
            </Form.Item>
            <Form.Item
              name={["methodOptions", "upperBoundary"]}
              label="Maximum"
              className="option-parameter"
              rules={[{ required: true, message: "Please provide a boundary" }]}
              hidden={hiddenOptions}
            >
              <InputNumber min={form.getFieldValue(["methodOptions", "lowerBoundary"])} step={1} precision={1} />
            </Form.Item>
          </>
        )}
      </div>
    </>
  )
}

const DurationInput: React.FC<DurationInputProps> = ({ label, name, fineTuning, step }) => {
  return (
    <Form.Item label={label} className="option-parameter input-inline" hidden={fineTuning && step === "local"}>
      <>
        <Form.Item name={["methodOptions", name, "precision"]} rules={[{ required: true, message: "Please provide a value" }]}>
          <InputNumber min={0} step={1} precision={1} />
        </Form.Item>
        <Form.Item name={["methodOptions", name, "unit"]} rules={[{ required: true, message: "Please select a value" }]}>
          <Select
            options={[
              { value: "Minute", label: "Minute" },
              { value: "Hour", label: "Hour" },
              { value: "Day", label: "Day" },
              { value: "Month", label: "Month" },
              { value: "Year", label: "Year" },
            ]}
          />
        </Form.Item>
      </>
    </Form.Item>
  )
}

const NoiseDateOptions: React.FC<NoiseSubOptionsProps> = ({ distribution, fineTuning, step }) => {
  const hiddenOptions: boolean = fineTuning && step === "local"
  return (
    <div className="box">
      {distribution !== "Uniform" ? (
        <>
          {!hiddenOptions && <div className="subtitle">Distribution's parameters:</div>}
          <DurationInput label="Mean" name="mean" fineTuning={fineTuning} step={step} />
          <DurationInput label="Standard deviation" name="stdDev" fineTuning={fineTuning} step={step} />
        </>
      ) : (
        <>
          {!hiddenOptions && <div className="subtitle">Distribution's range:</div>}
          <DurationInput label="Lower boundary" name="lowerBoundary" fineTuning={fineTuning} step={step} />
          <DurationInput label="Upper boundary" name="upperBoundary" fineTuning={fineTuning} step={step} />
        </>
      )}
    </div>
  )
}
