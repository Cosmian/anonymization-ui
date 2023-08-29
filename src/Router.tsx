import { NotFoundPage } from "cosmian_ui"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import AnonymizationList from "./Views/AnonymizationList"
import Anonymize from "./Views/Anonymize"
import Configuration from "./Views/Configuration"
import ConfigurationList from "./Views/ConfigurationList"
import CreateConfiguration from "./Views/CreateConfiguration"
import FineTuningList from "./Views/FineTuningList"
import ImportConfiguration from "./Views/ImportConfiguration"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import { paths_config } from "./config/paths"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<AnonymizationList />} />
        <Route
          path={paths_config.create}
          element={
            <ProtectedRoute requiredRoles={["configurationProvider"]}>
              <CreateConfiguration />
            </ProtectedRoute>
          }
        />
        <Route
          path={paths_config.import}
          element={
            <ProtectedRoute requiredRoles={["configurationProvider"]}>
              <ImportConfiguration />
            </ProtectedRoute>
          }
        />
        <Route
          path={paths_config.configurationList}
          element={
            <ProtectedRoute requiredRoles={["configurationProvider"]}>
              <ConfigurationList />
            </ProtectedRoute>
          }
        />
        <Route
          path={paths_config.anonymize}
          element={
            <ProtectedRoute requiredRoles={["dataProvider"]}>
              <Anonymize />
            </ProtectedRoute>
          }
        />
        <Route
          path={paths_config.fineTuningList}
          element={
            <ProtectedRoute requiredRoles={["dataProvider"]}>
              <FineTuningList />
            </ProtectedRoute>
          }
        />
        <Route index path={paths_config.anonymizationList} element={<AnonymizationList />} />
        <Route path={paths_config.configuration + "/:id"} element={<Configuration />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
)

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={router} />
}

export default AppRouter
