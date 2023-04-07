import React from "react"
import { TechniqueType } from "../utils/utils"
import FpeFloatOptions from "./techniqueOptions/FpeFloat"
import FpeIntegerOptions from "./techniqueOptions/FpeInteger"
import FpeStringOptions from "./techniqueOptions/FpeString"
import HashOptions from "./techniqueOptions/Hash"

interface TechniqueOptionsProps {
  selected: TechniqueType;
}

const TechniqueOptions: React.FC<TechniqueOptionsProps> = ({ selected }) => {

  return (
    <>
      {selected === "Hash" && (<HashOptions />)}
      {selected === "Fpe_string" && (<FpeStringOptions />)}
      {selected === "Fpe_float" && (<FpeFloatOptions />)}
      {selected === "Fpe_integer" && (<FpeIntegerOptions />)}
    </>
  )
}

export default TechniqueOptions
