import { ErrorObject, FieldTypeRemoveItem, ReducerActionType } from '../../Utils/types'
import {
  ACTION,
  FieldTypeDiseaseCreate,
  FieldTypeDiseaseUpdate,
  ResponseTypeDiseaseCreate,
  ResponseTypeDiseaseList,
  ResponseTypeDiseaseRemove,
  ResponseTypeDiseaseUpdate,
} from './Types'

const list = {
  request : (): ReducerActionType => ({
    type: ACTION.DISEASE_LIST.REQUEST
  }),
  success : (response: ResponseTypeDiseaseList): ReducerActionType<unknown, ResponseTypeDiseaseList> => ({
    type: ACTION.DISEASE_LIST.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.DISEASE_LIST.FAILURE,
    error
  })
}

const create = {
  request : (payload: FieldTypeDiseaseCreate): ReducerActionType<FieldTypeDiseaseCreate> => ({
    type: ACTION.DISEASE_CREATE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeDiseaseCreate): ReducerActionType<unknown, ResponseTypeDiseaseCreate> => ({
    type: ACTION.DISEASE_CREATE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.DISEASE_CREATE.FAILURE,
    error
  })
}

const update = {
  request : (payload: FieldTypeDiseaseUpdate): ReducerActionType<FieldTypeDiseaseUpdate> => ({
    type: ACTION.DISEASE_UPDATE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeDiseaseUpdate): ReducerActionType<unknown, ResponseTypeDiseaseUpdate> => ({
    type: ACTION.DISEASE_UPDATE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.DISEASE_UPDATE.FAILURE,
    error
  })
}

const remove = {
  request : (payload: FieldTypeRemoveItem): ReducerActionType<FieldTypeRemoveItem> => ({
    type: ACTION.DISEASE_REMOVE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeDiseaseRemove): ReducerActionType<unknown, ResponseTypeDiseaseRemove> => ({
    type: ACTION.DISEASE_REMOVE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.DISEASE_REMOVE.FAILURE,
    error
  })
}

export const diseaseAction = { list, create, update, remove }
