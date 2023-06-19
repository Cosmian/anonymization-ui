import AppRouter from "./Router"
import "./Views/style.less"
import Layout from "./components/Layout"

function App(): JSX.Element {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  )
}

export default App
