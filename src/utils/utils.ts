/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fpe } from "cloudproof_js"

import { notification } from "antd"
import { DefaultOptionType } from "antd/lib/select"
import localForage from "localforage"

export type MetaData = { key: string, name: string, type: string, example: string, technique: undefined | string, techniqueOptions: undefined | string, result: undefined | string }

export type ConfigurationInfo = { uuid: string, name: string, created_at: string, file: string }

export type FileInfo = { last_modified: number, name: string, size: number, type: string }

export enum DataType {
  Integer = "Integer",
  Text = "Text",
  Float = "Float",
  Date = "Date",
}

export enum TechniqueType {
  Hash = "Hash",
  FpeFloat = "FpeFloat",
  FpeInteger = "FpeInteger",
  FpeString = "FpeString",
  MaskWords = "MaskWords",
  TokenizeWords = "TokenizeWords",
  Regex = "Regex",
  AggregationDate = "AggregationDate",
  AggregationInteger = "AggregationInteger",
  AggregationFloat = "AggregationFloat",
  NoiseDate = "NoiseDate",
  NoiseInteger = "NoiseInteger",
  NoiseFloat = "NoiseFloat",
  RescalingInteger = "RescalingInteger",
  RescalingFloat = "RescalingFloat"
}

export const dataTypesSelect: { value: string, label: string, example: string | number }[] = [
  { value: "Text", label: "Text", example: "This is a text" },
  { value: "Integer", label: "Integer", example: 42 },
  { value: "Float", label: "Float", example: 12.5 },
  { value: "Date", label: "Date", example: "12/02/2000" },
]

export const techniquesForTypes: { Integer: DefaultOptionType[], Float: DefaultOptionType[], Text: DefaultOptionType[], Date: DefaultOptionType[] } = {
  "Integer": [{ value: "FpeInteger", label: "FPE" },  { value: "AggregationInteger", label: "Aggregation" }, { value: "NoiseInteger", label: "Noise" }, { value: "RescalingInteger", label: "Rescaling" }],
  "Float": [{ value: "FpeFloat", label: "FPE" },  { value: "AggregationFloat", label: "AggregationFloat" }, { value: "NoiseFloat", label: "Noise" }, { value: "RescalingFloat", label: "Rescaling" }],
  "Text": [{ value: "Hash", label: "Hash" }, { value: "FpeString", label: "FPE" }, { value: "MaskWords", label: "Mask words" }, { value: "TokenizeWords", label: "Tokenize words" }, { value: "Regex", label: "Regex" }],
  "Date": [{ value: "AggregationDate", label: "Aggregation" }, { value: "NoiseDate", label: "Noise" }],
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
  // TODO: Get exported techniques Options
  switch (technique) {
    case "FpeString":
    case "FpeFloat":
    case "FpeInteger": {
      let result: string | number
      try {
        const res = await FPE.encrypt(key, tweak, plainText, techniqueOptions)
        result = typeof(res) === "bigint" ? Number(res) : res
      } catch (e: any) {
        result = "Error - " + e.match(/\(([^)]+)\)/)[1]
      }
      return result
    }
  }
}


export const downloadFile = async (uuid: string | undefined): Promise<void> => {
  if (uuid) {
    const configuration: { configurationInfo: ConfigurationInfo, metadata: MetaData[] } | null = await localForage.getItem(uuid)
    if (configuration) {
      const fileName = "config-" + configuration.configurationInfo.name
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
