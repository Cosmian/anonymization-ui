import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../AppContext"
import { paths_config } from "../config/paths"

const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRoles: string[] }> = ({ children, requiredRoles }) => {
  const navigate = useNavigate()
  const context = useContext(AppContext)

  useEffect(() => {
    const handleGetRole = async (): Promise<void> => {
      try {
        const role: string | undefined = context?.role
        if (!role) {
          navigate(paths_config.notFound)
        } else if (!requiredRoles.includes(role)) {
          if (role === "configurationProvider") {
            navigate(paths_config.configurationList)
          } else if (role === "dataProvider") {
            navigate(paths_config.fineTuningList)
          }
        }
      } catch (error) {
        navigate(paths_config.notFound)
      }
    }
    handleGetRole()
  }, [])
  return <>{children}</>
}
export default ProtectedRoute
