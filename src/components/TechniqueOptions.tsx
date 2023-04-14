import { FormInstance } from "antd"
import React from "react"
import { TechniqueType } from "../utils/utils"
import { DateAggregationOptions, NumberAggregationOptions } from "./techniqueOptions/AggregationOptions"
import { MaskWordsOptions, TokenizeWordsOptions } from "./techniqueOptions/BlockWords"
import FpeFloatOptions from "./techniqueOptions/FpeFloat"
import FpeIntegerOptions from "./techniqueOptions/FpeInteger"
import FpeStringOptions from "./techniqueOptions/FpeString"
import { HashArgonOptions, HashShaOptions } from "./techniqueOptions/Hash"
import { NoiseOptions } from "./techniqueOptions/NoiseOptions"
import { RegexOptions } from "./techniqueOptions/Regex"
import { RescalingOptions } from "./techniqueOptions/RescalingOptions"

interface TechniqueOptionsProps {
  selected: TechniqueType;
  form: FormInstance;
}

const TechniqueOptions: React.FC<TechniqueOptionsProps> = ({ selected, form }) => {

  return (
    <>
      {(selected === "Hash_sha256" || selected === "Hash_sha3") && (<HashShaOptions form={form} />)}
      {selected === "Hash_argon2" && (<HashArgonOptions form={form} />)}
      {selected === "Fpe_string" && (<FpeStringOptions />)}
      {selected === "Fpe_float" && (<FpeFloatOptions />)}
      {selected === "Fpe_integer" && (<FpeIntegerOptions />)}
      {selected === "Mask_words" && (<MaskWordsOptions />)}
      {selected === "Tokenize_words" && (<TokenizeWordsOptions />)}
      {selected === "Regex" && (<RegexOptions />)}
      {selected === "Date_aggregation" && (<DateAggregationOptions />)}
      {selected === "Number_aggregation" && (<NumberAggregationOptions />)}
      {selected === "Rescaling" && (<RescalingOptions />)}
      {selected === "Noise" && (<NoiseOptions form={form} />)}
    </>
  )
}

export default TechniqueOptions
