import {
  ACTION,
  FieldTypeDiseaseCreate,
  FieldTypeDiseaseMain,
  FieldTypeDiseaseUpdate,
  ReducerDiseaseType,
  ResponseTypeDiseaseCreate, ResponseTypeDiseaseDelete,
  ResponseTypeDiseaseList, ResponseTypeDiseaseUpdate,
} from './Types'
import { Reducer } from 'redux'
import { ErrorObject, FieldTypeRemoveItem, ReducerActionType } from '../../Utils/types'
import { OperationStatus } from '../../Utils/enums'

const initialOperationStatus = {
  list: null,
  statusToggle: null,
  create: null,
  update: null,
}

const initialErrorMessageState = {
  error: null,
  message: ''
}

const initialReducerStateDisease: ReducerDiseaseType = {
  ...initialErrorMessageState,
  diseaseData: null,
  operationStatus: initialOperationStatus ,
  diseaseLastFetchedTime: 0
}

export const DiseaseReducer:Reducer<ReducerDiseaseType, ReducerActionType<FieldTypeDiseaseCreate | FieldTypeDiseaseUpdate | FieldTypeRemoveItem,
    ResponseTypeDiseaseCreate | ResponseTypeDiseaseList | ResponseTypeDiseaseUpdate | ResponseTypeDiseaseDelete>> = (state = initialReducerStateDisease, action): ReducerDiseaseType => {
      switch (action.type) {
      // LIST DISEASE
      case ACTION.DISEASE_LIST.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, list: OperationStatus.IN_PROGRESS } })
      case ACTION.DISEASE_LIST.SUCCESS: {
        return {
          ...state,
          error: null,
          diseaseData: (action?.response as ResponseTypeDiseaseList).data.data,
          message: (action?.response as ResponseTypeDiseaseList).data.message,
          operationStatus: { ...state.operationStatus, list: OperationStatus.SUCCEEDED },
          diseaseLastFetchedTime: Date.now()
        }
      }
      case ACTION.DISEASE_LIST.FAILURE: return ({ ...state, error: action.error as ErrorObject, operationStatus: { ...state.operationStatus, list: OperationStatus.FAILED } })

        // CREATE DISEASE
      case ACTION.DISEASE_CREATE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, create: OperationStatus.IN_PROGRESS } })
      case ACTION.DISEASE_CREATE.SUCCESS: {
        const newDisease = (action?.response as ResponseTypeDiseaseCreate).data.data
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeDiseaseCreate)?.data?.message,
          diseaseData: newDisease ? [...state.diseaseData as FieldTypeDiseaseMain[], newDisease] : [...state.diseaseData as FieldTypeDiseaseMain[]],
          operationStatus: { ...initialOperationStatus, create: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.DISEASE_CREATE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, create: OperationStatus.FAILED } })

        // UPDATE DISEASE
      case ACTION.DISEASE_UPDATE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, update: OperationStatus.IN_PROGRESS } })
      case ACTION.DISEASE_UPDATE.SUCCESS: {
        const updatedDisease: FieldTypeDiseaseMain = (action?.response as ResponseTypeDiseaseUpdate)?.data?.data
        const orgIndex: number = state.diseaseData?.findIndex(od => od?._id === updatedDisease?._id) as number
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeDiseaseUpdate)?.data?.message,
          diseaseData: state.diseaseData?.map((od, i) => i === orgIndex ? updatedDisease : od) as FieldTypeDiseaseMain[],
          operationStatus: { ...initialOperationStatus, update: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.DISEASE_UPDATE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, update: OperationStatus.FAILED } })

        // DELETE DISEASE
      case ACTION.DISEASE_DELETE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, statusToggle: OperationStatus.IN_PROGRESS } })
      case ACTION.DISEASE_DELETE.SUCCESS: {
        console.log('here in red')
        const diseaseId: string = (action?.response as ResponseTypeDiseaseDelete)?.data?.data._id
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeDiseaseDelete)?.data?.message,
          diseaseData: state.diseaseData?.filter(od => od._id !== diseaseId) as FieldTypeDiseaseMain[],
          operationStatus: { ...initialOperationStatus, statusToggle: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.DISEASE_DELETE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, statusToggle: OperationStatus.FAILED } })
      default:
        return state
      }
    }
