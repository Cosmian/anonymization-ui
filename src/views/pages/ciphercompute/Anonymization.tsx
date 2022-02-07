import React from "react"
import { connect, ConnectedProps } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import { link_config } from "../../../configs/paths"
import AnonymizationsList from "./anonymization/AnonymizationList"
import CreateAnonymization from "./anonymization/CreateAnonymization"
import EditTreatment from "./anonymization/EditTreatment"

const mapDispatchToProps = {
  //
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = () => {
  return {}
}

const connector = connect(mapStateToProps, mapDispatchToProps)

// infer props from connector
type PropsFromRedux = ConnectedProps<typeof connector>

type AnonymizationsProps = PropsFromRedux

const Anonymization: React.FC<AnonymizationsProps> = () => {
  return (
    <Routes>
      <Route index element={<AnonymizationsList />} />
      <Route path={"new"} element={<CreateAnonymization />} />
      <Route path={":anonymization_uuid/update"} element={<CreateAnonymization />} />
      <Route path={":anonymization_uuid/edit"} element={<EditTreatment />} />
      <Route path="*" element={<Navigate to={link_config.notFound} />}></Route>
    </Routes>
  )
}

export default connector(Anonymization)
