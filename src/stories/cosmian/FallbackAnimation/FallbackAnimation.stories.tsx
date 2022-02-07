import { Meta, Story } from "@storybook/react"
import React from "react"
import { FallbackAnimation } from "./FallbackAnimation"

export default {
  title: "Cosmian/Fallback Animation",
  component: FallbackAnimation,
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story = () => <FallbackAnimation />

export const FallbackAnim = Template.bind({})
FallbackAnim.args = {}
