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


export const NoiseOptions: React.FC<NoiseOptionsProps> = ({ form, columns, getCorrelatedColumns }) => {
  const [correlatedColumns, setCorrelatedColumns] = useState<string[]>([])
  const distribution = form.getFieldValue(["techniqueOptions", "distribution"])
  const correlationId: string = form.getFieldValue(["techniqueOptions", "correlation"])
  const dataType = form.getFieldValue("columnType")

  useEffect(() => {
    // console.log(getCorrelatedColumns(correlationId))
    setCorrelatedColumns(getCorrelatedColumns(correlationId))
  }, [correlationId])

  useEffect(() => {
    if (distribution !== "Uniform" && dataType !== "Date") {
      form.setFieldValue(["techniqueOptions", "minBound"], undefined)
      form.setFieldValue(["techniqueOptions", "maxBound"], undefined)
    } else if (distribution !== "Uniform" && dataType === "Date") {
      form.setFieldValue(["techniqueOptions", "lowerRange"], undefined)
      form.setFieldValue(["techniqueOptions", "upperRange"], undefined)
    } else {
      form.setFieldValue(["techniqueOptions", "mean"], undefined)
      form.setFieldValue(["techniqueOptions", "stdDev"], undefined)
    }
  }, [distribution])

  const setUuidCorrelation= (): void => {
    const uuid = uuidv4()
    form.setFieldValue(["techniqueOptions", "correlation"], uuid)
  }

  return (
    <>
      <Form.Item name={["techniqueOptions", "distribution"]}
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
      {form.getFieldValue(["techniqueOptions", "correlation"]) === undefined && <Form.Item name="is_correlated" valuePropName="checked" initialValue={undefined} style={{ marginBottom: 0 }} className="tags-list">
        <Checkbox onChange={() => setUuidCorrelation()} disabled={columns.length < 2}>Apply correlated noise for columns:</Checkbox>
        <>
          {columns.map((name, index) => (
            <Tag key={index}>{name}</Tag>
          ))}
        </>
      </Form.Item>}
      {form.getFieldValue(["techniqueOptions", "correlation"]) !== undefined && <div className="tags-list">Correlated noise applied between:
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
            <Form.Item name={["techniqueOptions", "mean"]} label="Mean" className="radio-content" initialValue={0}
              rules={[{ required: true, message: "Please provide a value" }]}
            >
              <InputNumber
                min={0}
                step={1}
                precision={1}
              />
            </Form.Item>
            <Form.Item label="Standard deviation" className="radio-content input-inline">
                <Form.Item name={["techniqueOptions", "stdDev"]} initialValue={1}
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
            <div className="subtitle">Distribution's range:</div>
            <Form.Item name={["techniqueOptions", "minBound"]} label="Minimum" className="radio-content"
              rules={[{ required: true, message: "Please provide a boundary" }]}
            >
              <InputNumber
                min={0}
                step={1}
                precision={1}
              />
            </Form.Item>
            <Form.Item name={["techniqueOptions", "maxBound"]} label="Maximum" className="radio-content"
              rules={[{ required: true, message: "Please provide a boundary" }]}
            >
              <InputNumber
                min={form.getFieldValue(["techniqueOptions", "minBound"])}
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

const NoiseDateOptions: React.FC<NoiseSubOptionsProps> = ({ distribution }) => {
  return (
    <>
      <div className="box">
        {distribution !== "Uniform" ?
          <>
            <div className="subtitle">Distribution's parameters:</div>
            <Form.Item name={["techniqueOptions", "mean"]} label="Mean" className="radio-content" initialValue={0}
              rules={[{ required: true, message: "Please provide a value" }]}
            >
              <InputNumber
                min={0}
                step={1}
                precision={1}
              />
            </Form.Item>
            <Form.Item label="Standard deviation" className="radio-content input-inline">
                <>
                <Form.Item name={["techniqueOptions", "stdDev", "precision"]} initialValue={1}
                  rules={[{ required: true, message: "Please provide a value" }]}
                >
                    <InputNumber
                      min={0}
                      step={1}
                      precision={1}
                    />
                  </Form.Item>
                  <Form.Item  name={["techniqueOptions", "stdDev", "unit"]} initialValue="Minute">
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
          </>
        :
          <>
          <div className="subtitle">Distribution's range:</div>
            <Form.Item label="Lower range boundary" className="radio-content input-inline">
              <Form.Item name={["techniqueOptions", "lowerRange", "precision"]} initialValue={1}
                rules={[{ required: true, message: "Please provide a value" }]}
              >
                <InputNumber
                  min={0}
                  step={1}
                  precision={1}
                />
                </Form.Item>
                <Form.Item  name={["techniqueOptions", "lowerRange", "unit"]} initialValue="Minute">
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
              </Form.Item>
            <Form.Item label="Upper range boundary" className="radio-content input-inline">
              <Form.Item name={["techniqueOptions", "upperRange", "precision"]} initialValue={1}
                rules={[{ required: true, message: "Please provide a value" }]}
              >
                  <InputNumber
                    min={0}
                    step={1}
                    precision={1}
                  />
                </Form.Item>
                <Form.Item  name={["techniqueOptions", "upperRange", "unit"]} initialValue="Minute">
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
              </Form.Item>
          </>
        }
      </div>
    </>
  )
}
