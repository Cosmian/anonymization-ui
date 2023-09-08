import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../AppContext"
import { paths_config } from "../config/paths"
import { Role } from "../utils/utils"

const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole: Role }> = ({ children, requiredRole }) => {
  const navigate = useNavigate()
  const context = useContext(AppContext)

  useEffect(() => {
    const handleGetRoles = async (): Promise<void> => {
      try {
        const roles: Role[] | undefined = context?.roles
        if (!roles) {
          navigate(paths_config.notFound)
        } else if (!roles.includes(requiredRole)) {
          navigate(paths_config.anonymizationList)
        }
      } catch (error) {
        navigate(paths_config.notFound)
      }
    }
    handleGetRoles()
  }, [])
  return <>{children}</>
}
export default ProtectedRoute
