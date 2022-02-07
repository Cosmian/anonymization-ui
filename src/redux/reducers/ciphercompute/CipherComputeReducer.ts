import { combineReducers } from "redux"
import AnonymizationReducer from "./anonymization"

const CipherComputeReducer = combineReducers({
  anonymizations: AnonymizationReducer,
})

export type CipherComputeReducerState = ReturnType<typeof CipherComputeReducer>

export default CipherComputeReducer
