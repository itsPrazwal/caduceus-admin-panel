import {
  ACTION,
  FieldTypeAmbulanceCreate,
  FieldTypeAmbulanceMain,
  FieldTypeAmbulanceUpdate,
  ReducerAmbulanceType,
  ResponseTypeAmbulanceCreate, ResponseTypeAmbulanceList,
  ResponseTypeAmbulanceRemove, ResponseTypeAmbulanceUpdate,
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

const initialReducerStateAmbulance: ReducerAmbulanceType = {
  ...initialErrorMessageState,
  ambulanceData: null,
  operationStatus: initialOperationStatus ,
  ambulanceLastFetchedTime: 0
}

export const AmbulanceReducer:Reducer<ReducerAmbulanceType, ReducerActionType<FieldTypeAmbulanceCreate | FieldTypeAmbulanceUpdate | FieldTypeRemoveItem,
    ResponseTypeAmbulanceCreate | ResponseTypeAmbulanceList | ResponseTypeAmbulanceUpdate | ResponseTypeAmbulanceRemove>> = (state = initialReducerStateAmbulance, action): ReducerAmbulanceType => {
      switch (action.type) {
      // LIST AMBULANCE
      case ACTION.AMBULANCE_LIST.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, list: OperationStatus.IN_PROGRESS } })
      case ACTION.AMBULANCE_LIST.SUCCESS: {
        return {
          ...state,
          error: null,
          ambulanceData: (action?.response as ResponseTypeAmbulanceList).data.data,
          message: (action?.response as ResponseTypeAmbulanceList).data.message,
          operationStatus: { ...state.operationStatus, list: OperationStatus.SUCCEEDED },
          ambulanceLastFetchedTime: Date.now()
        }
      }
      case ACTION.AMBULANCE_LIST.FAILURE: return ({ ...state, error: action.error as ErrorObject, operationStatus: { ...state.operationStatus, list: OperationStatus.FAILED } })

        // CREATE AMBULANCE
      case ACTION.AMBULANCE_CREATE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, create: OperationStatus.IN_PROGRESS } })
      case ACTION.AMBULANCE_CREATE.SUCCESS: {
        const newAmbulance = (action?.response as ResponseTypeAmbulanceCreate).data.data
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeAmbulanceCreate)?.data?.message,
          ambulanceData: newAmbulance ? [...state.ambulanceData as FieldTypeAmbulanceMain[], newAmbulance] : [...state.ambulanceData as FieldTypeAmbulanceMain[]],
          operationStatus: { ...initialOperationStatus, create: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.AMBULANCE_CREATE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, create: OperationStatus.FAILED } })

        // UPDATE AMBULANCE
      case ACTION.AMBULANCE_UPDATE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, update: OperationStatus.IN_PROGRESS } })
      case ACTION.AMBULANCE_UPDATE.SUCCESS: {
        const updatedAmbulance: FieldTypeAmbulanceMain = (action?.response as ResponseTypeAmbulanceUpdate)?.data?.data
        const orgIndex: number = state.ambulanceData?.findIndex(od => od?._id === updatedAmbulance?._id) as number
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeAmbulanceUpdate)?.data?.message,
          ambulanceData: state.ambulanceData?.map((od, i) => i === orgIndex ? updatedAmbulance : od) as FieldTypeAmbulanceMain[],
          operationStatus: { ...initialOperationStatus, update: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.AMBULANCE_UPDATE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, update: OperationStatus.FAILED } })

        // DELETE AMBULANCE
      case ACTION.AMBULANCE_REMOVE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, remove: OperationStatus.IN_PROGRESS } })
      case ACTION.AMBULANCE_REMOVE.SUCCESS: {
        const departmentId: string = (action?.response as ResponseTypeAmbulanceRemove)?.data?.data._id
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeAmbulanceRemove)?.data?.message,
          ambulanceData: state.ambulanceData?.filter(od => od._id !== departmentId) as FieldTypeAmbulanceMain[],
          operationStatus: { ...initialOperationStatus, remove: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.AMBULANCE_REMOVE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, remove: OperationStatus.FAILED } })
      default:
        return state
      }
    }
