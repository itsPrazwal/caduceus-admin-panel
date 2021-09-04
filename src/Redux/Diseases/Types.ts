import { CommonReducerState, FieldTypeRemoveItem, Nullable, ResponseTypeCommon } from '../../Utils/types'
import { OperationStatus } from '../../Utils/enums'
import { AxiosResponse } from 'axios'

interface FieldTypeDiseaseCreate {
    name: string,
    bodyPart: string[],
    causes: string[],
    symptoms: string[],
    riskFactors?: string[],
    prevention?: string[],
    complications?: string[],
    homeRemedy?: string[],
}

interface FieldTypeDiseaseUpdate extends FieldTypeDiseaseCreate{
    _id: string
}

interface FieldTypeDiseaseMain extends FieldTypeDiseaseCreate {
    _id: string,
    deleted: boolean
}

type ResponseTypeDiseaseList = AxiosResponse<ResponseTypeCommon<FieldTypeDiseaseMain[]>>
type ResponseTypeDiseaseCreate = AxiosResponse<ResponseTypeCommon<FieldTypeDiseaseMain>>
type ResponseTypeDiseaseUpdate = AxiosResponse<ResponseTypeCommon<FieldTypeDiseaseMain>>
type ResponseTypeDiseaseDelete = AxiosResponse<ResponseTypeCommon<FieldTypeRemoveItem>>

interface ReducerDiseaseType extends CommonReducerState {
    diseaseData: Nullable<FieldTypeDiseaseMain[]>,
    operationStatus: {
        list: Nullable<OperationStatus>,
        create: Nullable<OperationStatus>,
        update: Nullable<OperationStatus>,
        statusToggle: Nullable<OperationStatus>,
    },
    diseaseLastFetchedTime: number
}

const DISEASE_CREATE = {
  REQUEST: 'DISEASE_CREATE_REQUEST',
  SUCCESS: 'DISEASE_CREATE_SUCCESS',
  FAILURE: 'DISEASE_CREATE_FAILURE',
}

const DISEASE_LIST = {
  REQUEST: 'DISEASE_LIST_REQUEST',
  SUCCESS: 'DISEASE_LIST_SUCCESS',
  FAILURE: 'DISEASE_LIST_FAILURE',
}

const DISEASE_UPDATE = {
  REQUEST: 'DISEASE_UPDATE_REQUEST',
  SUCCESS: 'DISEASE_UPDATE_SUCCESS',
  FAILURE: 'DISEASE_UPDATE_FAILURE',
}

const DISEASE_DELETE = {
  REQUEST: 'DISEASE_DELETE_REQUEST',
  SUCCESS: 'DISEASE_DELETE_SUCCESS',
  FAILURE: 'DISEASE_DELETE_FAILURE',
}

export type {
  FieldTypeDiseaseCreate,
  FieldTypeDiseaseMain,
  FieldTypeDiseaseUpdate,
  ReducerDiseaseType,
  ResponseTypeDiseaseList, ResponseTypeDiseaseCreate, ResponseTypeDiseaseUpdate, ResponseTypeDiseaseDelete
}

export const ACTION = { DISEASE_CREATE, DISEASE_LIST, DISEASE_UPDATE, DISEASE_DELETE }
