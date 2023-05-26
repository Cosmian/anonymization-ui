/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fpe } from "cloudproof_js"

import { notification } from "antd"
import { DefaultOptionType } from "antd/lib/select"
import localForage from "localforage"

export type MetaData = { key: string, name: string, type: string, example: string, method: undefined | string, methodOptions: undefined | { [key: string]: string }, result: undefined | string }

export type ConfigurationInfo = { uuid: string, name: string, created_at: string, file: string, delimiter: string }

export type FileInfo = { last_modified: number, name: string, size: number, type: string }

export enum DataType {
  Integer = "Integer",
  Text = "Text",
  Float = "Float",
  Date = "Date",
}

export enum MethodType {
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

export const methodsForTypes: { Integer: DefaultOptionType[], Float: DefaultOptionType[], Text: DefaultOptionType[], Date: DefaultOptionType[] } = {
  "Integer": [{ value: "FpeInteger", label: "Format Preserving Encryption (FPE)" },  { value: "AggregationInteger", label: "Aggregation" }, { value: "NoiseInteger", label: "Noise" }, { value: "RescalingInteger", label: "Rescaling" }],
  "Float": [{ value: "FpeFloat", label: "Format Preserving Encryption (FPE)" },  { value: "AggregationFloat", label: "AggregationFloat" }, { value: "NoiseFloat", label: "Noise" }, { value: "RescalingFloat", label: "Rescaling" }],
  "Text": [{ value: "Hash", label: "Hash" }, { value: "FpeString", label: "Format Preserving Encryption (FPE)" }, { value: "MaskWords", label: "Mask words" }, { value: "TokenizeWords", label: "Tokenize words" }, { value: "Regex", label: "Regex" }],
  "Date": [{ value: "AggregationDate", label: "Aggregation" }, { value: "NoiseDate", label: "Noise" }],
}

export const methodsInfo: { [key: string]: string } = {
  "Hash": "Transforms data into a fixed-length representation that is difficult to reverse and provides a high level of anonymity.\n\nThree hash methods are available :\n- SHA2  : Fast but vulnerable to brute-force attacks.\n- SHA3 : Resistant to brute-force attacks, but slower than SHA-256 and not as widely supported.\n- Argon2: Highly resistant to brute-force attacks, but can be slower than other hash functions and may require more memory.\nAn optional salt can be provided, required with Argon2.",
  "FpeFloat": "FPE aims to encrypt floats while retaining their format. FPE-FF1 is a normalized algorithm that uses symmetric encryption.\nIt provides support for encrypting floats of type f64.",
  "FpeInteger": "FPE aims to encrypt integers while retaining their format. FPE-FF1 is a normalized algorithm that uses symmetric encryption.\nIt offers the ability to encrypt integers with a radix of 10 and up to a maximum power of this radix.",
  "FpeString": "FPE aims to encrypt plaintext while retaining its format (alphabet). FPE-FF1 is a normalized algorithm that uses symmetric encryption. It provides the ability to encrypt a plaintext using an alphabet.\n/!\\ Characters of the plaintext that belong to the alphabet are encrypted while the others are left unchanged at their original location in the ciphertext.",
  "MaskWords": "This method can be used to hide certain sensitive words from your dataset. These words are masked, i.e. replaced with XXXX.\nAlso, please note that this system does not provide any way to recover the original data.",
  "TokenizeWords": "This method can be used to hide certain sensitive words from your dataset. These words are tokenized, i.e. replace with a non-deterministic UID.\nDuring the anonymization, every occurrence of a word that is in the words list will be tokenized by the same UID. But if you create new anonymization, a new UID will be generated, even if the word is the same.\nAlso, please note that this system does not provide any way to decipher the token and recover the original data.",
  "Regex": "This method replace every occurence of a given pattern with a provided string.",
  "AggregationDate": "Round down dates based on the specified time unit.",
  "AggregationInteger": "Round numbers to a desired power of ten.",
  "AggregationFloat": "Round numbers to a desired power of ten.",
  "NoiseDate": "This method aims to partially hide data, adding noise, while preserving data's statistical distribution. The noise can be sampled from three distributions : Gaussian, Laplacian and Uniform, of which you have to specify parameters.\n\nSampled noise is always different between runs, but can be correlated between columns, by selecting mutliple columns and checking the correlation option.",
  "NoiseInteger": "This method aims to partially hide data, adding noise, while preserving data's statistical distribution. The noise can be sampled from three distributions : Gaussian, Laplacian and Uniform, of which you have to specify parameters.\n\nSampled noise is always different between runs, but can be correlated between columns, by selecting mutliple columns and checking the correlation option.",
  "NoiseFloat": "This method aims to partially hide data, adding noise, while preserving data's statistical distribution. The noise can be sampled from three distributions : Gaussian, Laplacian and Uniform, of which you have to specify parameters.\n\nSampled noise is always different between runs, but can be correlated between columns, by selecting mutliple columns and checking the correlation option.",
  "RescalingInteger": "This method aims to partially hide data, while applying normalization and linear transformation to a column. One must provide the mean and standard deviation of the data, as well as the scaling parameters.\n\n /!\\ Keep in mind that these parameters are sensitive, as they allow to recover the original data.",
  "RescalingFloat": "This method aims to partially hide data, while applying normalization and linear transformation to a column. One must provide the mean and standard deviation of the data, as well as the scaling parameters.\n\n /!\\ Keep in mind that these parameters are sensitive, as they allow to recover the original data."
}

export const getCommonMethods = (types: DataType[]): DefaultOptionType[] => {
  if (methodsForTypes[types[0]]) {
    const commonObjects = methodsForTypes[types[0]].map(method => ({ value: method.value, label: method.label }))
    const typeObjects = types.map(type => new Set(methodsForTypes[type].map(method => method.value)))
    return commonObjects.filter(method => typeObjects.every(typeSet => typeSet.has(method.value)))
  }
  return []
}

const FPE = await Fpe()
const key = crypto.getRandomValues(new Uint8Array(32))
const tweak = crypto.getRandomValues(new Uint8Array(1024))

export const applyMethod = async (plainText: string | number, method: MethodType, methodOptions: any): Promise<any> => {
  // TODO: Get exported methods Options
  switch (method) {
    case "FpeString":
    case "FpeFloat":
    case "FpeInteger": {
      let result: string | number
      try {
        const res = await FPE.encrypt(key, tweak, plainText, methodOptions)
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
      return
    }
  }
  notification.error({
    duration: 3,
    message: "Download",
    description: "An error occured.",
  })
}

export const uploadFile = async (uuid: string | undefined): Promise<void> => {
  if (uuid) {
    const configuration: { configurationInfo: ConfigurationInfo, metadata: MetaData[] } | null = await localForage.getItem(uuid)
    // const formData = new FormData()
    // const json = JSON.stringify(configuration)
    // const file = new Blob([json], { type: "application/json" })
    // formData.append("file", file, configuration.configurationInfo.name + ".json")
    const response = await fetch("http://localhost:8000/api/configurations", {
      method: "POST",
      // headers: {
      //   "Accept": "application/json",
      //   "Content-Type": "application/json"
      // },
      body: JSON.stringify(configuration)
    })
    if (response.ok) {
      notification.success({
        duration: 3,
        message: "Upload",
        description: "File successfully uploaded on microservice.",
      })
      return
    }
    notification.error({
      duration: 3,
      message: "Upload",
      description: "An error occured.",
    })
  }
}
