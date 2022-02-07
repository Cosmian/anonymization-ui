import { message } from "antd"

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const errorMessage = (error?: any): void => {
  message.warning("Error: something went wrong")
  if (error != null) {
    console.error(error)
  }
}

export { errorMessage }
