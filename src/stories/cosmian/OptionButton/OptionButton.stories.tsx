import { Meta, Story } from "@storybook/react"
import React from "react"
import OptionButton from "./OptionButton"

export default {
  title: "Cosmian/Option Button",
  component: OptionButton,
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story = (args: any) => <OptionButton {...args} />

export const Regular = Template.bind({})
Regular.args = {
  testid: "0000",
}
