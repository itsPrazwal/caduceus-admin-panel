import { CommonReducerState, FieldTypeRemoveItem, Nullable, ResponseTypeCommon } from '../../Utils/types'
import { EventCategory, OperationStatus } from '../../Utils/enums'
import { AxiosResponse } from 'axios'

interface FieldTypeEventCreate {
    eventName: string
    eventCategory: EventCategory,
    address: string,
    contact?: number[],
}

interface FieldTypeEventUpdate extends FieldTypeEventCreate{
    _id: string
}

interface FieldTypeEventMain extends FieldTypeEventUpdate {
    deleted: boolean
}

type ResponseTypeEventList = AxiosResponse<ResponseTypeCommon<FieldTypeEventMain[]>>
type ResponseTypeEventCreate = AxiosResponse<ResponseTypeCommon<FieldTypeEventMain>>
type ResponseTypeEventUpdate = AxiosResponse<ResponseTypeCommon<FieldTypeEventMain>>
type ResponseTypeEventRemove = AxiosResponse<ResponseTypeCommon<FieldTypeRemoveItem>>

interface ReducerEventType extends CommonReducerState {
    eventData: Nullable<FieldTypeEventMain[]>,
    operationStatus: {
        list: Nullable<OperationStatus>,
        create: Nullable<OperationStatus>,
        update: Nullable<OperationStatus>,
        remove: Nullable<OperationStatus>,
    },
    eventLastFetchedTime: number
}

const EVENT_CREATE = {
  REQUEST: 'EVENT_CREATE_REQUEST',
  SUCCESS: 'EVENT_CREATE_SUCCESS',
  FAILURE: 'EVENT_CREATE_FAILURE',
}

const EVENT_LIST = {
  REQUEST: 'EVENT_LIST_REQUEST',
  SUCCESS: 'EVENT_LIST_SUCCESS',
  FAILURE: 'EVENT_LIST_FAILURE',
}

const EVENT_UPDATE = {
  REQUEST: 'EVENT_UPDATE_REQUEST',
  SUCCESS: 'EVENT_UPDATE_SUCCESS',
  FAILURE: 'EVENT_UPDATE_FAILURE',
}

const EVENT_REMOVE = {
  REQUEST: 'EVENT_REMOVE_REQUEST',
  SUCCESS: 'EVENT_REMOVE_SUCCESS',
  FAILURE: 'EVENT_REMOVE_FAILURE',
}

export type {
  FieldTypeEventCreate,
  FieldTypeEventMain,
  FieldTypeEventUpdate,
  ReducerEventType,
  ResponseTypeEventList, ResponseTypeEventCreate, ResponseTypeEventUpdate, ResponseTypeEventRemove
}

export const ACTION = { EVENT_CREATE, EVENT_LIST, EVENT_UPDATE, EVENT_REMOVE }
