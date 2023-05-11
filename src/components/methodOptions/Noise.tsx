import { Checkbox, Form, FormInstance, InputNumber, Select, Tag } from "antd"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

interface NoiseOptionsProps {
  form: FormInstance;
  columns: string[];
  getCorrelatedColumns: (uuid: string) => string[]
}

interface NoiseSubOptionsProps {
  form: FormInstance;
  distribution: string;
}

interface DurationInputProps {
  label: string;
  name: string;
}

export const NoiseOptions: React.FC<NoiseOptionsProps> = ({ form, columns, getCorrelatedColumns }) => {
  const [correlatedColumns, setCorrelatedColumns] = useState<string[]>([])
  const distribution = form.getFieldValue(["methodOptions", "distribution"])
  const correlationId: string = form.getFieldValue(["methodOptions", "correlation"])
  const dataType = form.getFieldValue("columnType")

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

  const setUuidCorrelation= (): void => {
    const uuid = uuidv4()
    form.setFieldValue(["methodOptions", "correlation"], uuid)
  }

  return (
    <>
      <Form.Item name={["methodOptions", "distribution"]}
        label="Distribution"
        initialValue="Gaussian"
      >
        <Select
          options={[
            { value: "Gaussian", label: "Gaussian" },
            { value: "Laplacian", label: "Laplacian" },
            { value: "Uniform", label: "Uniform" },
          ]}
        />
      </Form.Item>
      {dataType === "Date" ? <NoiseDateOptions form={form} distribution={distribution} /> : <NoiseNumberOptions form={form} distribution={distribution} />}
      {(form.getFieldValue(["methodOptions", "correlation"]) === undefined || correlatedColumns.length === 0) && <Form.Item name="is_correlated" valuePropName="checked" initialValue={undefined} style={{ marginBottom: 0 }} className="tags-list">
        <Checkbox onChange={() => setUuidCorrelation()} disabled={columns.length < 2}>Apply correlated noise for columns:</Checkbox>
        <>
          {columns.map((name, index) => (
            <Tag key={index}>{name}</Tag>
          ))}
        </>
      </Form.Item>}
      {form.getFieldValue(["methodOptions", "correlation"]) !== undefined && correlatedColumns.length > 1 && <div className="tags-list">Correlated noise applied between:
        <>
          {correlatedColumns.map((name, index) => (
            <Tag key={index}>{name}</Tag>
          ))}
        </>
      </div>}
    </>
  )
}

const NoiseNumberOptions: React.FC<NoiseSubOptionsProps> = ({ form, distribution }) => {
  return (
    <>
      <div className="box">
        {distribution !== "Uniform" ?
          <>
            <div className="subtitle">Distribution's parameters:</div>
            <Form.Item name={["methodOptions", "mean"]} label="Mean" className="radio-content" initialValue={0}
              rules={[{ required: true, message: "Please provide a value" }]}
            >
              <InputNumber
                min={0}
                step={1}
                precision={1}
              />
            </Form.Item>
            <Form.Item label="Standard deviation" className="radio-content input-inline">
                <Form.Item name={["methodOptions", "stdDev"]} initialValue={1}
                  rules={[{ required: true, message: "Please provide a value" }]}
                >
                  <InputNumber
                    min={0}
                    step={1}
                    precision={1}
                  />
                </Form.Item>
            </Form.Item>
          </>
        :
          <>
            <div className="subtitle">Distribution's upperBoundary:</div>
            <Form.Item name={["methodOptions", "lowerBoundary"]} label="Minimum" className="radio-content"
              rules={[{ required: true, message: "Please provide a boundary" }]}
            >
              <InputNumber
                min={0}
                step={1}
                precision={1}
              />
            </Form.Item>
            <Form.Item name={["methodOptions", "upperBoundary"]} label="Maximum" className="radio-content"
              rules={[{ required: true, message: "Please provide a boundary" }]}
            >
              <InputNumber
                min={form.getFieldValue(["methodOptions", "lowerBoundary"])}
                step={1}
                precision={1}
              />
            </Form.Item>
          </>
        }
      </div>
    </>
  )
}

const DurationInput: React.FC<DurationInputProps> = ({ label, name }) => {
  return (
    <Form.Item label={label} className="radio-content input-inline">
      <>
        <Form.Item name={["methodOptions", name, "precision"]} initialValue={1}
          rules={[{ required: true, message: "Please provide a value" }]}
        >
          <InputNumber
            min={0}
            step={1}
            precision={1}
          />
        </Form.Item>
        <Form.Item  name={["methodOptions", name, "unit"]} initialValue="Day">
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

const NoiseDateOptions: React.FC<NoiseSubOptionsProps> = ({ distribution }) => {
  return (
    <>
      <div className="box">
        {distribution !== "Uniform" ?
          <>
            <div className="subtitle">Distribution's parameters:</div>
            <DurationInput label="Mean" name="mean" />
            <DurationInput label="Standard deviation" name="stdDev" />
          </>
        :
          <>
            <div className="subtitle">Distribution's range:</div>
            <DurationInput label="Lower boundary" name="lowerBoundary" />
            <DurationInput label="Upper boundary" name="upperBoundary" />
          </>
        }
      </div>
    </>
  )
}
