import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { paths_config } from "./config/paths"
import Anonymization from "./Views/Anonymization"
import Create from "./Views/Create"


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route index element={<Anonymization />} />
        <Route path={paths_config.create} element={<Create />} />
      </Route>
    </>
  )
)

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={router} />
}

export default AppRouter
