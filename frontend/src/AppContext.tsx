import { createContext } from "react"

interface AppContextValue {
  microserviceState: boolean
  checkMicroserviceHealth: () => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export default AppContext
