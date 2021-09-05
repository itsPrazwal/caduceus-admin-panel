import { ErrorObject, FieldTypeRemoveItem, ReducerActionType } from '../../Utils/types'
import {
  ACTION,
  FieldTypeAmbulanceCreate,
  FieldTypeAmbulanceUpdate,
  ResponseTypeAmbulanceCreate,
  ResponseTypeAmbulanceList,
  ResponseTypeAmbulanceRemove,
  ResponseTypeAmbulanceUpdate,
} from './Types'

const list = {
  request : (): ReducerActionType => ({
    type: ACTION.AMBULANCE_LIST.REQUEST
  }),
  success : (response: ResponseTypeAmbulanceList): ReducerActionType<unknown, ResponseTypeAmbulanceList> => ({
    type: ACTION.AMBULANCE_LIST.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.AMBULANCE_LIST.FAILURE,
    error
  })
}

const create = {
  request : (payload: FieldTypeAmbulanceCreate): ReducerActionType<FieldTypeAmbulanceCreate> => ({
    type: ACTION.AMBULANCE_CREATE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeAmbulanceCreate): ReducerActionType<unknown, ResponseTypeAmbulanceCreate> => ({
    type: ACTION.AMBULANCE_CREATE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.AMBULANCE_CREATE.FAILURE,
    error
  })
}

const update = {
  request : (payload: FieldTypeAmbulanceUpdate): ReducerActionType<FieldTypeAmbulanceUpdate> => ({
    type: ACTION.AMBULANCE_UPDATE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeAmbulanceUpdate): ReducerActionType<unknown, ResponseTypeAmbulanceUpdate> => ({
    type: ACTION.AMBULANCE_UPDATE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.AMBULANCE_UPDATE.FAILURE,
    error
  })
}

const remove = {
  request : (payload: FieldTypeRemoveItem): ReducerActionType<FieldTypeRemoveItem> => ({
    type: ACTION.AMBULANCE_REMOVE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeAmbulanceRemove): ReducerActionType<unknown, ResponseTypeAmbulanceRemove> => ({
    type: ACTION.AMBULANCE_REMOVE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.AMBULANCE_REMOVE.FAILURE,
    error
  })
}

export const ambulanceAction = { list, create, update, remove }
