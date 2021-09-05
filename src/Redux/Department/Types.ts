import { CommonReducerState, FieldTypeRemoveItem, Nullable, ResponseTypeCommon } from '../../Utils/types'
import { OperationStatus } from '../../Utils/enums'
import { AxiosResponse } from 'axios'

interface FieldTypeDepartmentCreate {
    name: string,
    relatedDiseases: string[]
}

interface FieldTypeDepartmentUpdate extends FieldTypeDepartmentCreate{
    _id: string
}

interface FieldTypeDepartmentMain extends FieldTypeDepartmentUpdate {
    deleted: boolean
}

type ResponseTypeDepartmentList = AxiosResponse<ResponseTypeCommon<FieldTypeDepartmentMain[]>>
type ResponseTypeDepartmentCreate = AxiosResponse<ResponseTypeCommon<FieldTypeDepartmentMain>>
type ResponseTypeDepartmentUpdate = AxiosResponse<ResponseTypeCommon<FieldTypeDepartmentMain>>
type ResponseTypeDepartmentRemove = AxiosResponse<ResponseTypeCommon<FieldTypeRemoveItem>>

interface ReducerDepartmentType extends CommonReducerState {
    departmentData: Nullable<FieldTypeDepartmentMain[]>,
    operationStatus: {
        list: Nullable<OperationStatus>,
        create: Nullable<OperationStatus>,
        update: Nullable<OperationStatus>,
        remove: Nullable<OperationStatus>,
    },
    departmentLastFetchedTime: number
}

const DEPARTMENT_CREATE = {
  REQUEST: 'DEPARTMENT_CREATE_REQUEST',
  SUCCESS: 'DEPARTMENT_CREATE_SUCCESS',
  FAILURE: 'DEPARTMENT_CREATE_FAILURE',
}

const DEPARTMENT_LIST = {
  REQUEST: 'DEPARTMENT_LIST_REQUEST',
  SUCCESS: 'DEPARTMENT_LIST_SUCCESS',
  FAILURE: 'DEPARTMENT_LIST_FAILURE',
}

const DEPARTMENT_UPDATE = {
  REQUEST: 'DEPARTMENT_UPDATE_REQUEST',
  SUCCESS: 'DEPARTMENT_UPDATE_SUCCESS',
  FAILURE: 'DEPARTMENT_UPDATE_FAILURE',
}

const DEPARTMENT_REMOVE = {
  REQUEST: 'DEPARTMENT_REMOVE_REQUEST',
  SUCCESS: 'DEPARTMENT_REMOVE_SUCCESS',
  FAILURE: 'DEPARTMENT_REMOVE_FAILURE',
}

export type {
  FieldTypeDepartmentCreate,
  FieldTypeDepartmentMain,
  FieldTypeDepartmentUpdate,
  ReducerDepartmentType,
  ResponseTypeDepartmentList, ResponseTypeDepartmentCreate, ResponseTypeDepartmentUpdate, ResponseTypeDepartmentRemove
}

export const ACTION = { DEPARTMENT_CREATE, DEPARTMENT_LIST, DEPARTMENT_UPDATE, DEPARTMENT_REMOVE }
