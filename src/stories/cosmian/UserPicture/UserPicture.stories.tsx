import { Meta, Story } from "@storybook/react"
import React from "react"
import catvatar from "../../assets/catvatar.jpg"
import { UserPicture, UserPictureProps } from "./UserPicture"

export default {
  title: "Cosmian/UserPicture",
  component: UserPicture,
  args: {
    //
  },
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<UserPictureProps> = (args: any) => <UserPicture {...args} />

export const WithImage = Template.bind({})
WithImage.args = {
  url: catvatar,
}
export const WithoutImage = Template.bind({})
WithoutImage.args = {}
