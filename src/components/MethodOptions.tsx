import { FormInstance } from "antd"
import React from "react"
import { MethodType, Status } from "../utils/utils"
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
  status: Status
}

const MethodOptions: React.FC<MethodOptionsProps> = ({ selected, form, columns, getCorrelatedColumns, status }) => {
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
        <RescalingOptions hidden={form.getFieldValue(["methodOptions", "fineTuning"]) && status === "local"} status={status} />
      )}
      {(selected === "NoiseInteger" || selected === "NoiseFloat" || selected === "NoiseDate") && (
        <NoiseOptions form={form} columns={columns} getCorrelatedColumns={getCorrelatedColumns} status={status} />
      )}
    </>
  )
}

export default MethodOptions
