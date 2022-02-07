import { Meta, Story } from "@storybook/react"
import React from "react"
import EncryptedSwitch from "./EncryptedSwitch"

export default {
  title: "ZeroTrust/Encrypted Switch",
  component: EncryptedSwitch,
  decorators: [
    (Story) => (
      <div style={{ padding: "3em", backgroundColor: "#320099" }}>
        <Story />
      </div>
    ),
  ],
} as Meta

const onChange = (state: boolean): void => {
  console.log(state)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story = (args: any) => <EncryptedSwitch {...args} />

export const Encrypted = Template.bind({})
Encrypted.args = {
  encryptedState: true,
  onChange: onChange,
}
export const Unencrypted = Template.bind({})
Unencrypted.args = {
  encryptedState: false,
  onChange: onChange,
}
