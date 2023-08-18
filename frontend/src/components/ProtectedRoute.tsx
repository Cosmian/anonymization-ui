import localForage from "localforage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { paths_config } from "../config/paths"

const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRoles: string[] }> = ({ children, requiredRoles }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetRole = async (): Promise<void> => {
      try {
        const role: string | null = await localForage.getItem("role")
        if (!role || !requiredRoles.includes(role)) {
          navigate(paths_config.configurationList)
        }
      } catch (error) {
        navigate(paths_config.configurationList)
      }
    }
    handleGetRole()
  }, [])
  return <>{children}</>
}
export default ProtectedRoute
