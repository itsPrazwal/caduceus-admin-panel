import {
  ACTION,
  FieldTypeHospitalCreate,
  FieldTypeHospitalMain,
  FieldTypeHospitalUpdate,
  ReducerHospitalType,
  ResponseTypeHospitalCreate, ResponseTypeHospitalList,
  ResponseTypeHospitalRemove, ResponseTypeHospitalUpdate,
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

const initialReducerStateHospital: ReducerHospitalType = {
  ...initialErrorMessageState,
  hospitalData: null,
  operationStatus: initialOperationStatus ,
  hospitalLastFetchedTime: 0
}

export const HospitalReducer:Reducer<ReducerHospitalType, ReducerActionType<FieldTypeHospitalCreate | FieldTypeHospitalUpdate | FieldTypeRemoveItem,
    ResponseTypeHospitalCreate | ResponseTypeHospitalList | ResponseTypeHospitalUpdate | ResponseTypeHospitalRemove>> = (state = initialReducerStateHospital, action): ReducerHospitalType => {
      switch (action.type) {
      // LIST HOSPITAL
      case ACTION.HOSPITAL_LIST.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, list: OperationStatus.IN_PROGRESS } })
      case ACTION.HOSPITAL_LIST.SUCCESS: {
        return {
          ...state,
          error: null,
          hospitalData: (action?.response as ResponseTypeHospitalList).data.data,
          message: (action?.response as ResponseTypeHospitalList).data.message,
          operationStatus: { ...state.operationStatus, list: OperationStatus.SUCCEEDED },
          hospitalLastFetchedTime: Date.now()
        }
      }
      case ACTION.HOSPITAL_LIST.FAILURE: return ({ ...state, error: action.error as ErrorObject, operationStatus: { ...state.operationStatus, list: OperationStatus.FAILED } })

        // CREATE HOSPITAL
      case ACTION.HOSPITAL_CREATE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, create: OperationStatus.IN_PROGRESS } })
      case ACTION.HOSPITAL_CREATE.SUCCESS: {
        const newHospital = (action?.response as ResponseTypeHospitalCreate).data.data
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeHospitalCreate)?.data?.message,
          hospitalData: newHospital ? [...state.hospitalData as FieldTypeHospitalMain[], newHospital] : [...state.hospitalData as FieldTypeHospitalMain[]],
          operationStatus: { ...initialOperationStatus, create: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.HOSPITAL_CREATE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, create: OperationStatus.FAILED } })

        // UPDATE HOSPITAL
      case ACTION.HOSPITAL_UPDATE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, update: OperationStatus.IN_PROGRESS } })
      case ACTION.HOSPITAL_UPDATE.SUCCESS: {
        const updatedHospital: FieldTypeHospitalMain = (action?.response as ResponseTypeHospitalUpdate)?.data?.data
        const orgIndex: number = state.hospitalData?.findIndex(od => od?._id === updatedHospital?._id) as number
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeHospitalUpdate)?.data?.message,
          hospitalData: state.hospitalData?.map((od, i) => i === orgIndex ? updatedHospital : od) as FieldTypeHospitalMain[],
          operationStatus: { ...initialOperationStatus, update: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.HOSPITAL_UPDATE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, update: OperationStatus.FAILED } })

        // DELETE HOSPITAL
      case ACTION.HOSPITAL_REMOVE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, remove: OperationStatus.IN_PROGRESS } })
      case ACTION.HOSPITAL_REMOVE.SUCCESS: {
        const departmentId: string = (action?.response as ResponseTypeHospitalRemove)?.data?.data._id
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeHospitalRemove)?.data?.message,
          hospitalData: state.hospitalData?.filter(od => od._id !== departmentId) as FieldTypeHospitalMain[],
          operationStatus: { ...initialOperationStatus, remove: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.HOSPITAL_REMOVE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, remove: OperationStatus.FAILED } })
      default:
        return state
      }
    }
