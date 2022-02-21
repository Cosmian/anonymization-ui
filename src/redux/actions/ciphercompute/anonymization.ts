import localForage from "localforage"
import { findIndex, isEmpty, last } from "lodash"
import { Dispatch } from "redux"
import { v4 as uuidv4 } from "uuid"
import {
  AddAnonymizationsAction,
  ADD_ANONYMIZATIONS,
  Anonymization,
  CleanAnonymizationDetailsAction,
  CLEAN_ANONYMIZATION_DETAILS,
  DeleteAnonymizationsAction,
  DELETE_ANONYMIZATIONS,
  DuplicateAnonymizationsAction,
  DUPLICATE_ANONYMIZATIONS,
  GetAnonymizationsAction,
  GetOneAnonymizationAction,
  GET_ANONYMIZATIONS,
  GET_ONE_ANONYMIZATION,
  LoadAnonymizationsAction,
  LOAD_ANONYMIZATIONS,
  UpdateAnonymizationsAction,
  UPDATE_ANONYMIZATIONS,
} from "../../reducers/ciphercompute/anonymization/types"
import { AppThunk } from "./types"

const LS_ANONYMIZATIONS = "anonymizations"

export const addAnonymization = (anonymization: Anonymization): AppThunk<Promise<Anonymization>> => {
  return async (dispatch): Promise<Anonymization> => {
    let anonymizationList = (await localForage.getItem(LS_ANONYMIZATIONS)) as Anonymization[]
    if (!isEmpty(anonymizationList) && anonymizationList != null) {
      anonymizationList.push(anonymization)
    } else {
      anonymizationList = [anonymization]
    }
    const response = await localForage.setItem(LS_ANONYMIZATIONS, anonymizationList)
    dispatch<AddAnonymizationsAction>({
      type: ADD_ANONYMIZATIONS,
      data: response,
    })
    dispatch(getAnonymizations())
    return last(response) as Anonymization
  }
}

export const getAnonymizations = (): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch<LoadAnonymizationsAction>({
      type: LOAD_ANONYMIZATIONS,
    })
    const anonymizationList = (await localForage.getItem(LS_ANONYMIZATIONS)) as Anonymization[]
    dispatch<GetAnonymizationsAction>({
      type: GET_ANONYMIZATIONS,
      data: anonymizationList || [],
    })
  }
}

export const getOneAnonymization = (anonymization_uuid: string): AppThunk => {
  return async (dispatch: Dispatch) => {
    const anonymizationList = (await localForage.getItem(LS_ANONYMIZATIONS)) as Anonymization[]
    const oneAnonymization = anonymizationList.find((item) => item.uuid === anonymization_uuid)
    if (oneAnonymization != null) {
      dispatch<GetOneAnonymizationAction>({
        type: GET_ONE_ANONYMIZATION,
        obj: oneAnonymization as Anonymization,
      })
    } else {
      throw "Anonymization not found"
    }
  }
}

export const updateAnonymization = (anonymization_to_update: Anonymization): AppThunk<Promise<Anonymization>> => {
  return async (dispatch: Dispatch) => {
    let anonymizationList = (await localForage.getItem(LS_ANONYMIZATIONS)) as Anonymization[]
    if (!isEmpty(anonymizationList) && anonymizationList != null) {
      const index = findIndex(anonymizationList, (item) => item.uuid === anonymization_to_update.uuid)
      anonymizationList[index] = anonymization_to_update
    } else {
      anonymizationList = [anonymization_to_update]
    }
    const response = await localForage.setItem(LS_ANONYMIZATIONS, anonymizationList)
    dispatch<UpdateAnonymizationsAction>({
      type: UPDATE_ANONYMIZATIONS,
      data: response,
      obj: anonymization_to_update,
    })
    return last(response) as Anonymization
  }
}
export const deleteAnonymization = (anonymization_uuid: string): AppThunk => {
  return async (dispatch: Dispatch) => {
    const anonymizationList = (await localForage.getItem(LS_ANONYMIZATIONS)) as Anonymization[]
    const index = findIndex(anonymizationList, (item) => item.uuid === anonymization_uuid)
    anonymizationList.splice(index, 1)
    const response = await localForage.setItem(LS_ANONYMIZATIONS, anonymizationList)
    dispatch<DeleteAnonymizationsAction>({
      type: DELETE_ANONYMIZATIONS,
      data: response,
    })
  }
}

export const duplicateAnonymization = (anonymization_uuid: string): AppThunk => {
  return async (dispatch: Dispatch) => {
    const anonymizationList = (await localForage.getItem(LS_ANONYMIZATIONS)) as Anonymization[]
    const anonymizationToDuplicate = anonymizationList.find((item) => item.uuid === anonymization_uuid)
    if (anonymizationToDuplicate != null) {
      const uuid = uuidv4()
      const now = new Date()
      const newAnonymization = { ...anonymizationToDuplicate }
      newAnonymization.uuid = uuid
      newAnonymization.name = anonymizationToDuplicate?.name + " copy"
      newAnonymization.created_at = now.toUTCString()
      anonymizationList.push(newAnonymization)
    }
    const response = await localForage.setItem(LS_ANONYMIZATIONS, anonymizationList)
    dispatch<DuplicateAnonymizationsAction>({
      type: DUPLICATE_ANONYMIZATIONS,
      data: response,
    })
  }
}

export const cleanAnonymizationDetails = (): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch<CleanAnonymizationDetailsAction>({
      type: CLEAN_ANONYMIZATION_DETAILS,
    })
  }
}
