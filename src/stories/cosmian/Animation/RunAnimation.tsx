import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons"
import React, { useRef } from "react"
import { AnimateGroup, AnimateKeyframes } from "react-simple-animate"
import { AnimateKeyframesProps, Keyframes } from "react-simple-animate/dist/types"
import ComputationIllustration from "./ComputationIllustration"
import "./runAnimation.less"

const animationKeyframes: Keyframes = [
  { 0: "opacity: 0;" },
  { 12: "opacity: 0;" },
  { 25: "opacity: 1;" },
  { 83: "opacity: 1;" },
  { 95: "opacity: 0;" },
  { 100: "opacity: 0;" },
]

const props: AnimateKeyframesProps = {
  play: true,
  duration: 4,
  iterationCount: 1,
  keyframes: animationKeyframes,
  fillMode: "both",
  overlay: 0,
}

export type RunAnimationProps = {
  /**
   * Status of computation
   */
  computationStatus?: string
  /**
   * Status of simultation
   */
  simulationState?: SimulationState
}

export enum SimulationState {
  Finished = "Finished",
  Errored = "Errored",
  Unfinished = "Unfinished",
  NotStartedYet = "NotStartedYet",
}

const RunAnimation: React.FC<RunAnimationProps> = ({ computationStatus, simulationState }): JSX.Element => {
  const lastRef = useRef(null)

  return (
    <div className="run-animation">
      <ComputationIllustration
        statiq={
          computationStatus?.includes("error") ||
          computationStatus === "finished" ||
          simulationState === SimulationState.Finished ||
          simulationState === SimulationState.Errored
        }
      />
      {/* Computation starting up */}
      {(computationStatus === "starting up" || computationStatus === "working" || computationStatus === "queued") && (
        <>
          <AnimateGroup play>
            <AnimateKeyframes sequenceIndex={1} {...props}>
              <p className="animated-text">Connecting servers</p>
            </AnimateKeyframes>
            <AnimateKeyframes sequenceIndex={2} {...props}>
              <p className="animated-text">Checking for dataset authorizations</p>
            </AnimateKeyframes>
            <AnimateKeyframes sequenceIndex={3} {...props}>
              <p className="animated-text">Checking for computation authorizations</p>
            </AnimateKeyframes>
            <AnimateKeyframes sequenceIndex={4} {...props}>
              <p className="animated-text">Pulling code from repository</p>
            </AnimateKeyframes>
            <AnimateKeyframes sequenceIndex={5} {...props}>
              <p className="animated-text">Compiling code</p>
            </AnimateKeyframes>
            <AnimateKeyframes
              sequenceIndex={6}
              play
              duration={4}
              iterationCount={1}
              keyframes={[{ 0: "opacity: 0;" }, { 12: "opacity: 0;" }, { 25: "opacity: 1;" }]}
              fillMode="both"
            >
              <p className="animated-text">
                Computation in progress <LoadingOutlined style={{ verticalAlign: "0.075em", marginLeft: "0.5em", color: "#E3431A" }} />
              </p>
            </AnimateKeyframes>
          </AnimateGroup>
        </>
      )}

      {/* If Computation is finished, hide last sentence and display "Computation completed" */}
      {computationStatus === "finished" && !computationStatus.includes("error") && lastRef.current != null && (
        <AnimateGroup play>
          <AnimateKeyframes
            sequenceIndex={1}
            play
            duration={1}
            iterationCount={1}
            keyframes={[{ 0: "opacity: 1;" }, { 8: "opacity: 1;" }, { 12: "opacity: 0;" }, { 25: "opacity: 0;" }]}
            fillMode="both"
          >
            <p className="animated-text">
              Computation in progress <LoadingOutlined style={{ verticalAlign: "0.075em", marginLeft: "0.5em", color: "#E3431A" }} />
            </p>
          </AnimateKeyframes>
          <AnimateKeyframes
            sequenceIndex={2}
            play
            duration={4}
            iterationCount={1}
            keyframes={[{ 0: "opacity: 0;" }, { 12: "opacity: 0;" }, { 25: "opacity: 1;" }]}
            fillMode="forwards"
          >
            <p className="animated-text">
              Computation completed <CheckCircleOutlined style={{ verticalAlign: "0.075em", color: "#219653", marginLeft: "0.4em" }} />
            </p>
          </AnimateKeyframes>
        </AnimateGroup>
      )}
      {/* If Computation is finished */}
      {computationStatus === "finished" && lastRef.current == null && (
        <div>
          <p className="animated-text">
            Computation completed <CheckCircleOutlined style={{ verticalAlign: "0.075em", color: "#219653", marginLeft: "0.4em" }} />
          </p>
        </div>
      )}
      {/* If Computation is errored */}
      {computationStatus?.includes("error") && (
        <div>
          <p className="animated-text">
            Error in computation <CloseCircleOutlined style={{ verticalAlign: "0.075em", color: "#EB5757", marginLeft: "0.4em" }} />
          </p>
        </div>
      )}

      {/* SIMULATION */}

      {/* SimulationState is null */}
      {computationStatus == null && simulationState == null && <></>}

      {/* In case of simulation */}
      {computationStatus == null &&
        simulationState !== SimulationState.Finished &&
        simulationState !== SimulationState.Errored &&
        simulationState != null && (
          <div>
            <p className="animated-text">
              Simulation in progress <LoadingOutlined style={{ verticalAlign: "0.075em", marginLeft: "0.5em", color: "#E3431A" }} />
            </p>
          </div>
        )}
      {computationStatus == null && simulationState === SimulationState.Finished && (
        <div>
          <p className="animated-text">
            Simulation completed <CheckCircleOutlined style={{ verticalAlign: "0.075em", color: "#219653", marginLeft: "0.4em" }} />
          </p>
        </div>
      )}
      {computationStatus == null && simulationState === SimulationState.Errored && (
        <div>
          <p className="animated-text">
            Error in simulation
            <CloseCircleOutlined style={{ verticalAlign: "0.075em", color: "#EB5757", marginLeft: "0.4em" }} />
          </p>
        </div>
      )}
    </div>
  )
}

export default RunAnimation
