import {
  ACTION,
  FieldTypeBloodBankCreate,
  FieldTypeBloodBankMain,
  FieldTypeBloodBankUpdate,
  ReducerBloodBankType,
  ResponseTypeBloodBankCreate, ResponseTypeBloodBankList,
  ResponseTypeBloodBankRemove, ResponseTypeBloodBankUpdate,
} from './Types'
import { Reducer } from 'redux'
import { ErrorObject, FieldTypeRemoveItem, ReducerActionType } from '../../Utils/types'
import { OperationStatus } from '../../Utils/enums'

const initialOperationStatus = {
  list: null,
  remove: null,
  create: null,
  update: null,
}

const initialErrorMessageState = {
  error: null,
  message: ''
}

const initialReducerStateBloodBank: ReducerBloodBankType = {
  ...initialErrorMessageState,
  bloodBankData: null,
  operationStatus: initialOperationStatus ,
  bloodBankLastFetchedTime: 0
}

export const BloodBankReducer:Reducer<ReducerBloodBankType, ReducerActionType<FieldTypeBloodBankCreate | FieldTypeBloodBankUpdate | FieldTypeRemoveItem,
    ResponseTypeBloodBankCreate | ResponseTypeBloodBankList | ResponseTypeBloodBankUpdate | ResponseTypeBloodBankRemove>> = (state = initialReducerStateBloodBank, action): ReducerBloodBankType => {
      switch (action.type) {
      // LIST BLOOD_BANK
      case ACTION.BLOOD_BANK_LIST.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, list: OperationStatus.IN_PROGRESS } })
      case ACTION.BLOOD_BANK_LIST.SUCCESS: {
        return {
          ...state,
          error: null,
          bloodBankData: (action?.response as ResponseTypeBloodBankList).data.data,
          message: (action?.response as ResponseTypeBloodBankList).data.message,
          operationStatus: { ...state.operationStatus, list: OperationStatus.SUCCEEDED },
          bloodBankLastFetchedTime: Date.now()
        }
      }
      case ACTION.BLOOD_BANK_LIST.FAILURE: return ({ ...state, error: action.error as ErrorObject, operationStatus: { ...state.operationStatus, list: OperationStatus.FAILED } })

        // CREATE BLOOD_BANK
      case ACTION.BLOOD_BANK_CREATE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, create: OperationStatus.IN_PROGRESS } })
      case ACTION.BLOOD_BANK_CREATE.SUCCESS: {
        const newBloodBank = (action?.response as ResponseTypeBloodBankCreate).data.data
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeBloodBankCreate)?.data?.message,
          bloodBankData: newBloodBank ? [...state.bloodBankData as FieldTypeBloodBankMain[], newBloodBank] : [...state.bloodBankData as FieldTypeBloodBankMain[]],
          operationStatus: { ...initialOperationStatus, create: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.BLOOD_BANK_CREATE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, create: OperationStatus.FAILED } })

        // UPDATE BLOOD_BANK
      case ACTION.BLOOD_BANK_UPDATE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, update: OperationStatus.IN_PROGRESS } })
      case ACTION.BLOOD_BANK_UPDATE.SUCCESS: {
        const updatedBloodBank: FieldTypeBloodBankMain = (action?.response as ResponseTypeBloodBankUpdate)?.data?.data
        const orgIndex: number = state.bloodBankData?.findIndex(od => od?._id === updatedBloodBank?._id) as number
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeBloodBankUpdate)?.data?.message,
          bloodBankData: state.bloodBankData?.map((od, i) => i === orgIndex ? updatedBloodBank : od) as FieldTypeBloodBankMain[],
          operationStatus: { ...initialOperationStatus, update: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.BLOOD_BANK_UPDATE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, update: OperationStatus.FAILED } })

        // DELETE BLOOD_BANK
      case ACTION.BLOOD_BANK_REMOVE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, remove: OperationStatus.IN_PROGRESS } })
      case ACTION.BLOOD_BANK_REMOVE.SUCCESS: {
        const departmentId: string = (action?.response as ResponseTypeBloodBankRemove)?.data?.data._id
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeBloodBankRemove)?.data?.message,
          bloodBankData: state.bloodBankData?.filter(od => od._id !== departmentId) as FieldTypeBloodBankMain[],
          operationStatus: { ...initialOperationStatus, remove: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.BLOOD_BANK_REMOVE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, remove: OperationStatus.FAILED } })
      default:
        return state
      }
    }
