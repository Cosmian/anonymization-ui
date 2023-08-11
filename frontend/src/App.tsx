import { useEffect, useState } from "react"
import init, { Quote } from "../pkg/sgx_quote.js"
import AppContext from "./AppContext"
import AppRouter from "./Router"
import "./Views/style.less"
import { uint8ArrayToHex } from "./utils/utils.js"

function App(): JSX.Element {
  const [microserviceState, setMicroserviceState] = useState(false)
  const [enclaveKey, setEnclaveKey] = useState("")

  useEffect(() => {
    getEnclaveKey()
  }, [])

  const getEnclaveKey = async (): Promise<void> => {
    await init()
    fetch("cert.conf.pem")
      .then((response) => response.text())
      .then(async (content) => {
        const asciiEncoder = new TextEncoder()
        const cert = asciiEncoder.encode(content)
        const quote = Quote.from_pem_certificate(cert)
        const report_data = quote.report_body.report_data
        const key = report_data.subarray(report_data.length - 32)
        setEnclaveKey(uint8ArrayToHex(key))
      })
      .catch((error) => console.error("Error fetching file:", error))
  }

  const checkMicroserviceHealth = async (): Promise<any> => {
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
      <AppContext.Provider value={{ microserviceState, checkMicroserviceHealth, enclaveKey }}>
        <AppRouter />
      </AppContext.Provider>
    </>
  )
}

export default App
