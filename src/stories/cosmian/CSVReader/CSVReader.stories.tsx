import { Meta, Story } from "@storybook/react"
import { ParseResult } from "papaparse"
import React from "react"
import CSVReader, { CSVReaderProps } from "./CSVReader"

const handleGetFileInfo = (file: File): void => {
  console.log("------------------")
  console.log("File Info")
  console.log(file)
  console.log("------------------")
}
const handleGetResults = (result: ParseResult<unknown>): void => {
  console.log("------------------")
  console.log("Data")
  console.log(result.data)
  console.log("Meta")
  console.log(result.meta)
  console.log("------------------")
}
export default {
  title: "Anonymization/CSV Reader",
  component: CSVReader,
  args: {
    getFileInfo: handleGetFileInfo,
    getResult: handleGetResults,
  },
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<CSVReaderProps> = (args: any) => <CSVReader {...args} />

export const Dragndrop = Template.bind({})
