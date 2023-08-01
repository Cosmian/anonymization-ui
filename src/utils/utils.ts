/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Anonymization, Fpe } from "cloudproof_js"

import { notification } from "antd"
import { DefaultOptionType } from "antd/lib/select"
import { Anonymization, Fpe } from "cloudproof_js"
import localForage from "localforage"

export type MetaData = {
  key: string
  name: string
  type: string
  example: string
  method: undefined | string
  methodOptions: undefined | { [key: string]: string }
  result: undefined | string
}

export type ConfigurationInfo = { uuid: string; name: string; created_at: string; file: string; delimiter: string }

export type FileInfo = { last_modified: number; name: string; size: number; type: string }

export enum DataType {
  Integer = "Integer",
  Text = "Text",
  Float = "Float",
  Date = "Date",
}

export enum MethodType {
  Hash = "Hash",
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
  RescalingFloat = "RescalingFloat",
  DeleteColumn = "DeleteColumn"
}

export const dataTypesSelect: { value: string; label: string; example: string | number }[] = [
  { value: "Text", label: "Text", example: "This is a text" },
  { value: "Integer", label: "Integer", example: 42 },
  { value: "Float", label: "Float", example: 12.5 },
  { value: "Date", label: "Date", example: "12/02/2000" },
]

export const methodsForTypes: {
  Integer: DefaultOptionType[]
  Float: DefaultOptionType[]
  Text: DefaultOptionType[]
  Date: DefaultOptionType[]
} = {
  Integer: [
    { value: "FpeInteger", label: "FPE" },
    { value: "AggregationInteger", label: "Aggregation" },
    { value: "NoiseInteger", label: "Noise" },
    { value: "RescalingInteger", label: "Rescaling" },
  ],
  Float: [
    { value: "AggregationFloat", label: "AggregationFloat" },
    { value: "NoiseFloat", label: "Noise" },
    { value: "RescalingFloat", label: "Rescaling" },
  ],
  Text: [
    { value: "Hash", label: "Hash" },
    { value: "FpeString", label: "FPE" },
    { value: "MaskWords", label: "Mask words" },
    { value: "TokenizeWords", label: "Tokenize words" },
    { value: "Regex", label: "Regex" },
  ],
  Date: [
    { value: "AggregationDate", label: "Aggregation" },
    { value: "NoiseDate", label: "Noise" },
  ],
}

export const methodsInfo: { [key: string]: string } = {
  Hash: "Transforms data into a fixed-length representation that is difficult to reverse and provides a high level of anonymity.\n\nThree hash methods are available :\n- SHA2  : Fast but vulnerable to brute-force attacks.\n- SHA3 : Resistant to brute-force attacks, but slower than SHA-256 and not as widely supported.\n- Argon2: Highly resistant to brute-force attacks, but can be slower than other hash functions and may require more memory.\nAn optional salt can be provided, required with Argon2.",
  FpeFloat:
    "FPE aims to encrypt floats while retaining their format. FPE-FF1 is a normalized algorithm that uses symmetric encryption.\nIt provides support for encrypting floats of type f64.",
  FpeInteger:
    "FPE aims to encrypt integers while retaining their format. FPE-FF1 is a normalized algorithm that uses symmetric encryption.\nIt offers the ability to encrypt integers with a radix of 10 and up to a maximum power of this radix.",
  FpeString:
    "FPE aims to encrypt plaintext while retaining its format (alphabet). FPE-FF1 is a normalized algorithm that uses symmetric encryption. It provides the ability to encrypt a plaintext using an alphabet.\n/!\\ Characters of the plaintext that belong to the alphabet are encrypted while the others are left unchanged at their original location in the ciphertext.",
  MaskWords:
    "This method can be used to hide certain sensitive words from your dataset. These words are masked, i.e. replaced with XXXX.\nAlso, please note that this system does not provide any way to recover the original data.",
  TokenizeWords:
    "This method can be used to hide certain sensitive words from your dataset. These words are tokenized, i.e. replace with a non-deterministic UID.\nDuring the anonymization, every occurrence of a word that is in the words list will be tokenized by the same UID. But if you create new anonymization, a new UID will be generated, even if the word is the same.\nAlso, please note that this system does not provide any way to decipher the token and recover the original data.",
  Regex: "This method replace every occurence of a given pattern with a provided string.",
  AggregationDate: "Round down dates based on the specified time unit.",
  AggregationInteger: "Round numbers to a desired power of ten.",
  AggregationFloat: "Round numbers to a desired power of ten.",
  NoiseDate:
    "This method aims to partially hide data, adding noise, while preserving data's statistical distribution. The noise can be sampled from three distributions : Gaussian, Laplace and Uniform, of which you have to specify parameters.\n\nSampled noise is always different between runs, but can be correlated between columns, by selecting mutliple columns and checking the correlation option.",
  NoiseInteger:
    "This method aims to partially hide data, adding noise, while preserving data's statistical distribution. The noise can be sampled from three distributions : Gaussian, Laplace and Uniform, of which you have to specify parameters.\n\nSampled noise is always different between runs, but can be correlated between columns, by selecting mutliple columns and checking the correlation option.",
  NoiseFloat:
    "This method aims to partially hide data, adding noise, while preserving data's statistical distribution. The noise can be sampled from three distributions : Gaussian, Laplace and Uniform, of which you have to specify parameters.\n\nSampled noise is always different between runs, but can be correlated between columns, by selecting mutliple columns and checking the correlation option.",
  RescalingInteger:
    "This method aims to partially hide data, while applying normalization and linear transformation to a column. One must provide the mean and standard deviation of the data, as well as the scaling parameters.\n\n /!\\ Keep in mind that these parameters are sensitive, as they allow to recover the original data.",
  RescalingFloat:
    "This method aims to partially hide data, while applying normalization and linear transformation to a column. One must provide the mean and standard deviation of the data, as well as the scaling parameters.\n\n /!\\ Keep in mind that these parameters are sensitive, as they allow to recover the original data.",
}

export const getCommonMethods = (types: DataType[]): DefaultOptionType[] => {
  if (methodsForTypes[types[0]]) {
    const commonObjects = methodsForTypes[types[0]].map((method) => ({ value: method.value, label: method.label }))
    const typeObjects = types.map((type) => new Set(methodsForTypes[type].map((method) => method.value)))
    return commonObjects.filter((method) => typeObjects.every((typeSet) => typeSet.has(method.value)))
  }
  return []
}

const key = new Uint8Array([
  156, 161, 173, 90, 39, 41, 113, 3, 99, 144, 48, 69, 70, 3, 86, 154, 39, 215, 6, 55, 242, 50, 149, 176, 242, 31, 123, 180, 97, 129, 141,
  232,
])
const tweak = new Uint8Array([
  27, 195, 246, 165, 228, 175, 100, 67, 97, 148, 12, 138, 27, 120, 179, 58, 55, 186, 239, 236, 5, 177, 11, 14, 164, 148, 244, 103, 182, 156,
  178, 227, 68, 16, 226, 200, 44, 163, 93, 250, 175, 101, 3, 146, 88, 44, 163, 37, 107, 150, 110, 246, 252, 170, 237, 158, 170, 11, 88, 34,
  113, 91, 159, 16, 37, 171, 254, 177, 157, 87, 219, 214, 243, 58, 47, 195, 131, 133, 215, 22, 178, 0, 237, 246, 204, 118, 206, 170, 152,
  121, 184, 38, 203, 109, 178, 131, 173, 74, 185, 132, 58, 26, 3, 58, 124, 198, 242, 1, 244, 245, 154, 198, 178, 139, 238, 253, 206, 236,
  111, 78, 219, 1, 91, 237, 171, 235, 54, 229, 209, 119, 2, 113, 75, 84, 94, 25, 214, 87, 239, 79, 48, 56, 35, 150, 159, 207, 246, 200, 15,
  23, 226, 4, 80, 178, 115, 233, 175, 249, 220, 94, 129, 100, 79, 28, 118, 183, 222, 48, 192, 4, 224, 30, 108, 32, 160, 225, 2, 21, 58, 230,
  206, 230, 87, 60, 22, 174, 5, 181, 161, 200, 216, 80, 5, 5, 123, 59, 146, 88, 223, 48, 22, 34, 195, 141, 225, 74, 180, 228, 101, 82, 106,
  86, 144, 106, 27, 123, 119, 147, 46, 125, 134, 89, 161, 153, 77, 99, 209, 116, 152, 114, 191, 141, 119, 244, 176, 88, 252, 208, 151, 37,
  186, 98, 147, 144, 42, 180, 51, 32, 239, 36, 30, 184, 11, 58, 70, 116, 132, 215, 172, 66, 58, 210, 105, 3, 220, 130, 149, 14, 63, 91, 63,
  143, 175, 21, 78, 80, 8, 183, 166, 227, 241, 28, 206, 177, 223, 81, 68, 136, 156, 229, 33, 142, 3, 228, 201, 109, 61, 11, 100, 50, 216,
  164, 158, 36, 92, 112, 213, 108, 181, 23, 122, 34, 208, 242, 194, 159, 72, 172, 107, 173, 48, 254, 122, 9, 202, 164, 156, 163, 9, 38, 91,
  137, 133, 102, 98, 37, 179, 81, 44, 69, 18, 249, 244, 247, 28, 42, 195, 252, 147, 202, 254, 215, 215, 235, 100, 176, 123, 255, 78, 111,
  97, 27, 159, 119, 37, 122, 96, 93, 25, 136, 183, 76, 101, 112, 22, 224, 230, 178, 137, 195, 157, 154, 20, 231, 148, 133, 163, 67, 148,
  154, 201, 203, 60, 33, 229, 98, 34, 112, 91, 77, 193, 81, 202, 33, 230, 124, 76, 54, 167, 6, 33, 170, 203, 17, 149, 171, 14, 55, 249, 217,
  32, 235, 66, 9, 148, 156, 181, 182, 89, 216, 122, 103, 198, 25, 170, 112, 154, 149, 121, 125, 11, 180, 157, 160, 243, 205, 110, 81, 190,
  3, 176, 13, 0, 197, 254, 9, 134, 119, 26, 163, 235, 119, 63, 224, 210, 174, 130, 163, 153, 106, 19, 53, 11, 7, 1, 252, 122, 133, 245, 225,
  71, 76, 172, 34, 39, 103, 109, 88, 90, 25, 103, 238, 231, 167, 198, 187, 118, 104, 17, 204, 15, 247, 223, 7, 231, 100, 0, 5, 121, 124,
  248, 69, 4, 242, 165, 249, 71, 147, 163, 45, 169, 35, 78, 180, 125, 16, 127, 17, 230, 47, 221, 249, 246, 36, 114, 253, 2, 40, 54, 61, 167,
  50, 86, 238, 1, 123, 129, 101, 167, 111, 23, 231, 13, 207, 229, 235, 116, 16, 151, 36, 142, 149, 141, 132, 12, 140, 206, 32, 157, 195, 79,
  30, 54, 149, 178, 223, 91, 56, 110, 243, 0, 216, 118, 203, 2, 241, 14, 108, 108, 116, 40, 255, 136, 249, 218, 241, 130, 124, 49, 95, 99,
  42, 86, 50, 165, 244, 134, 98, 141, 69, 168, 50, 149, 29, 84, 151, 194, 87, 26, 30, 18, 217, 200, 109, 168, 109, 100, 211, 136, 87, 60,
  242, 142, 213, 12, 168, 158, 148, 54, 184, 72, 144, 88, 11, 138, 83, 232, 4, 89, 63, 229, 86, 63, 151, 198, 215, 211, 194, 146, 123, 252,
  24, 156, 65, 13, 218, 101, 45, 64, 39, 164, 235, 161, 19, 115, 175, 198, 194, 156, 59, 68, 10, 148, 0, 75, 130, 123, 192, 86, 158, 188,
  226, 238, 233, 208, 63, 229, 90, 239, 95, 16, 20, 136, 50, 30, 47, 106, 200, 100, 184, 251, 230, 244, 156, 4, 78, 149, 250, 7, 47, 24,
  163, 63, 99, 217, 39, 70, 239, 92, 66, 8, 155, 211, 228, 242, 153, 236, 238, 175, 210, 241, 1, 231, 159, 31, 6, 83, 22, 36, 213, 139, 71,
  241, 187, 41, 94, 137, 241, 228, 190, 159, 175, 103, 98, 28, 92, 156, 220, 229, 34, 232, 185, 209, 86, 108, 149, 187, 105, 237, 93, 194,
  246, 61, 57, 164, 31, 17, 255, 37, 166, 167, 70, 213, 226, 156, 12, 125, 155, 28, 222, 96, 199, 220, 122, 245, 56, 184, 55, 161, 88, 208,
  207, 228, 110, 116, 111, 86, 195, 179, 200, 153, 156, 47, 11, 63, 67, 209, 217, 245, 235, 233, 28, 8, 184, 149, 206, 130, 95, 195, 41, 3,
  2, 214, 22, 24, 10, 164, 245, 216, 66, 65, 1, 215, 178, 188, 187, 213, 228, 46, 220, 228, 104, 237, 92, 120, 224, 69, 103, 44, 109, 101,
  254, 60, 25, 77, 138, 29, 220, 195, 105, 133, 160, 195, 108, 26, 218, 255, 111, 251, 12, 148, 172, 217, 86, 206, 143, 12, 227, 16, 17,
  176, 67, 86, 0, 188, 151, 140, 70, 91, 157, 137, 53, 68, 107, 66, 155, 83, 147, 164, 102, 116, 69, 10, 50, 156, 212, 251, 199, 12, 135,
  91, 49, 151, 171, 236, 253, 44, 120, 193, 211, 115, 1, 223, 59, 188, 11, 118, 91, 199, 68, 107, 150, 235, 184, 173, 31, 33, 21, 19, 221,
  228, 150, 46, 129, 237, 215, 32, 149, 53, 58, 208, 52, 114, 43, 210, 81, 187, 197, 148, 193, 106, 115, 64, 214, 107, 130, 21, 84, 254,
  165, 84, 132, 94, 242, 194, 246, 130, 216, 50, 193, 146, 96, 67, 101, 135, 52, 125, 76, 59, 81, 199, 38, 48, 241, 252, 209, 205, 114, 110,
  62, 0, 238, 226, 76,
])

interface FpeOptions {
  alphabet?: string
  additionalCharacters?: string
  radix?: number
  digits?: number
}

export const applyMethod = async (clearInput: string | number, method: MethodType, methodOptions: any): Promise<any> => {
  const FPE = await Fpe()
  const anonymization = await Anonymization()
  if (!methodOptions) return undefined
  switch (method) {
    case "FpeString": {
      const options: FpeOptions = {
        alphabet: methodOptions.alphabet,
        additionalCharacters: methodOptions.extendWith,
      }
      try {
        const res = await FPE.encrypt(key, tweak, clearInput.toString(), options)
        const result = typeof res === "bigint" ? Number(res) : res
        return result
      } catch (error) {
        return parseError(error)
      }
    }
    case "FpeInteger": {
      const options: FpeOptions = {
        alphabet: "numeric",
        radix: 10,
        digits: methodOptions.digit,
      }
      try {
        const res = await FPE.encrypt(key, tweak, clearInput.toString(), options)
        const result = typeof res === "bigint" ? Number(res) : res
        return result
      } catch (error) {
        return parseError(error)
      }
    }
    case "Hash": {
      if (methodOptions.hashType == null) return
      try {
        const hasher = new anonymization.Hasher(methodOptions.hashType, methodOptions.saltValue)
        const digest = hasher.apply(clearInput.toString())
        return digest
      } catch (error) {
        return parseError(error)
      }
    }
    case "MaskWords": {
      if (methodOptions.wordsList == null) return undefined
      try {
        const wordMasker = new anonymization.WordMasker(methodOptions.wordsList)
        const safeStr = wordMasker.apply(clearInput.toString())
        return safeStr
      } catch (error) {
        return parseError(error)
      }
    }
    case "TokenizeWords": {
      if (methodOptions.wordsList == null) return
      try {
        const wordTokenizer = new anonymization.WordTokenizer(methodOptions.wordsList)
        const safeStr = wordTokenizer.apply(clearInput.toString())
        return safeStr
      } catch (error) {
        return parseError(error)
      }
    }
    case "Regex": {
      if (methodOptions.pattern == null || methodOptions.replace == null) return
      try {
        const patternMatcher = new anonymization.WordPatternMasker(methodOptions.pattern, methodOptions.replace)
        const matchedStr = patternMatcher.apply(clearInput.toString())
        return matchedStr
      } catch (error) {
        return parseError(error)
      }
    }
    case "AggregationInteger":
    case "AggregationFloat": {
      if (methodOptions.powerOfTen == null) return
      try {
        const intAggregator = new anonymization.NumberAggregator(methodOptions.powerOfTen)
        const res = intAggregator.apply(Number(clearInput))
        return res
      } catch (error) {
        return parseError(error)
      }
    }
    case "AggregationDate": {
      if (methodOptions.timeUnit == null) return
      try {
        const date = new Date(clearInput).toISOString()
        const timeAggregator = new anonymization.DateAggregator(methodOptions.timeUnit)
        const outputDateStr = timeAggregator.apply(date)
        return new Date(outputDateStr).toISOString()
      } catch (error) {
        return parseError(error)
      }
    }
    case "NoiseDate": {
      try {
        const date = new Date(clearInput).toISOString()
        if (methodOptions.distribution === "Uniform") {
          if (methodOptions.lowerBoundary == null || methodOptions.upperBoundary == null) return
          const noiseParams = {
            methodName: methodOptions.distribution,
            mean: (methodOptions.lowerBoundary.precision as number) * datePrecisionFactor(methodOptions.lowerBoundary.unit),
            stdDev: (methodOptions.upperBoundary.precision as number) * datePrecisionFactor(methodOptions.upperBoundary.unit),
          }
          const noiser = new anonymization.NoiseWithBounds(noiseParams.methodName, noiseParams.mean, noiseParams.stdDev)
          const noisyDate = noiser.apply(date)
          return noisyDate
        } else {
          if (methodOptions.mean == null || methodOptions.stdDev == null) return
          const noiseParams = {
            methodName: methodOptions.distribution,
            mean: (methodOptions.mean.precision as number) * datePrecisionFactor(methodOptions.mean.unit),
            stdDev: (methodOptions.stdDev.precision as number) * datePrecisionFactor(methodOptions.stdDev.unit),
          }
          const noiser = new anonymization.NoiseWithParameters(noiseParams.methodName, noiseParams.mean, noiseParams.stdDev)
          const noisyDate = noiser.apply(date)
          return noisyDate
        }
      } catch (error) {
        return parseError(error)
      }
    }
    case "NoiseInteger":
    case "NoiseFloat": {
      try {
        if (methodOptions.distribution === "Uniform") {
          if (methodOptions.lowerBoundary == null || methodOptions.upperBoundary == null) return
          const noiser = new anonymization.NoiseWithBounds(
            methodOptions.distribution,
            methodOptions.lowerBoundary,
            methodOptions.upperBoundary
          )
          const noisyData = noiser.apply(Number(clearInput))
          return noisyData
        } else {
          if (methodOptions.mean == null || methodOptions.stdDev == null) return
          const noiser = new anonymization.NoiseWithParameters(methodOptions.distribution, methodOptions.mean, methodOptions.stdDev)
          const noisyData = noiser.apply(Number(clearInput))
          return noisyData
        }
      } catch (error) {
        return parseError(error)
      }
    }
    case "RescalingInteger":
    case "RescalingFloat": {
      if (methodOptions.mean == null || methodOptions.stdDev == null || methodOptions.scale == null || methodOptions.translation == null)
        return
      try {
        const scaler = new anonymization.NumberScaler(
          methodOptions.mean,
          methodOptions.stdDev,
          methodOptions.scale,
          methodOptions.translation
        )
        const result = scaler.apply(Number(clearInput))
        return result
      } catch (error) {
        return parseError(error)
      }
    }
  }
}

export const parseError = (error: any): string => {
  console.error(error)
  if (error.message) {
    return "Error - " + error.message
  }
  if (error.match(/\(([^)]+)\)/) && error.match(/\(([^)]+)\)/)[1]) {
    return "Error - " + error.match(/\(([^)]+)\)/)[1]
  } else {
    return "Error - " + error.toString()
  }
}

const datePrecisionFactor = (unit: "Minute" | "Hour" | "Day" | "Month" | "Year"): number => {
  switch (unit) {
    case "Minute":
      return 60
    case "Hour":
      return 60 * 60
    case "Day":
      return 60 * 60 * 24
    case "Month":
      return 60 * 60 * 24 * 30
    case "Year":
      return 60 * 60 * 24 * 30 * 365
  }
}

export const getCorrelatedColumns = (uuid: string, fileMetadata: MetaData[] | undefined): string[] => {
  if (fileMetadata && uuid) {
    const columns = fileMetadata.reduce((acc: string[], column: MetaData) => {
      if (column.methodOptions?.correlation === uuid) return [...acc, column.name]
      return acc
    }, [] as string[])
    if (columns.length !== 1) return columns
  }
  return []
}

export const downloadFile = async (uuid: string | undefined): Promise<void> => {
  if (uuid) {
    const configuration: { configurationInfo: ConfigurationInfo; metadata: MetaData[] } | null = await localForage.getItem(uuid)
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
