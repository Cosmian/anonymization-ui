import { useEffect, useState } from "react"
import AppContext from "./AppContext"
import AppRouter from "./Router"
import "./Views/style.less"
import { Role } from "./utils/utils"

function App(): JSX.Element {
  const [microserviceState, setMicroserviceState] = useState(false)
  const [roles, setRoles] = useState<Role[] | undefined>(undefined)

  useEffect(() => {
    const fetchRoles = async (): Promise<void> => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/roles`, {
        credentials: "include",
      })
      const roles = await response.json()
      setRoles(roles.roles)
    }
    fetchRoles().catch((error) => {
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
      <AppContext.Provider value={{ microserviceState, checkMicroserviceHealth, roles }}>{roles && <AppRouter />}</AppContext.Provider>
    </>
  )
}

export default App
