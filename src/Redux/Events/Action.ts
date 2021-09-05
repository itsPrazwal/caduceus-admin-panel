import { ErrorObject, FieldTypeRemoveItem, ReducerActionType } from '../../Utils/types'
import {
  ACTION,
  FieldTypeEventCreate,
  FieldTypeEventUpdate,
  ResponseTypeEventCreate,
  ResponseTypeEventList,
  ResponseTypeEventRemove,
  ResponseTypeEventUpdate,
} from './Types'

const list = {
  request : (): ReducerActionType => ({
    type: ACTION.EVENT_LIST.REQUEST
  }),
  success : (response: ResponseTypeEventList): ReducerActionType<unknown, ResponseTypeEventList> => ({
    type: ACTION.EVENT_LIST.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.EVENT_LIST.FAILURE,
    error
  })
}

const create = {
  request : (payload: FieldTypeEventCreate): ReducerActionType<FieldTypeEventCreate> => ({
    type: ACTION.EVENT_CREATE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeEventCreate): ReducerActionType<unknown, ResponseTypeEventCreate> => ({
    type: ACTION.EVENT_CREATE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.EVENT_CREATE.FAILURE,
    error
  })
}

const update = {
  request : (payload: FieldTypeEventUpdate): ReducerActionType<FieldTypeEventUpdate> => ({
    type: ACTION.EVENT_UPDATE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeEventUpdate): ReducerActionType<unknown, ResponseTypeEventUpdate> => ({
    type: ACTION.EVENT_UPDATE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.EVENT_UPDATE.FAILURE,
    error
  })
}

const remove = {
  request : (payload: FieldTypeRemoveItem): ReducerActionType<FieldTypeRemoveItem> => ({
    type: ACTION.EVENT_REMOVE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeEventRemove): ReducerActionType<unknown, ResponseTypeEventRemove> => ({
    type: ACTION.EVENT_REMOVE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.EVENT_REMOVE.FAILURE,
    error
  })
}

export const eventAction = { list, create, update, remove }
