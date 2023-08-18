import { createContext } from "react"

interface AppContextValue {
  microserviceState: boolean
  checkMicroserviceHealth: () => void
  role: string | undefined
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export default AppContext
