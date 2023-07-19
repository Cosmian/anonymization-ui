import { createContext } from "react"

interface AppContextValue {
  microserviceState: boolean
  checkMicroserviceHealth: () => void
  enclaveKey: string
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export default AppContext
