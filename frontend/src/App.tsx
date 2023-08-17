import { useState } from "react"
import AppContext from "./AppContext"
import AppRouter from "./Router"
import "./Views/style.less"

function App(): JSX.Element {
  const [microserviceState, setMicroserviceState] = useState(false)

  const checkMicroserviceHealth = async (): Promise<void> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/health`, {
      credentials: "include",
    })
    if (response.status === 200) {
      setMicroserviceState(true)
    } else {
      setMicroserviceState(false)
    }
  }

  return (
    <>
      <AppContext.Provider value={{ microserviceState, checkMicroserviceHealth }}>
        <AppRouter />
      </AppContext.Provider>
    </>
  )
}

export default App
