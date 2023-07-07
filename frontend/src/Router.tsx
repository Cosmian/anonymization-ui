import { NotFoundPage } from "cosmian_ui"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import { paths_config } from "./config/paths"
import AnonymizationList from "./Views/AnonymizationList"
import Anonymize from "./Views/Anonymize"
import Configuration from "./Views/Configuration"
import CreateConfiguration from "./Views/CreateConfiguration"
import Edit from "./Views/Edit"
import Import from "./Views/Import"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<AnonymizationList />} />
        <Route path={paths_config.anonymize} element={<Anonymize />} />
        <Route path={paths_config.configuration} element={<Configuration />} />
        <Route path={paths_config.upload} element={<CreateConfiguration />} />
        <Route path={paths_config.edit + "/:id"} element={<Edit />} />
        <Route path={paths_config.import} element={<Import />} />
        <Route path={paths_config.anonymization} element={<AnonymizationList />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
)

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={router} />
}

export default AppRouter
