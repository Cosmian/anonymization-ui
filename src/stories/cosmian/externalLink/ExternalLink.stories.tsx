import { Meta, Story } from "@storybook/react"
import React from "react"
import { ExternalLink, ExternalLinkProps } from "./ExternalLink"

export default {
  title: "Cosmian/ExternalLink",
  component: ExternalLink,
  args: {
    //
  },
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<ExternalLinkProps> = (args: any) => <ExternalLink {...args} />

export const Link = Template.bind({})
Link.args = {
  children: "Visit cosmian.com",
  link: "https://cosmian.com",
  blank: true,
}
