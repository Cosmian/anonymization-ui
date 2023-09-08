import { createContext } from "react"
import { Role } from "./utils/utils"

interface AppContextValue {
  microserviceState: boolean
  checkMicroserviceHealth: () => void
  roles: Role[] | undefined
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export default AppContext
