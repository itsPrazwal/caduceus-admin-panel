import { CommonReducerState, FieldTypeRemoveItem, Nullable, ResponseTypeCommon } from '../../Utils/types'
import { OperationStatus } from '../../Utils/enums'
import { AxiosResponse } from 'axios'

interface FieldTypeAmbulanceCreate {
    ambulanceName: string,
    organizationName: string,
    numbers: number[],
    email?: string,
    address?: string,
}

interface FieldTypeAmbulanceUpdate extends FieldTypeAmbulanceCreate{
    _id: string
}

interface FieldTypeAmbulanceMain extends FieldTypeAmbulanceUpdate {
    deleted: boolean
}

type ResponseTypeAmbulanceList = AxiosResponse<ResponseTypeCommon<FieldTypeAmbulanceMain[]>>
type ResponseTypeAmbulanceCreate = AxiosResponse<ResponseTypeCommon<FieldTypeAmbulanceMain>>
type ResponseTypeAmbulanceUpdate = AxiosResponse<ResponseTypeCommon<FieldTypeAmbulanceMain>>
type ResponseTypeAmbulanceRemove = AxiosResponse<ResponseTypeCommon<FieldTypeRemoveItem>>

interface ReducerAmbulanceType extends CommonReducerState {
    ambulanceData: Nullable<FieldTypeAmbulanceMain[]>,
    operationStatus: {
        list: Nullable<OperationStatus>,
        create: Nullable<OperationStatus>,
        update: Nullable<OperationStatus>,
        remove: Nullable<OperationStatus>,
    },
    ambulanceLastFetchedTime: number
}

const AMBULANCE_CREATE = {
  REQUEST: 'AMBULANCE_CREATE_REQUEST',
  SUCCESS: 'AMBULANCE_CREATE_SUCCESS',
  FAILURE: 'AMBULANCE_CREATE_FAILURE',
}

const AMBULANCE_LIST = {
  REQUEST: 'AMBULANCE_LIST_REQUEST',
  SUCCESS: 'AMBULANCE_LIST_SUCCESS',
  FAILURE: 'AMBULANCE_LIST_FAILURE',
}

const AMBULANCE_UPDATE = {
  REQUEST: 'AMBULANCE_UPDATE_REQUEST',
  SUCCESS: 'AMBULANCE_UPDATE_SUCCESS',
  FAILURE: 'AMBULANCE_UPDATE_FAILURE',
}

const AMBULANCE_REMOVE = {
  REQUEST: 'AMBULANCE_REMOVE_REQUEST',
  SUCCESS: 'AMBULANCE_REMOVE_SUCCESS',
  FAILURE: 'AMBULANCE_REMOVE_FAILURE',
}

export type {
  FieldTypeAmbulanceCreate,
  FieldTypeAmbulanceMain,
  FieldTypeAmbulanceUpdate,
  ReducerAmbulanceType,
  ResponseTypeAmbulanceList, ResponseTypeAmbulanceCreate, ResponseTypeAmbulanceUpdate, ResponseTypeAmbulanceRemove
}

export const ACTION = { AMBULANCE_CREATE, AMBULANCE_LIST, AMBULANCE_UPDATE, AMBULANCE_REMOVE }
