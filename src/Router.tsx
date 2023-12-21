import { NotFoundPage } from "cosmian_ui"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Configuration from "./Views/Configuration"
import ConfigurationList from "./Views/ConfigurationList"
import CreateConfiguration from "./Views/CreateConfiguration"
import ImportConfiguration from "./Views/ImportConfiguration"
import Layout from "./components/Layout"
import { paths_config } from "./config/paths"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<ConfigurationList />} />
        <Route path={paths_config.create} element={<CreateConfiguration />} />
        <Route path={paths_config.import} element={<ImportConfiguration />} />
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
