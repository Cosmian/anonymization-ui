import { FormInstance } from "antd"
import React from "react"
import { MethodType, Step } from "../utils/utils"
import { DateAggregationOptions, NumberAggregationOptions } from "./methodOptions/Aggregation"
import { MaskWordsOptions, TokenizeWordsOptions } from "./methodOptions/BlockWords"
import { FpeIntegerOptions, FpeStringOptions } from "./methodOptions/Fpe"
import { HashOptions } from "./methodOptions/Hash"
import { NoiseOptions } from "./methodOptions/Noise"
import { RegexOptions } from "./methodOptions/Regex"
import { RescalingOptions } from "./methodOptions/Rescaling"

interface MethodOptionsProps {
  selected: MethodType
  form: FormInstance
  columns: string[]
  getCorrelatedColumns: (uuid: string) => string[]
  step: Step
}

const MethodOptions: React.FC<MethodOptionsProps> = ({ selected, form, columns, getCorrelatedColumns, step }) => {
  return (
    <>
      {selected === "Hash" && <HashOptions form={form} />}
      {selected === "FpeString" && <FpeStringOptions />}
      {selected === "FpeInteger" && <FpeIntegerOptions />}
      {selected === "MaskWords" && <MaskWordsOptions />}
      {selected === "TokenizeWords" && <TokenizeWordsOptions />}
      {selected === "Regex" && <RegexOptions />}
      {selected === "AggregationDate" && <DateAggregationOptions />}
      {(selected === "AggregationInteger" || selected === "AggregationFloat") && (
        <NumberAggregationOptions float={form.getFieldValue("columnType") === "Float"} />
      )}
      {(selected === "RescalingInteger" || selected === "RescalingFloat") && (
        <RescalingOptions form={form} hidden={form.getFieldValue(["methodOptions", "fineTuning"]) && step === "local"} step={step} />
      )}
      {(selected === "NoiseInteger" || selected === "NoiseFloat" || selected === "NoiseDate") && (
        <NoiseOptions form={form} columns={columns} getCorrelatedColumns={getCorrelatedColumns} step={step} />
      )}
    </>
  )
}

export default MethodOptions
