import { Meta, Story } from "@storybook/react"
import React from "react"
import { BigIcon, BigIconProps } from "./BigIcons"

export default {
  title: "Cosmian/Big Icons",
  component: BigIcon,
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<BigIconProps> = (args: any) => <BigIcon {...args} />

export const Trash = Template.bind({})
Trash.args = {
  type: "trash",
}
export const Import = Template.bind({})
Import.args = {
  type: "import",
}
export const Loading = Template.bind({})
Loading.args = {
  type: "loading",
}
export const Success = Template.bind({})
Success.args = {
  type: "success",
}
