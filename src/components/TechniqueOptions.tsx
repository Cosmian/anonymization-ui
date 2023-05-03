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
      {selected === "Fpe_string" && <FpeStringOptions />}
      {selected === "Fpe_float" && <FpeFloatOptions />}
      {selected === "Fpe_integer" && <FpeIntegerOptions />}
      {selected === "Mask_words" && <MaskWordsOptions />}
      {selected === "Tokenize_words" && <TokenizeWordsOptions />}
      {selected === "Regex" && <RegexOptions />}
      {selected === "Date_aggregation" && <DateAggregationOptions />}
      {selected === "Number_aggregation" && <NumberAggregationOptions />}
      {selected === "Rescaling" && <RescalingOptions />}
      {(selected === "Number_noise" || selected === "Date_noise") && <NoiseOptions form={form} columns={columns} getCorrelatedColumns={getCorrelatedColumns}/>}
    </>
  )
}

export default TechniqueOptions
