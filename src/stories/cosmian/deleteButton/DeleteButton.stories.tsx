import { Meta, Story } from "@storybook/react"
import React from "react"
import { DeleteButton, DeleteButtonProps, ItemType } from "./DeleteButton"

const onCancel = (): void => {
  console.log("Canceled")
}
const onDelete = (): void => {
  console.log("Deleted")
}

export default {
  title: "Cosmian/DeleteButton",
  component: DeleteButton,
  args: {
    onCancel: onCancel,
    onDelete: onDelete,
  },
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<DeleteButtonProps> = (args: any) => <DeleteButton {...args} />

export const DeleteDatasource = Template.bind({})
DeleteDatasource.args = {
  itemType: ItemType.Datasource,
  itemName: "Clients informations",
}

export const DeleteParticipant = Template.bind({})
DeleteParticipant.args = {
  forcable: true,
  itemType: ItemType.Party,
  itemName: "Player 1",
}

export const DeleteComputation = Template.bind({})
DeleteComputation.args = {
  itemType: ItemType.Computation,
  itemName: "Blind join",
}
