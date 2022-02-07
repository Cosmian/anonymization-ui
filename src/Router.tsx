import React, { lazy, Suspense } from "react"
import { connect } from "react-redux"
import { BrowserRouter, Navigate, Route, RouteProps, Routes } from "react-router-dom"
import { BASE_PATH, link_config, paths_config } from "./configs/paths"
import { FallbackAnimation } from "./stories/cosmian/FallbackAnimation/FallbackAnimation"
import Layout from "./views/pages/ciphercompute/Layout"

// Route-based code splitting
const Anonymization = lazy(() => import("./views/pages/ciphercompute/Anonymization"))
const HelpPage = lazy(() => import("./views/pages/ciphercompute/anonymization/HelpPage"))
const FourZeroFourPage = lazy(() => import("./views/pages/ciphercompute/404"))

interface RouteParameters extends RouteProps {
  fullLayout?: boolean
  permission?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comp: React.LazyExoticComponent<any>
}

const RouteConfig = ({ comp: Component, fullLayout }: RouteParameters): JSX.Element => (
  <Layout fullLayout={fullLayout as boolean}>
    <Suspense fallback={<FallbackAnimation />}>
      <Component />
    </Suspense>
  </Layout>
)

const AppRoute = connect(() => ({}))(RouteConfig)

const AppRouter = (): JSX.Element => {
  const relative_base_path = BASE_PATH.replace("/", "")

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to={link_config.notFound} />}></Route>

        <Route path="/*">
          <Route index element={<Navigate replace to={`${relative_base_path}/${paths_config.anonymizations}`} />} />
          <Route path={`${relative_base_path}/*`}>
            <Route path={paths_config.anonymizations + "/*"} element={<AppRoute comp={Anonymization} />} />
            <Route path={paths_config.help + "/*"} element={<AppRoute comp={HelpPage} />} />
            <Route path={paths_config.notFound} element={<AppRoute fullLayout comp={FourZeroFourPage} />} />
            <Route path="*" element={<Navigate to={link_config.notFound} />}></Route>
          </Route>
          <Route path="*" element={<Navigate to={link_config.notFound} />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
