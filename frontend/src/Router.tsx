import { NotFoundPage } from "cosmian_ui"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import { paths_config } from "./config/paths"
import AnonymizationList from "./Views/AnonymizationList"
import Anonymize from "./Views/Anonymize"
import ConfigurationList from "./Views/ConfigurationList"
import CreateConfiguration from "./Views/CreateConfiguration"
import Edit from "./Views/Edit"
import ImportConfiguration from "./Views/ImportConfiguration"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<AnonymizationList />} />
        <Route path={paths_config.anonymize} element={<Anonymize />} />
        <Route path={paths_config.configurationList} element={<ConfigurationList />} />
        <Route path={paths_config.create} element={<CreateConfiguration />} />
        <Route path={paths_config.edit + "/:id"} element={<Edit />} />
        <Route path={paths_config.import} element={<ImportConfiguration />} />
        <Route path={paths_config.anonymizationList} element={<AnonymizationList />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
)

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={router} />
}

export default AppRouter
