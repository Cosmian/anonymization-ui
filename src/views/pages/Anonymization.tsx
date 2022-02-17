import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { link_config } from "../../configs/paths"
import AnonymizationsList from "./anonymization/AnonymizationList"
import CreateAnonymization from "./anonymization/CreateAnonymization"
import EditTreatment from "./anonymization/EditTreatment"
import ImportAnonymization from "./anonymization/ImportAnonymization"

const Anonymization: React.FC = () => {
  return (
    <Routes>
      <Route index element={<AnonymizationsList />} />
      <Route path={"new"} element={<CreateAnonymization />} />
      <Route path={"import"} element={<ImportAnonymization />} />
      <Route path={":anonymization_uuid/update"} element={<CreateAnonymization />} />
      <Route path={":anonymization_uuid/edit"} element={<EditTreatment />} />
      <Route path="*" element={<Navigate to={link_config.notFound} />}></Route>
    </Routes>
  )
}

export default Anonymization
