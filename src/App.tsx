import AppRouter from "./Router"
import Layout from "./components/Layout"

function App(): JSX.Element {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  )
}

export default App
