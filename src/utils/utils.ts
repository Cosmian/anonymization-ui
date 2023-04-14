/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fpe } from "cloudproof_js"

import { notification } from "antd"
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
  Hash_sha256 = "Hash_sha256",
  Hash_sha3 = "Hash_sha3",
  Hash_argon2 = "Hash_argon2",
  Fpe_float = "Fpe_float",
  Fpe_integer = "Fpe_integer",
  Fpe_string = "Fpe_string",
  Mask_words = "Mask_words",
  Tokenize_words = "Tokenize_words",
  Regex = "Regex",
  DateAggregation = "Date_aggregation",
  NumberAggregation = "Number_aggregation",
  Noise = "Noise",
  Rescaling = "Rescaling"
}

export const dataTypesSelect: { value: string, label: string, example: string | number }[] = [
  { value: "Text", label: "Text", example: "This is a text" },
  { value: "Integer", label: "Integer", example: 42 },
  { value: "Float", label: "Float", example: 12.5 },
  { value: "Date", label: "Date", example: "12/02/2000" },
  { value: "Boolean", label: "Boolean", example: "True" },
]

export const techniquesForTypes: { Integer: DefaultOptionType[], Float: DefaultOptionType[],Text: DefaultOptionType[], Date: DefaultOptionType[], Boolean: DefaultOptionType[] } = {
  "Integer": [{ value: "Fpe_integer", label: "FPE" },  { value: "Number_aggregation", label: "Aggregation" }, { value: "Noise", label: "Noise" }, { value: "Rescaling", label: "Rescaling" }],
  "Float": [{ value: "Fpe_float", label: "FPE" },  { value: "Number_aggregation", label: "Aggregation" }, { value: "Noise", label: "Noise" }, { value: "Rescaling", label: "Rescaling" }],
  "Text": [{ value: "Hash_sha256", label: "Hash | sha256" }, { value: "Hash_sha3", label: "Hash | sha3" }, { value: "Hash_argon2", label: "Hash | argon2" }, { value: "Fpe_string", label: "FPE" }, { value: "Mask_words", label: "Mask words" }, { value: "Tokenize_words", label: "Tokenize words" }, { value: "Regex", label: "Regex" }],
  "Date": [{ value: "Date_aggregation", label: "Aggregation" }, { value: "Noise", label: "Noise" }],
  "Boolean": []
}

export const getCommonTechniques = (types: DataType[]): DefaultOptionType[] => {
  if (techniquesForTypes[types[0]]) {
    const commonObjects = techniquesForTypes[types[0]].map(technique => ({ value: technique.value, label: technique.label }))
    const typeObjects = types.map(type => new Set(techniquesForTypes[type].map(technique => technique.value)))
    return commonObjects.filter(technique => typeObjects.every(typeSet => typeSet.has(technique.value)))
  }
  return []
}

const FPE = await Fpe()
const key = crypto.getRandomValues(new Uint8Array(32))
const tweak = crypto.getRandomValues(new Uint8Array(1024))

export const applyTechnique = async (plainText: string | number, technique: TechniqueType, techniqueOptions: any): Promise<any> => {
  switch (technique) {
    case "Fpe_string":
    case "Fpe_float":
    case "Fpe_integer": {
      let result: string | number
      try {
        result = await FPE.encrypt(key, tweak, plainText, techniqueOptions)
      } catch {
        result = "Error - invalid options"
      }
      return result
    }
  }
}


export const downloadFile = async (name: string | undefined): Promise<void> => {
  if (name) {
    const item = sessionStorage.getItem(name)
    if (item) {
      const configuration: { metadata: MetaData[], configurationInfo: ConfigurationInfo } = JSON.parse(item)
      const fileName = "config-" + name
      // configuration.input_dataset.delimiter = ";"
      const json = JSON.stringify(configuration)
      const blob = new Blob([json], { type: "application/json" })
      const href = await URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = href
      link.download = fileName + ".json"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      notification.success({
        duration: 3,
        message: "Download",
        description: "File successfully downloaded.",
      })
    }
    else {
      notification.error({
        duration: 3,
        message: "Download",
        description: "An error occured.",
      })
    }
  } else {
    notification.error({
      duration: 3,
      message: "Download",
      description: "An error occured.",
    })
  }
}
