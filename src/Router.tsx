import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { paths_config } from "./config/paths"
import Anonymization from "./Views/Anonymization"
import Edit from "./Views/Edit"
import Import from "./Views/Import"
import Upload from "./Views/Upload"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route index element={<Anonymization />} />
        <Route path={paths_config.upload} element={<Upload />} />
        <Route path={paths_config.edit} element={<Edit />} />
        <Route path={paths_config.import} element={<Import />} />
      </Route>
    </>
  )
)

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={router} />
}

export default AppRouter
