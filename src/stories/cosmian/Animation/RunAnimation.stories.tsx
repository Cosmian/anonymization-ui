import { Meta, Story } from "@storybook/react"
import React from "react"
import RunAnimation, { RunAnimationProps, SimulationState } from "./RunAnimation"

export default {
  title: "sMPC/animation",
  component: RunAnimation,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          minHeight: 200,
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<RunAnimationProps> = (args: any) => <RunAnimation {...args} />

export const ComputationStartingUp = Template.bind({})
ComputationStartingUp.args = {
  computationStatus: "starting up",
}

export const ComputationWorking = Template.bind({})
ComputationWorking.args = {
  computationStatus: "working",
}

export const ComputationQueued = Template.bind({})
ComputationQueued.args = {
  computationStatus: "queued",
}

export const ComputationFinished = Template.bind({})
ComputationFinished.args = {
  computationStatus: "finished",
}

export const ComputationErrored = Template.bind({})
ComputationErrored.args = {
  computationStatus: "errored",
}

export const SimulationStarting = Template.bind({})
SimulationStarting.args = {
  simulationState: SimulationState.Unfinished,
}
