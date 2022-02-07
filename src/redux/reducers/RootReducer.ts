import { combineReducers } from "redux"
import CipherComputeReducer from "./ciphercompute/CipherComputeReducer"

const rootReducer = combineReducers({
  ciphercompute: CipherComputeReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
