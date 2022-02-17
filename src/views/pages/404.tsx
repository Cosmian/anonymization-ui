import React from "react"
import { useNavigate } from "react-router-dom"
import { FourZeroFour } from "../../stories/cosmian/404/FourZeroFour"

const FourZeroFourPage: React.FC = () => {
  const navigate = useNavigate()
  const backHome = (): void => {
    navigate("/")
  }
  return <FourZeroFour onBackToHome={backHome} />
}

export default FourZeroFourPage
