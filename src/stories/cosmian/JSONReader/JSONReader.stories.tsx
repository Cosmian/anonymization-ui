import { Meta, Story } from "@storybook/react"
import React from "react"
import JSONReader, { JSONReaderProps } from "./JSONReader"

const handleGetFileInfo = (file: File): void => {
  console.log("------------------")
  console.log("File Info")
  console.log(file)
  console.log("------------------")
}
const handleGetResults = (result: unknown): void => {
  console.log("------------------")
  console.log("Result")
  console.log(result)
  console.log("------------------")
}
export default {
  title: "Anonymization/JSON Reader",
  component: JSONReader,
  args: {
    getFileInfo: handleGetFileInfo,
    getResult: handleGetResults,
  },
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<JSONReaderProps> = (args: any) => <JSONReader {...args} />

export const Dragndrop = Template.bind({})
