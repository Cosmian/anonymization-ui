import React from "react"
import { TechniqueType } from "../utils/utils"
import HashOptions from "./techniqueOptions/Hash"

interface TechniqueOptionsProps {
  selected: TechniqueType;
}

const TechniqueOptions: React.FC<TechniqueOptionsProps> = ({ selected }) => {

  return (
    <>
      {selected === "Hash" && (<HashOptions />)}
    </>
  )
}

export default TechniqueOptions
