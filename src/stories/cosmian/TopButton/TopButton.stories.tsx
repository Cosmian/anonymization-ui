import { Meta, Story } from "@storybook/react"
import React from "react"
import { AiOutlineCloudUpload, AiOutlineFolderAdd } from "react-icons/ai"
import TopButton from "./TopButton"

export default {
  title: "Cosmian/Top Button",
  component: TopButton,
  args: {
    disabled: false,
    onClick: console.log("clicked"),
  },
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story = (args: any) => <TopButton {...args}>Click me</TopButton>

export const Contrast = Template.bind({})
Contrast.args = {}

export const NoContrast = Template.bind({})
NoContrast.args = {
  contrast: false,
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  icon: <AiOutlineFolderAdd />,
}
export const NoContrastAndIcon = Template.bind({})
NoContrastAndIcon.args = {
  contrast: false,
  icon: <AiOutlineCloudUpload />,
}
