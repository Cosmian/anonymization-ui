import { NotFoundPage } from "cosmian_ui"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import { paths_config } from "./config/paths"
import Anonymization from "./Views/Anonymization"
import Anonymize from "./Views/Anonymize"
import Configuration from "./Views/Configuration"
import Edit from "./Views/Edit"
import Import from "./Views/Import"
import Upload from "./Views/Upload"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Anonymization />} />
        <Route path={paths_config.anonymize} element={<Anonymize />} />
        <Route path={paths_config.configuration} element={<Configuration />} />
        <Route path={paths_config.upload} element={<Upload />} />
        <Route path={paths_config.edit} element={<Edit />} />
        <Route path={paths_config.import} element={<Import />} />
        <Route path={paths_config.anonymization} element={<Anonymization />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  )
)

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={router} />
}

export default AppRouter
