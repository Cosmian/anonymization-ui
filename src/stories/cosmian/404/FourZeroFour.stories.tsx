import { Meta, Story } from "@storybook/react"
import React from "react"
import { FourZeroFour } from "./FourZeroFour"

export default {
  title: "Cosmian/404",
  component: FourZeroFour,
  argTypes: { onClick: { action: "clicked" } },
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story = (args: any) => <FourZeroFour {...args} />

export const FourOFour = Template.bind({})
FourOFour.args = {}
