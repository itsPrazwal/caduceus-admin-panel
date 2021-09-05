import { CommonReducerState, FieldTypeRemoveItem, Nullable, ResponseTypeCommon } from '../../Utils/types'
import { OperationStatus } from '../../Utils/enums'
import { AxiosResponse } from 'axios'

interface FieldTypeHospitalCreate {
    address: string,
    name: string,
    numbers: number[],
    speciality?: string[],
    detail?: string,
    email?: string,
    ambulanceNumber?: number,
}

interface FieldTypeHospitalUpdate extends FieldTypeHospitalCreate{
    ambulanceId?: Nullable<string>,
    ambulanceNumber?: number,
    _id: string,
}

interface FieldTypeHospitalMain extends FieldTypeHospitalCreate {
    _id: string,
    ambulanceId: Nullable<string>,
    deleted: boolean
}

type ResponseTypeHospitalList = AxiosResponse<ResponseTypeCommon<FieldTypeHospitalMain[]>>
type ResponseTypeHospitalCreate = AxiosResponse<ResponseTypeCommon<FieldTypeHospitalMain>>
type ResponseTypeHospitalUpdate = AxiosResponse<ResponseTypeCommon<FieldTypeHospitalMain>>
type ResponseTypeHospitalRemove = AxiosResponse<ResponseTypeCommon<FieldTypeRemoveItem>>

interface ReducerHospitalType extends CommonReducerState {
    hospitalData: Nullable<FieldTypeHospitalMain[]>,
    operationStatus: {
        list: Nullable<OperationStatus>,
        create: Nullable<OperationStatus>,
        update: Nullable<OperationStatus>,
        remove: Nullable<OperationStatus>,
    },
    hospitalLastFetchedTime: number
}

const HOSPITAL_CREATE = {
  REQUEST: 'HOSPITAL_CREATE_REQUEST',
  SUCCESS: 'HOSPITAL_CREATE_SUCCESS',
  FAILURE: 'HOSPITAL_CREATE_FAILURE',
}

const HOSPITAL_LIST = {
  REQUEST: 'HOSPITAL_LIST_REQUEST',
  SUCCESS: 'HOSPITAL_LIST_SUCCESS',
  FAILURE: 'HOSPITAL_LIST_FAILURE',
}

const HOSPITAL_UPDATE = {
  REQUEST: 'HOSPITAL_UPDATE_REQUEST',
  SUCCESS: 'HOSPITAL_UPDATE_SUCCESS',
  FAILURE: 'HOSPITAL_UPDATE_FAILURE',
}

const HOSPITAL_REMOVE = {
  REQUEST: 'HOSPITAL_REMOVE_REQUEST',
  SUCCESS: 'HOSPITAL_REMOVE_SUCCESS',
  FAILURE: 'HOSPITAL_REMOVE_FAILURE',
}

export type {
  FieldTypeHospitalCreate,
  FieldTypeHospitalMain,
  FieldTypeHospitalUpdate,
  ReducerHospitalType,
  ResponseTypeHospitalList, ResponseTypeHospitalCreate, ResponseTypeHospitalUpdate, ResponseTypeHospitalRemove
}

export const ACTION = { HOSPITAL_CREATE, HOSPITAL_LIST, HOSPITAL_UPDATE, HOSPITAL_REMOVE }
