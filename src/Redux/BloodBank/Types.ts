import { CommonReducerState, FieldTypeRemoveItem, Nullable, ResponseTypeCommon } from '../../Utils/types'
import { OperationStatus } from '../../Utils/enums'
import { AxiosResponse } from 'axios'

interface FieldTypeBloodBankCreate {
    bloodBankName: string
    email: string,
    numbers: number[],
    address: string
}

interface FieldTypeBloodBankUpdate extends FieldTypeBloodBankCreate{
    _id: string
}

interface FieldTypeBloodBankMain extends FieldTypeBloodBankUpdate {
    deleted: boolean
}

type ResponseTypeBloodBankList = AxiosResponse<ResponseTypeCommon<FieldTypeBloodBankMain[]>>
type ResponseTypeBloodBankCreate = AxiosResponse<ResponseTypeCommon<FieldTypeBloodBankMain>>
type ResponseTypeBloodBankUpdate = AxiosResponse<ResponseTypeCommon<FieldTypeBloodBankMain>>
type ResponseTypeBloodBankRemove = AxiosResponse<ResponseTypeCommon<FieldTypeRemoveItem>>

interface ReducerBloodBankType extends CommonReducerState {
    bloodBankData: Nullable<FieldTypeBloodBankMain[]>,
    operationStatus: {
        list: Nullable<OperationStatus>,
        create: Nullable<OperationStatus>,
        update: Nullable<OperationStatus>,
        remove: Nullable<OperationStatus>,
    },
    bloodBankLastFetchedTime: number
}

const BLOOD_BANK_CREATE = {
  REQUEST: 'BLOOD_BANK_CREATE_REQUEST',
  SUCCESS: 'BLOOD_BANK_CREATE_SUCCESS',
  FAILURE: 'BLOOD_BANK_CREATE_FAILURE',
}

const BLOOD_BANK_LIST = {
  REQUEST: 'BLOOD_BANK_LIST_REQUEST',
  SUCCESS: 'BLOOD_BANK_LIST_SUCCESS',
  FAILURE: 'BLOOD_BANK_LIST_FAILURE',
}

const BLOOD_BANK_UPDATE = {
  REQUEST: 'BLOOD_BANK_UPDATE_REQUEST',
  SUCCESS: 'BLOOD_BANK_UPDATE_SUCCESS',
  FAILURE: 'BLOOD_BANK_UPDATE_FAILURE',
}

const BLOOD_BANK_REMOVE = {
  REQUEST: 'BLOOD_BANK_REMOVE_REQUEST',
  SUCCESS: 'BLOOD_BANK_REMOVE_SUCCESS',
  FAILURE: 'BLOOD_BANK_REMOVE_FAILURE',
}

export type {
  FieldTypeBloodBankCreate,
  FieldTypeBloodBankMain,
  FieldTypeBloodBankUpdate,
  ReducerBloodBankType,
  ResponseTypeBloodBankList, ResponseTypeBloodBankCreate, ResponseTypeBloodBankUpdate, ResponseTypeBloodBankRemove
}

export const ACTION = { BLOOD_BANK_CREATE, BLOOD_BANK_LIST, BLOOD_BANK_UPDATE, BLOOD_BANK_REMOVE }
