import { Meta, Story } from "@storybook/react"
import React from "react"
import BackArrow from "./BackArrow"

export default {
  title: "Cosmian/Back Arrow",
  component: BackArrow,
  args: {
    text: "Back to previous page",
    url: "#",
  },
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story = (args: any) => <BackArrow {...args} />

export const Regular = Template.bind({})
Regular.args = {}
