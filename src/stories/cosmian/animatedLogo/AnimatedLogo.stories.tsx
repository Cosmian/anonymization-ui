import { Meta, Story } from "@storybook/react"
import React from "react"
import { AnimatedLogo, AnimatedLogoProps } from "./AnimatedLogo"

export default {
  title: "Cosmian/Animated Logo",
  component: AnimatedLogo,
  args: {
    //
  },
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<AnimatedLogoProps> = (args: any) => <AnimatedLogo {...args} />

export const Regular = Template.bind({})
Regular.args = {}

export const FullPage = Template.bind({})
FullPage.args = {
  fullpage: true,
}
