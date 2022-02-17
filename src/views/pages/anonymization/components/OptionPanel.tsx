import { Col, Row, Space } from "antd"
import React, { FC } from "react"
import "./option-panel.less"

interface OptionSubComponents extends React.FC<{ children: React.ReactNode }> {
  Title: typeof Title
  Treatment: typeof Treatment
  MoreInfo: typeof MoreInfo
  Parameters: typeof Parameters
  Outputs: typeof Outputs
  Buttons: typeof Buttons
}

// TODO: find a type for { children }
const OptionPanel: OptionSubComponents = ({ children }) => {
  const title = React.Children.map(children as React.ReactElement, (child: JSX.Element) => (child?.type === Title ? child : null))
  const treatment = React.Children.map(children as React.ReactElement, (child) => (child?.type === Treatment ? child : null))
  const moreInfo = React.Children.map(children as React.ReactElement, (child) => (child?.type === MoreInfo ? child : null))
  const parameters = React.Children.map(children as React.ReactElement, (child) => (child?.type === Parameters ? child : null))
  const outputs = React.Children.map(children as React.ReactElement, (child) => (child?.type === Outputs ? child : null))
  const buttons = React.Children.map(children as React.ReactElement, (child) => (child?.type === Buttons ? child : null))

  return (
    <div className="treatment-option">
      <div className="column">{title}</div>
      <Row className="details" gutter={[0, 10]}>
        <Col className="treatment" xs={24} md={12} lg={8}>
          {treatment}
          <div className="more-info">{moreInfo}</div>
        </Col>
        <Col className="parameters" xs={24} md={12} lg={8}>
          {parameters}
        </Col>
        <Col className="output" xs={24} md={12} lg={8}>
          {outputs}
        </Col>
      </Row>
      <div className="buttons">{buttons}</div>
    </div>
  )
}

interface MoreInfoProps {
  onClick: () => void
}

const Title: FC = ({ children }) => {
  return <h5>Column: {children}</h5>
}
Title.displayName = "Title"
OptionPanel.Title = Title

const Treatment: FC = ({ children }) => {
  return (
    <>
      <h5>Treatment</h5>
      {children}
    </>
  )
}
Treatment.displayName = "Treatment"
OptionPanel.Treatment = Treatment

const MoreInfo: FC<MoreInfoProps> = ({ children, onClick }) => {
  return <div onClick={onClick}>{children}</div>
}
MoreInfo.displayName = "MoreInfo"
OptionPanel.MoreInfo = MoreInfo

const Parameters: FC = ({ children }) => {
  return (
    <>
      <h5>Parameters</h5>
      {children}
    </>
  )
}
Parameters.displayName = "Parameters"
OptionPanel.Parameters = Parameters

const Outputs: FC = ({ children }) => {
  return (
    <>
      <h5>Outputs</h5>
      {children}
    </>
  )
}
Outputs.displayName = "Outputs"
OptionPanel.Outputs = Outputs

const Buttons: FC = ({ children }) => {
  return (
    <>
      <Space style={{ width: "100%", justifyContent: "flex-end", marginTop: 30 }}>{children}</Space>
    </>
  )
}
Buttons.displayName = "Buttons"
OptionPanel.Buttons = Buttons

export default OptionPanel
