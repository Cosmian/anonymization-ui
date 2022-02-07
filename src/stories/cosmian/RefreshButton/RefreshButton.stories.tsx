import { Meta, Story } from "@storybook/react"
import React from "react"
import RefreshButton from "./RefreshButton"

export default {
  title: "Cosmian/Refresh Button",
  component: RefreshButton,
  argTypes: { onClick: { action: "clicked" } },
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story = (args: any) => <RefreshButton {...args} />

export const Regular = Template.bind({})
Regular.args = {}
