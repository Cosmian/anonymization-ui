import { NotFoundPage } from "cosmian_ui"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import AnonymizationList from "./Views/AnonymizationList"
import Anonymize from "./Views/Anonymize"
import ConfigurationList from "./Views/ConfigurationList"
import CreateConfiguration from "./Views/CreateConfiguration"
import Edit from "./Views/Edit"
import ImportConfiguration from "./Views/ImportConfiguration"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import { paths_config } from "./config/paths"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route
          path={paths_config.anonymizationList}
          element={
            <ProtectedRoute requiredRoles={["ateam"]}>
              <AnonymizationList />
            </ProtectedRoute>
          }
        />
        <Route
          path={paths_config.anonymize}
          element={
            <ProtectedRoute requiredRoles={["bteam"]}>
              <Anonymize />
            </ProtectedRoute>
          }
        />
        <Route path={paths_config.configurationList} element={<ConfigurationList />} />
        <Route path={paths_config.create} element={<CreateConfiguration />} />
        <Route path={paths_config.edit + "/:id"} element={<Edit />} />
        <Route path={paths_config.import} element={<ImportConfiguration />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
)

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={router} />
}

export default AppRouter
