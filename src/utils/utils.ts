/* eslint-disable @typescript-eslint/no-explicit-any */

import { DefaultOptionType } from "antd/lib/select"

export type MetaData = { key: string, name: string, type: string, example: string, technique: undefined | string, techniqueOptions: undefined | string, result: undefined | string }

export type ConfigurationInfo = { name: string, created_at: string, file: string }

export type FileInfo = { last_modified: number, name: string, size: number, type: string }

export enum DataType {
  Integer = "Integer",
  Text = "Text",
  Float = "Float",
  Date = "Date",
  Boolean = "Boolean",
}

export enum TechniqueType {
  Hash = "Hash",
  Fpe_float = "Fpe_float",
  Fpe_integer = "Fpe_integer",
  Fpe_string = "Fpe_string",
}

export const dataTypesSelect: { value: string, label: string, example: string | number }[] = [
  { value: "Text", label: "Text", example: "This is a text" },
  { value: "Integer", label: "Integer", example: 42 },
  { value: "Float", label: "Float", example: 12.5 },
  { value: "Date", label: "Date", example: "12/02/2000" },
  { value: "Boolean", label: "Boolean", example: "True" },
]

export const techniquesForTypes: { Integer: DefaultOptionType[], Float: DefaultOptionType[],Text: DefaultOptionType[], Date: DefaultOptionType[], Boolean: DefaultOptionType[] } = {
  "Integer": [ { value: "Hash", label: "Hash" },  { value: "Fpe_integer", label: "FPE" }],
  "Float": [ { value: "Hash", label: "Hash" },  { value: "Fpe_float", label: "FPE" }],
  "Text": [ { value: "Hash", label: "Hash" },  { value: "Fpe_string", label: "FPE" }],
  "Date": [ { value: "Hash", label: "Hash" }],
  "Boolean": [ { value: "Hash", label: "Hash" }]
}

export const getCommonTechniques = (types: DataType[]): DefaultOptionType[] => {
  if (techniquesForTypes[types[0]]) {
    const commonObjects = techniquesForTypes[types[0]].map(technique => ({ value: technique.value, label: technique.label }))
    const typeObjects = types.map(type => new Set(techniquesForTypes[type].map(technique => technique.value)))
    return commonObjects.filter(technique => typeObjects.every(typeSet => typeSet.has(technique.value)))
  }
  return []
}
