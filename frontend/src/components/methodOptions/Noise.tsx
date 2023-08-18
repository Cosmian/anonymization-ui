import { Checkbox, Form, FormInstance, InputNumber, Select, Tag } from "antd"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Status } from "../../utils/utils"

interface NoiseOptionsProps {
  form: FormInstance
  columns: string[]
  getCorrelatedColumns: (uuid: string) => string[]
  status: Status
}

interface NoiseSubOptionsProps {
  form: FormInstance
  distribution: "Gaussian" | "Laplace" | "Uniform"
  notCorrelated: boolean
  fineTuning: boolean
  status: Status
}

interface DurationInputProps {
  label: string
  name: string
  notCorrelated: boolean
  fineTuning: boolean
  status: Status
}

export const NoiseOptions: React.FC<NoiseOptionsProps> = ({ form, columns, getCorrelatedColumns, status }) => {
  const [correlatedColumns, setCorrelatedColumns] = useState<string[]>([])
  const distribution = form.getFieldValue(["methodOptions", "distribution"])
  const correlationId: string = form.getFieldValue(["methodOptions", "correlation"])
  const dataType = form.getFieldValue("columnType")
  const notCorrelated = !form.getFieldValue(["methodOptions", "correlation"]) || correlatedColumns.length === 0
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
      {notCorrelated ? (
        <Form.Item
          valuePropName="checked"
          initialValue={undefined}
          style={{ marginBottom: 0 }}
          className="tags-list"
          name={["methodOptions", "correlation"]}
        >
          <>
            <Checkbox onChange={() => setUuidCorrelation()} disabled={columns.length < 2}>
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
        <Checkbox checked={false} disabled={status === "open"}>
          This method needs fine-tuning
        </Checkbox>
      </Form.Item>
      {(!form.getFieldValue(["methodOptions", "fineTuning"]) || status === "open") && (
        <>
          <Form.Item name={["methodOptions", "distribution"]} label="Distribution">
            <Select
              disabled={(!notCorrelated || form.getFieldValue(["methodOptions", "fineTuning"])) && status !== "open"}
              options={noiseFormOptions}
            />
          </Form.Item>
          {dataType === "Date" ? (
            <NoiseDateOptions
              form={form}
              distribution={distribution}
              notCorrelated={notCorrelated}
              fineTuning={fineTuning}
              status={status}
            />
          ) : (
            <NoiseNumberOptions
              form={form}
              distribution={distribution}
              notCorrelated={notCorrelated}
              fineTuning={fineTuning}
              status={status}
            />
          )}
        </>
      )}
    </>
  )
}

const NoiseNumberOptions: React.FC<NoiseSubOptionsProps> = ({ form, distribution, notCorrelated, fineTuning, status }) => {
  return (
    <>
      <div className="box">
        {distribution !== "Uniform" ? (
          <>
            <div className="subtitle">Distribution's parameters:</div>
            <Form.Item
              name={["methodOptions", "mean"]}
              label="Mean"
              className="option-parameter"
              rules={[{ required: true, message: "Please provide a value" }]}
            >
              <InputNumber disabled={(!notCorrelated || fineTuning) && status !== "open"} min={0} step={1} precision={1} />
            </Form.Item>
            <Form.Item
              name={["methodOptions", "stdDev"]}
              label="Standard deviation"
              className="option-parameter"
              rules={[{ required: true, message: "Please provide a value" }]}
            >
              <InputNumber disabled={(!notCorrelated || fineTuning) && status !== "open"} min={0} step={1} precision={1} />
            </Form.Item>
          </>
        ) : (
          <>
            <div className="subtitle">Distribution's range:</div>
            <Form.Item
              name={["methodOptions", "lowerBoundary"]}
              label="Minimum"
              className="option-parameter"
              rules={[{ required: true, message: "Please provide a boundary" }]}
            >
              <InputNumber disabled={(!notCorrelated || fineTuning) && status !== "open"} min={0} step={1} precision={1} />
            </Form.Item>
            <Form.Item
              name={["methodOptions", "upperBoundary"]}
              label="Maximum"
              className="option-parameter"
              rules={[{ required: true, message: "Please provide a boundary" }]}
            >
              <InputNumber
                disabled={(!notCorrelated || fineTuning) && status !== "open"}
                min={form.getFieldValue(["methodOptions", "lowerBoundary"])}
                step={1}
                precision={1}
              />
            </Form.Item>
          </>
        )}
      </div>
    </>
  )
}

const DurationInput: React.FC<DurationInputProps> = ({ label, name, notCorrelated, fineTuning, status }) => {
  return (
    <Form.Item label={label} className="option-parameter input-inline">
      <>
        <Form.Item name={["methodOptions", name, "precision"]} rules={[{ required: true, message: "Please provide a value" }]}>
          <InputNumber disabled={(!notCorrelated || fineTuning) && status !== "open"} min={0} step={1} precision={1} />
        </Form.Item>
        <Form.Item name={["methodOptions", name, "unit"]}>
          <Select
            disabled={(!notCorrelated || fineTuning) && status !== "open"}
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

const NoiseDateOptions: React.FC<NoiseSubOptionsProps> = ({ distribution, notCorrelated, fineTuning, status }) => {
  return (
    <div className="box">
      {distribution !== "Uniform" ? (
        <>
          <div className="subtitle">Distribution's parameters:</div>
          <DurationInput label="Mean" name="mean" notCorrelated={notCorrelated} fineTuning={fineTuning} status={status} />
          <DurationInput label="Standard deviation" name="stdDev" notCorrelated={notCorrelated} fineTuning={fineTuning} status={status} />
        </>
      ) : (
        <>
          <div className="subtitle">Distribution's range:</div>
          <DurationInput
            label="Lower boundary"
            name="lowerBoundary"
            notCorrelated={notCorrelated}
            fineTuning={fineTuning}
            status={status}
          />
          <DurationInput
            label="Upper boundary"
            name="upperBoundary"
            notCorrelated={notCorrelated}
            fineTuning={fineTuning}
            status={status}
          />
        </>
      )}
    </div>
  )
}
