import QuestionCircleFilled from "@ant-design/icons/lib/icons/QuestionCircleFilled"
import ReloadOutlined from "@ant-design/icons/lib/icons/ReloadOutlined"
import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Select, Skeleton, Space } from "antd"
import { PBKDF2, SHA256 } from "crypto-js"
import { round, trim } from "lodash"
import React, { FC, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { roundDate, roundNumber } from "../../../../actions/anonymizations/aggregate"
import { blockWords } from "../../../../actions/anonymizations/block-words"
import { addNoiseToDate, gaussian, laplace } from "../../../../actions/anonymizations/noise-technique"
import { prettyDate } from "../../../../actions/PrettyDates/PrettyDate"
import {
  AddNoise,
  Aggregate,
  AggregationType,
  BlockType,
  BlockWords,
  DataType,
  Hash,
  HashFunction,
  Metadata,
  NoiseType,
  PrecisionType,
  Technique,
  TechniqueOptions,
} from "../../../../redux/reducers/ciphercompute/anonymization/types"
import { disableTechnique } from "../EditTechnique"
import OptionPanel from "./OptionPanel"

type TechniqueOptionProps = {
  activeRow: Metadata
  openInfo: (technique: Technique) => void
  onCancel: () => void
  onSave: (rowKey: number, technique: Technique, technique_options?: TechniqueOptions, treated_example?: string) => void
  onChangeTechnique: (technique: Technique) => void
}
const TechniqueOption: FC<TechniqueOptionProps> = ({ activeRow, openInfo, onCancel, onSave, onChangeTechnique }) => {
  const [activeTechnique, setActiveTechnique] = useState(activeRow.technique as Technique)
  const [hashOptions, setHashOptions] = useState<Hash>()
  const [salt, setSalt] = useState("")
  const [displaySalt, setDisplaySalt] = useState(true)
  const [aggregationOptions, setAggregationOptions] = useState<Aggregate>()
  const [addnoiseOptions, setAddnoiseOptions] = useState<AddNoise>()
  const [blocwordsOptions, setBlockwordsOptions] = useState<BlockWords>()
  const [treated, setTreated] = useState("")
  const [form] = Form.useForm()

  // update active row from parent
  useEffect(() => {
    setActiveTechnique(activeRow.technique)
  }, [activeRow])

  // Default options
  useEffect(() => {
    switch (activeTechnique) {
      case Technique.Hash:
        // Hash
        const newSalt = uuidv4()
        setHashOptions({
          hash_function: HashFunction.SHA256,
          salt: newSalt,
        })
        setSalt(newSalt)
        setTreated("")
        break
      case Technique.Aggregate:
        // Aggregate
        if (activeRow.type === DataType.Date) {
          setAggregationOptions({
            aggregation_type: AggregationType.Round,
            precision: PrecisionType.Minute,
          })
        } else if (activeRow.type === DataType.Float || activeRow.type === DataType.Integer) {
          setAggregationOptions({
            aggregation_type: AggregationType.Round,
            precision: 1,
          })
        }
        setTreated("")
        break
      case Technique.AddNoise:
        // AddNoise
        if (activeRow.type === DataType.Date) {
          setAddnoiseOptions({
            noise_type: NoiseType.Gaussian,
            standard_deviation: 10,
            precision_type: PrecisionType.Year,
          })
        } else if (activeRow.type === DataType.Float || activeRow.type === DataType.Integer) {
          setAddnoiseOptions({
            noise_type: NoiseType.Gaussian,
            standard_deviation: 1,
          })
        }
        setTreated("")
        break
      case Technique.BlockWords:
        // Block words
        setBlockwordsOptions({
          block_type: BlockType.Mask,
          word_list: [],
        })
        setTreated("")
        break
      case Technique.None:
        setHashOptions(undefined)
    }
  }, [activeTechnique, activeRow])

  // Output example
  useEffect(() => {
    switch (activeTechnique) {
      case Technique.Hash:
        // Hash
        if (hashOptions != null && hashOptions.hash_function != null) {
          if (hashOptions.hash_function === HashFunction.SHA256) {
            let hashedResult = ""
            if (hashOptions.salt == null) {
              hashedResult = SHA256(activeRow.example).toString()
            } else {
              hashedResult = SHA256(activeRow.example + hashOptions.salt).toString()
            }
            setTreated(hashedResult)
          } else if (hashOptions.hash_function === HashFunction.PBKDF2 && hashOptions.salt != null) {
            const hashedResult = PBKDF2(activeRow.example, hashOptions.salt).toString()
            setTreated(hashedResult)
          }
        }
        break
      case Technique.Aggregate:
        // Aggregate (round)
        if (aggregationOptions != null && aggregationOptions.aggregation_type != null) {
          if (activeRow.type === DataType.Integer || activeRow.type === DataType.Float) {
            const output = roundNumber(Number(activeRow.example), Number(aggregationOptions.precision))
            setTreated(output.toString())
          }
          if (activeRow.type === DataType.Date) {
            const output = roundDate(activeRow.example, aggregationOptions.precision as PrecisionType)
            setTreated(output.toUTCString())
          }
        }
        break
      case Technique.AddNoise:
        // AddNoise
        if (addnoiseOptions != null && addnoiseOptions.standard_deviation != null) {
          if (activeRow.type === DataType.Integer || activeRow.type === DataType.Float) {
            const before = Number(activeRow.example)
            const stdDeviation = Number(addnoiseOptions.standard_deviation)
            let noise: number
            if (addnoiseOptions.noise_type === NoiseType.Gaussian) {
              noise = gaussian(before, stdDeviation)
            } else {
              noise = laplace(before, stdDeviation)
            }
            if (activeRow.type === DataType.Integer) {
              noise = Math.round(noise)
              setTreated(noise.toString())
            } else {
              noise = round(noise, 2)
              setTreated(noise.toString())
            }
          } else if (activeRow.type === DataType.Date) {
            const date = new Date(activeRow.example)
            const output = addNoiseToDate(
              date,
              NoiseType.Gaussian,
              addnoiseOptions.precision_type as PrecisionType,
              addnoiseOptions.standard_deviation
            )
            setTreated(output.toUTCString())
          }
        }
        break
      case Technique.BlockWords:
        // Block words
        if (blocwordsOptions != null && blocwordsOptions.word_list != null) {
          let result: string
          if (blocwordsOptions.block_type === BlockType.Tokenize) {
            result = blockWords(activeRow.example, blocwordsOptions.word_list, true)
          } else {
            result = blockWords(activeRow.example, blocwordsOptions.word_list)
          }
          setTreated(result)
        }
        break
      default:
        // No technique
        setTreated("")
    }
  }, [hashOptions, aggregationOptions, addnoiseOptions, blocwordsOptions])

  // Form handlers
  const handleOnChangeTechnique = (value: Technique): void => {
    setActiveTechnique(value)
    onChangeTechnique(value as Technique)
  }
  const updateHashOptions = (): void => {
    const values = form.getFieldsValue()
    const options = {
      hash_function: values.hash_function,
      ...((values.issalt || values.hash_function === HashFunction.PBKDF2) && {
        salt: values.salt,
      }),
    }
    setHashOptions(options)
  }
  const updateSalt = (): void => {
    const newSalt = uuidv4()
    form.setFieldsValue({
      salt: newSalt,
    })
    const options = {
      hash_function: hashOptions?.hash_function,
      salt: newSalt,
    }
    setSalt(newSalt)
    setHashOptions(options as Hash)
  }
  const handleDisplaySalt = (): void => {
    const values = form.getFieldsValue()
    setDisplaySalt(values.is_salt)
    const options: Hash = {
      hash_function: hashOptions?.hash_function as HashFunction,
    }
    if (values.is_salt) {
      options.salt = salt
    }
    setHashOptions(options as Hash)
  }
  const handleChangeSalt = (salt: string): void => {
    setSalt(salt)
    const options = {
      hash_function: hashOptions?.hash_function,
      salt: salt,
    }
    setHashOptions(options as Hash)
  }
  const updateAggregationOptions = (): void => {
    const values = form.getFieldsValue()
    setAggregationOptions(values)
  }
  const updateAddNoiseOptions = (): void => {
    const values = form.getFieldsValue()
    const options: AddNoise = {
      noise_type: values.noise_type,
      standard_deviation: values.standard_deviation,
      precision_type: values.precision_type,
    }
    setAddnoiseOptions(options)
  }
  const updateBlocWordsOptions = (): void => {
    let values = form.getFieldsValue()
    const wordList: string[] = values.word_list.map((word: string) => trim(word))
    values = {
      block_type: values.block_type,
      word_list: wordList,
    }
    setBlockwordsOptions(values)
  }

  // Set value for output > after
  const outputAfterValue = (): string => {
    if (activeTechnique === Technique.None && activeRow.type === DataType.Date) {
      return prettyDate(activeRow.example)
    } else if (activeTechnique === Technique.None && activeRow.type !== DataType.Date) {
      return activeRow.example
    } else return treated
  }

  // Handle [Cancel] and [Save] buttons
  const handleSaveTechnique = async (): Promise<void> => {
    try {
      await form.validateFields()
      switch (activeTechnique) {
        case Technique.Hash:
          return onSave(activeRow.key, activeTechnique, hashOptions as Hash, treated)
        case Technique.Aggregate:
          return onSave(activeRow.key, activeTechnique, aggregationOptions as Aggregate, treated)
        case Technique.AddNoise:
          return onSave(activeRow.key, activeTechnique, addnoiseOptions as AddNoise, treated)
        case Technique.BlockWords:
          return onSave(activeRow.key, activeTechnique, blocwordsOptions as BlockWords, treated)
        case Technique.None:
          return onSave(activeRow.key, activeTechnique)
        default:
          return onSave(activeRow.key, Technique.None)
      }
    } catch {
      form.scrollToField("salt")
    }
  }
  const handleOnCancel = (): void => {
    onCancel()
  }

  if (
    aggregationOptions == null &&
    hashOptions == null &&
    addnoiseOptions == null &&
    blocwordsOptions == null &&
    activeTechnique !== Technique.None
  ) {
    return <Skeleton />
  }

  return (
    <OptionPanel>
      <OptionPanel.Title>{activeRow.name}</OptionPanel.Title>
      <OptionPanel.Technique>
        <Select style={{ width: "100%" }} value={activeTechnique} onChange={(value) => handleOnChangeTechnique(value)}>
          <Select.Option value={Technique.None} disabled={disableTechnique(activeRow.type, Technique.None)}>
            {Technique.None}
          </Select.Option>
          <Select.Option value={Technique.Hash} disabled={disableTechnique(activeRow.type, Technique.Hash)}>
            {Technique.Hash}
          </Select.Option>
          <Select.Option value={Technique.Aggregate} disabled={disableTechnique(activeRow.type, Technique.Aggregate)}>
            {Technique.Aggregate}
          </Select.Option>
          <Select.Option value={Technique.AddNoise} disabled={disableTechnique(activeRow.type, Technique.AddNoise)}>
            {Technique.AddNoise}
          </Select.Option>
          <Select.Option value={Technique.BlockWords} disabled={disableTechnique(activeRow.type, Technique.BlockWords)}>
            {Technique.BlockWords}
          </Select.Option>
        </Select>
      </OptionPanel.Technique>
      <OptionPanel.MoreInfo onClick={() => openInfo(activeTechnique)}>
        {activeTechnique !== Technique.None && (
          <>
            <QuestionCircleFilled style={{ fontSize: 20 }} />
            <p>
              Give me more information about <span className="strong">{activeTechnique}</span> technique.
            </p>
          </>
        )}
      </OptionPanel.MoreInfo>
      <OptionPanel.Parameters>
        {(() => {
          switch (activeTechnique) {
            case Technique.None:
              return (
                <>
                  <p>No parameter</p>
                </>
              )
            case Technique.Hash:
              if (hashOptions == null) {
                return <Skeleton />
              } else {
                return (
                  <>
                    <Form form={form} name="hash_technique">
                      <Form.Item name="hash_function" initialValue={hashOptions.hash_function}>
                        <Select style={{ width: "100%" }} onChange={updateHashOptions}>
                          <Select.Option value={HashFunction.SHA256}>{HashFunction.SHA256}</Select.Option>
                          <Select.Option value={HashFunction.PBKDF2}>{HashFunction.PBKDF2}</Select.Option>
                        </Select>
                      </Form.Item>
                      <Row>
                        <Col flex="100px">
                          {hashOptions.hash_function === HashFunction.SHA256 && (
                            <Form.Item name="is_salt" valuePropName="checked" initialValue={true} style={{ marginBottom: 0 }}>
                              <Checkbox onChange={() => handleDisplaySalt()}>Add salt</Checkbox>
                            </Form.Item>
                          )}
                          {hashOptions.hash_function === HashFunction.PBKDF2 && (
                            <Form.Item name="is_salt" valuePropName="checked" initialValue={true} style={{ marginBottom: 0 }}>
                              <Checkbox checked={true} disabled>
                                Add salt
                              </Checkbox>
                            </Form.Item>
                          )}
                        </Col>
                        {displaySalt && (
                          <Col flex="auto">
                            <Space style={{ width: "100%", justifyContent: "flex-start", alignItems: "flex-start" }}>
                              <Form.Item
                                name="salt"
                                initialValue={hashOptions.salt}
                                style={{ width: "100%" }}
                                rules={[{ required: true, message: "Salt is mandatory" }]}
                              >
                                <Input onChange={(event) => handleChangeSalt(event.target.value)} />
                              </Form.Item>
                              <Button type="primary" onClick={updateSalt}>
                                <ReloadOutlined />
                              </Button>
                            </Space>
                          </Col>
                        )}
                      </Row>
                    </Form>
                  </>
                )
              }
            case Technique.Aggregate:
              if (aggregationOptions == null) {
                return <Skeleton />
              } else {
                return (
                  <>
                    <Form form={form} name="aggregate_technique">
                      <Form.Item name="aggregation_type" initialValue={aggregationOptions.aggregation_type}>
                        <Select style={{ width: "100%" }} onChange={updateAggregationOptions}>
                          <Select.Option value={AggregationType.Round}>{AggregationType.Round}</Select.Option>
                          <Select.Option value={AggregationType.GroupByInterval} disabled>
                            {AggregationType.GroupByInterval}
                          </Select.Option>
                        </Select>
                      </Form.Item>
                      {activeRow.type === DataType.Date && (
                        <Space style={{ alignItems: "center" }}>
                          <p style={{ marginBottom: 24 }}>Precision: </p>
                          <Form.Item name="precision" initialValue={aggregationOptions.precision}>
                            <Select style={{ width: "100%" }} onChange={updateAggregationOptions}>
                              <Select.Option value={PrecisionType.Year}>{PrecisionType.Year}</Select.Option>
                              <Select.Option value={PrecisionType.Month}>{PrecisionType.Month}</Select.Option>
                              <Select.Option value={PrecisionType.Day}>{PrecisionType.Day}</Select.Option>
                              <Select.Option value={PrecisionType.Hour}>{PrecisionType.Hour}</Select.Option>
                              <Select.Option value={PrecisionType.Minute}>{PrecisionType.Minute}</Select.Option>
                            </Select>
                          </Form.Item>
                        </Space>
                      )}
                      {(activeRow.type === DataType.Integer || activeRow.type === DataType.Float) && (
                        <Space style={{ alignItems: "center" }}>
                          <p style={{ marginBottom: 24 }}>Precision: </p>
                          <Form.Item name="precision" initialValue={aggregationOptions.precision}>
                            <InputNumber onChange={updateAggregationOptions} />
                          </Form.Item>
                        </Space>
                      )}
                    </Form>
                  </>
                )
              }
            case Technique.AddNoise:
              if (addnoiseOptions == null) {
                return <Skeleton />
              } else {
                return (
                  <>
                    <Form form={form} name="addnoise_technique">
                      <Form.Item name="noise_type" initialValue={addnoiseOptions.noise_type}>
                        <Select style={{ width: "100%" }} onChange={updateAddNoiseOptions}>
                          <Select.Option value={NoiseType.Gaussian}>{NoiseType.Gaussian}</Select.Option>
                          <Select.Option value={NoiseType.Laplace}>{NoiseType.Laplace}</Select.Option>
                        </Select>
                      </Form.Item>
                      {(activeRow.type === DataType.Integer || activeRow.type === DataType.Float) && (
                        <Space style={{ alignItems: "center" }}>
                          <p style={{ marginBottom: 24 }}>Standard deviation: </p>
                          <Form.Item name="standard_deviation" initialValue={addnoiseOptions.standard_deviation}>
                            <InputNumber onChange={updateAddNoiseOptions} />
                          </Form.Item>
                        </Space>
                      )}
                      {activeRow.type === DataType.Date && (
                        <>
                          <p>Standard deviation: </p>
                          <Form.Item name="precision_type" initialValue={addnoiseOptions.precision_type}>
                            <Select onChange={updateAddNoiseOptions}>
                              <Select.Option value={PrecisionType.Year}>{PrecisionType.Year}</Select.Option>
                              <Select.Option value={PrecisionType.Month}>{PrecisionType.Month}</Select.Option>
                              <Select.Option value={PrecisionType.Day}>{PrecisionType.Day}</Select.Option>
                              <Select.Option value={PrecisionType.Hour}>{PrecisionType.Hour}</Select.Option>
                              <Select.Option value={PrecisionType.Minute}>{PrecisionType.Minute}</Select.Option>
                              <Select.Option value={PrecisionType.Second}>{PrecisionType.Second}</Select.Option>
                            </Select>
                          </Form.Item>
                          <Form.Item name="standard_deviation" initialValue={addnoiseOptions.standard_deviation}>
                            <InputNumber onChange={updateAddNoiseOptions} />
                          </Form.Item>
                        </>
                      )}
                    </Form>
                  </>
                )
              }
            case Technique.BlockWords:
              if (blocwordsOptions == null) {
                return <Skeleton />
              } else {
                return (
                  <>
                    <Form form={form} name="blocknoise_technique">
                      <Form.Item name="block_type" initialValue={blocwordsOptions.block_type}>
                        <Select style={{ width: "100%" }} onChange={updateBlocWordsOptions}>
                          <Select.Option value={BlockType.Mask}>{BlockType.Mask}</Select.Option>
                          <Select.Option value={BlockType.Tokenize}>{BlockType.Tokenize}</Select.Option>
                        </Select>
                      </Form.Item>
                      {activeRow.type === DataType.Text && (
                        <>
                          <p style={{ marginBottom: ".5em" }}>Word list: </p>
                          <Form.Item name="word_list" initialValue={blocwordsOptions.word_list}>
                            <Select
                              mode="tags"
                              style={{ width: "100%" }}
                              allowClear
                              placeholder={`Type words to ${blocwordsOptions.block_type}`}
                              onChange={updateBlocWordsOptions}
                            />
                          </Form.Item>
                        </>
                      )}
                    </Form>
                  </>
                )
              }
          }
        })()}
      </OptionPanel.Parameters>
      <OptionPanel.Outputs>
        <div className="flex-wrap">
          <div>Before</div>
          <div>
            <Input
              value={activeRow.type === DataType.Date ? new Date(activeRow.example).toUTCString() : activeRow.example}
              id="before_output"
            />
          </div>
        </div>
        <div className="flex-wrap">
          <div>After</div>
          <div>
            <Input value={outputAfterValue()} id="after_output" />
          </div>
        </div>
      </OptionPanel.Outputs>
      <OptionPanel.Buttons>
        <Button size="large" type="default" onClick={handleOnCancel}>
          Cancel
        </Button>
        <Button size="large" type="primary" onClick={handleSaveTechnique}>
          Save
        </Button>
      </OptionPanel.Buttons>
    </OptionPanel>
  )
}

export default TechniqueOption
