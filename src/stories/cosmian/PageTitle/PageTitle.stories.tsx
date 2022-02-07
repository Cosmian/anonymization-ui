import { Meta, Story } from "@storybook/react"
import { Space } from "antd"
import React from "react"
import { AiOutlineCloudUpload, AiOutlineFolderAdd } from "react-icons/ai"
import TopButton from "../TopButton/TopButton"
import PageTitle from "./PageTitle"

export default {
  title: "Cosmian/Page Title",
  component: PageTitle,
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story = (args: any) => <PageTitle {...args} />

export const WithOption = Template.bind({})
WithOption.args = {
  title: "This is the h1 level title of the page",
  option: (
    <Space>
      <TopButton icon={<AiOutlineFolderAdd />}>Create new folder</TopButton>
      <TopButton icon={<AiOutlineCloudUpload />} contrast={false}>
        Upload file
      </TopButton>
    </Space>
  ),
}
export const WithSubtitle = Template.bind({})
WithSubtitle.args = {
  title: "This is the h1 level title of the page",
  subtitle: "The quick brown fox jumps over the lazy dog",
}
export const NoSubtitle = Template.bind({})
NoSubtitle.args = {
  title: "This is the h1 level title of the page",
  option: <TopButton>Call to action</TopButton>,
}
