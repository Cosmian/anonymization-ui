/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi"

const metaMetadata = Joi.object({
  aborted: Joi.boolean(),
  cursor: Joi.number(),
  linebreak: Joi.string(),
  truncated: Joi.boolean(),
  delimiter: Joi.string().valid(",", ";").required(),
  fields: Joi.array().items(Joi.string(), Joi.number()).length(3).required(),
})

const dataMetadata = Joi.object({
  column_name: Joi.string().required(),
  type: Joi.string().valid("integer", "float", "text", "date").required(),
  example_value: Joi.string().required(),
})

const sourceMetadata = Joi.object({
  meta: metaMetadata,
  data: Joi.array().items(dataMetadata),
  errors: Joi.array(), // array of any
})

const csvValidation = async (parsedCSV: unknown): Promise<any> => {
  const result = {
    data: null as any,
    error: null as string | null,
  }
  try {
    result.data = await sourceMetadata.validateAsync(parsedCSV)
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

export default csvValidation
