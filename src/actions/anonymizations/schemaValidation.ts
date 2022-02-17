/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi"

const hashOptions = Joi.object({
  hash_function: Joi.string().valid("SHA256", "PBKDF2").required(),
  salt: Joi.string(),
})

const aggregateOptions = Joi.object({
  aggregation_type: Joi.string().valid("Round", "GroupByInterval").required(),
  precision: Joi.alternatives().try(
    Joi.string().valid("Year", "Month", "Day", "Hour", "Minute", "Second").required(),
    Joi.number().required()
  ),
})

const addNoiseOptions = Joi.object({
  noise_type: Joi.string().valid("Gaussian", "Laplace").required(),
  standard_deviation: Joi.number(),
  precision_type: Joi.string().valid("Year", "Month", "Day", "Hour", "Minute", "Second"),
})

const blockWordsOptions = Joi.object({
  block_type: Joi.string().valid("Mask", "Tokenize").required(),
  word_list: Joi.array().items(Joi.string()),
})

const datasetSchema = Joi.object({
  key: Joi.number().required(),
  name: Joi.string().required(),
  format: Joi.string().valid("Integer", "Text", "Float", "Date", "Boolean").required(),
  example: Joi.string().required(),
  treatment: Joi.string().valid("None", "Hash", "Aggregate", "AddNoise", "BlockWords").required(),
  // not required
  treatment_options: Joi.alternatives().try(hashOptions, aggregateOptions, addNoiseOptions, blockWordsOptions),
  treated_example: Joi.string(),
})

const inputDatasetSchema = Joi.object({
  file_info: {
    last_modified: Joi.date().timestamp().required(),
    name: Joi.string().required(),
    size: Joi.number().required(),
    type: Joi.string().valid("text/csv").required(),
  },
  dataset_schema: Joi.array().items(datasetSchema),
})

const configSchema = Joi.object({
  uuid: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string(),
  created_at: Joi.string().required(),
  input_dataset: inputDatasetSchema,
})

const jsonValidation = async (parsedJSON: unknown): Promise<any> => {
  const result = {
    data: null as any,
    error: null as string | null,
  }
  try {
    result.data = await configSchema.validateAsync(parsedJSON)
    return result
  } catch (error: any) {
    let errorMessage = ""
    for (const err of error.details) {
      errorMessage += err.path.join(" > ") + err.message.slice(err.message.lastIndexOf('"') + 1)
    }
    result.error = errorMessage
    return result
  }
}

export default jsonValidation
