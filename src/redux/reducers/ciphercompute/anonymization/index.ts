import { message } from "antd"
import {
  ADD_ANONYMIZATIONS,
  Anonymization,
  AnonymizationActions,
  CLEAN_ANONYMIZATION_DETAILS,
  DELETE_ANONYMIZATIONS,
  DUPLICATE_ANONYMIZATIONS,
  GET_ANONYMIZATIONS,
  GET_ONE_ANONYMIZATION,
  LOAD_ANONYMIZATIONS,
  UPDATE_ANONYMIZATIONS,
} from "./types"

interface AnonymizationState {
  loading: boolean
  anonymizations: Anonymization[]
  anonymizationDetails: Anonymization
}
const initialState: AnonymizationState = {
  loading: false,
  anonymizations: [] as Anonymization[],
  anonymizationDetails: {} as Anonymization,
}

const AnonymizationReducer = (state: AnonymizationState = initialState, action: AnonymizationActions): AnonymizationState => {
  switch (action.type) {
    case LOAD_ANONYMIZATIONS:
      return {
        ...state,
        loading: true,
      }
    case GET_ANONYMIZATIONS: {
      return {
        ...state,
        anonymizations: action.data,
        loading: false,
      }
    }
    case ADD_ANONYMIZATIONS:
      if (action.data) {
        message.success(`Anonymization created`)
        return {
          ...state,
          anonymizations: action.data,
        }
      } else {
        return state
      }
    case GET_ONE_ANONYMIZATION: {
      if (action.obj) {
        return {
          ...state,
          anonymizationDetails: action.obj,
        }
      } else {
        return state
      }
    }
    case UPDATE_ANONYMIZATIONS: {
      if (action.data) {
        message.success(`Anonymization ${action.obj.name} updated`)
        return {
          ...state,
          anonymizations: action.data,
          anonymizationDetails: action.obj,
        }
      } else {
        return state
      }
    }
    case DELETE_ANONYMIZATIONS: {
      if (action.data) {
        message.success(`Anonymization deleted`)
        return {
          ...state,
          anonymizations: action.data,
        }
      } else {
        return state
      }
    }
    case DUPLICATE_ANONYMIZATIONS: {
      if (action.data) {
        message.success(`Anonymization duplicated`)
        return {
          ...state,
          anonymizations: action.data,
        }
      } else {
        return state
      }
    }
    case CLEAN_ANONYMIZATION_DETAILS: {
      return {
        ...state,
        anonymizationDetails: {} as Anonymization,
      }
    }
    default:
      return state
  }
}

export default AnonymizationReducer
