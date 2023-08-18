import localForage from "localforage"
import { useEffect, useState } from "react"
import AppContext from "./AppContext"
import AppRouter from "./Router"
import "./Views/style.less"

function App(): JSX.Element {
  const [microserviceState, setMicroserviceState] = useState(false)
  const [role, setRole] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchRole = async (): Promise<void> => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/role`, {
        credentials: "include",
      })
      const role = await response.text()
      await localForage.setItem("role", role)
      setRole(role)
    }
    fetchRole().catch((error) => {
      throw new Error((error as Error).message)
    })
  }, [])

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
      <AppContext.Provider value={{ microserviceState, checkMicroserviceHealth }}>{role && <AppRouter />}</AppContext.Provider>
    </>
  )
}

export default App
