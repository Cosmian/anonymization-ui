import { FormInstance } from "antd"
import React from "react"
import { TechniqueType } from "../utils/utils"
import { DateAggregationOptions, NumberAggregationOptions } from "./techniqueOptions/Aggregation"
import { MaskWordsOptions, TokenizeWordsOptions } from "./techniqueOptions/BlockWords"
import FpeFloatOptions from "./techniqueOptions/FpeFloat"
import FpeIntegerOptions from "./techniqueOptions/FpeInteger"
import FpeStringOptions from "./techniqueOptions/FpeString"
import { HashOptions } from "./techniqueOptions/Hash"
import { NoiseOptions } from "./techniqueOptions/Noise"
import { RegexOptions } from "./techniqueOptions/Regex"
import { RescalingOptions } from "./techniqueOptions/Rescaling"

interface TechniqueOptionsProps {
  selected: TechniqueType;
  form: FormInstance;
  columns: string[];
  getCorrelatedColumns: (uuid: string) => string[]
}

const TechniqueOptions: React.FC<TechniqueOptionsProps> = ({ selected, form, columns, getCorrelatedColumns }) => {

  return (
    <>
      {selected === "Hash" && <HashOptions form={form} />}
      {selected === "FpeString" && <FpeStringOptions />}
      {selected === "FpeFloat" && <FpeFloatOptions />}
      {selected === "FpeInteger" && <FpeIntegerOptions />}
      {selected === "MaskWords" && <MaskWordsOptions />}
      {selected === "TokenizeWords" && <TokenizeWordsOptions />}
      {selected === "Regex" && <RegexOptions />}
      {selected === "AggregationDate" && <DateAggregationOptions />}
      {(selected === "AggregationInteger" || selected === "AggregationFloat") && <NumberAggregationOptions />}
      {(selected === "RescalingInteger" || selected === "RescalingFloat") && <RescalingOptions />}
      {(selected === "NoiseInteger" || selected === "NoiseFloat" || selected === "NoiseDate") && <NoiseOptions form={form} columns={columns} getCorrelatedColumns={getCorrelatedColumns} />}
    </>
  )
}

export default TechniqueOptions
