import {
  ACTION,
  FieldTypeEventCreate,
  FieldTypeEventMain,
  FieldTypeEventUpdate,
  ReducerEventType,
  ResponseTypeEventCreate, ResponseTypeEventList,
  ResponseTypeEventRemove, ResponseTypeEventUpdate,
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

const initialReducerStateEvent: ReducerEventType = {
  ...initialErrorMessageState,
  eventData: null,
  operationStatus: initialOperationStatus ,
  eventLastFetchedTime: 0
}

export const EventReducer:Reducer<ReducerEventType, ReducerActionType<FieldTypeEventCreate | FieldTypeEventUpdate | FieldTypeRemoveItem,
    ResponseTypeEventCreate | ResponseTypeEventList | ResponseTypeEventUpdate | ResponseTypeEventRemove>> = (state = initialReducerStateEvent, action): ReducerEventType => {
      switch (action.type) {
      // LIST EVENT
      case ACTION.EVENT_LIST.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, list: OperationStatus.IN_PROGRESS } })
      case ACTION.EVENT_LIST.SUCCESS: {
        return {
          ...state,
          error: null,
          eventData: (action?.response as ResponseTypeEventList).data.data,
          message: (action?.response as ResponseTypeEventList).data.message,
          operationStatus: { ...state.operationStatus, list: OperationStatus.SUCCEEDED },
          eventLastFetchedTime: Date.now()
        }
      }
      case ACTION.EVENT_LIST.FAILURE: return ({ ...state, error: action.error as ErrorObject, operationStatus: { ...state.operationStatus, list: OperationStatus.FAILED } })

        // CREATE EVENT
      case ACTION.EVENT_CREATE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, create: OperationStatus.IN_PROGRESS } })
      case ACTION.EVENT_CREATE.SUCCESS: {
        const newEvent = (action?.response as ResponseTypeEventCreate).data.data
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeEventCreate)?.data?.message,
          eventData: newEvent ? [...state.eventData as FieldTypeEventMain[], newEvent] : [...state.eventData as FieldTypeEventMain[]],
          operationStatus: { ...initialOperationStatus, create: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.EVENT_CREATE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, create: OperationStatus.FAILED } })

        // UPDATE EVENT
      case ACTION.EVENT_UPDATE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, update: OperationStatus.IN_PROGRESS } })
      case ACTION.EVENT_UPDATE.SUCCESS: {
        const updatedEvent: FieldTypeEventMain = (action?.response as ResponseTypeEventUpdate)?.data?.data
        const orgIndex: number = state.eventData?.findIndex(od => od?._id === updatedEvent?._id) as number
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeEventUpdate)?.data?.message,
          eventData: state.eventData?.map((od, i) => i === orgIndex ? updatedEvent : od) as FieldTypeEventMain[],
          operationStatus: { ...initialOperationStatus, update: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.EVENT_UPDATE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, update: OperationStatus.FAILED } })

        // DELETE EVENT
      case ACTION.EVENT_REMOVE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, remove: OperationStatus.IN_PROGRESS } })
      case ACTION.EVENT_REMOVE.SUCCESS: {
        const departmentId: string = (action?.response as ResponseTypeEventRemove)?.data?.data._id
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeEventRemove)?.data?.message,
          eventData: state.eventData?.filter(od => od._id !== departmentId) as FieldTypeEventMain[],
          operationStatus: { ...initialOperationStatus, remove: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.EVENT_REMOVE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, remove: OperationStatus.FAILED } })
      default:
        return state
      }
    }
