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
type ResponseTypeDiseaseRemove = AxiosResponse<ResponseTypeCommon<FieldTypeRemoveItem>>

interface ReducerDiseaseType extends CommonReducerState {
    diseaseData: Nullable<FieldTypeDiseaseMain[]>,
    operationStatus: {
        list: Nullable<OperationStatus>,
        create: Nullable<OperationStatus>,
        update: Nullable<OperationStatus>,
        remove: Nullable<OperationStatus>,
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

const DISEASE_REMOVE = {
  REQUEST: 'DISEASE_REMOVE_REQUEST',
  SUCCESS: 'DISEASE_REMOVE_SUCCESS',
  FAILURE: 'DISEASE_REMOVE_FAILURE',
}

export type {
  FieldTypeDiseaseCreate,
  FieldTypeDiseaseMain,
  FieldTypeDiseaseUpdate,
  ReducerDiseaseType,
  ResponseTypeDiseaseList, ResponseTypeDiseaseCreate, ResponseTypeDiseaseUpdate, ResponseTypeDiseaseRemove
}

export const ACTION = { DISEASE_CREATE, DISEASE_LIST, DISEASE_UPDATE, DISEASE_REMOVE }
