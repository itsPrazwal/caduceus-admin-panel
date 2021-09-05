import { ErrorObject, FieldTypeRemoveItem, ReducerActionType } from '../../Utils/types'
import {
  ACTION,
  FieldTypeHospitalCreate,
  FieldTypeHospitalUpdate,
  ResponseTypeHospitalCreate,
  ResponseTypeHospitalList,
  ResponseTypeHospitalRemove,
  ResponseTypeHospitalUpdate,
} from './Types'

const list = {
  request : (): ReducerActionType => ({
    type: ACTION.HOSPITAL_LIST.REQUEST
  }),
  success : (response: ResponseTypeHospitalList): ReducerActionType<unknown, ResponseTypeHospitalList> => ({
    type: ACTION.HOSPITAL_LIST.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.HOSPITAL_LIST.FAILURE,
    error
  })
}

const create = {
  request : (payload: FieldTypeHospitalCreate): ReducerActionType<FieldTypeHospitalCreate> => ({
    type: ACTION.HOSPITAL_CREATE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeHospitalCreate): ReducerActionType<unknown, ResponseTypeHospitalCreate> => ({
    type: ACTION.HOSPITAL_CREATE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.HOSPITAL_CREATE.FAILURE,
    error
  })
}

const update = {
  request : (payload: FieldTypeHospitalUpdate): ReducerActionType<FieldTypeHospitalUpdate> => ({
    type: ACTION.HOSPITAL_UPDATE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeHospitalUpdate): ReducerActionType<unknown, ResponseTypeHospitalUpdate> => ({
    type: ACTION.HOSPITAL_UPDATE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.HOSPITAL_UPDATE.FAILURE,
    error
  })
}

const remove = {
  request : (payload: FieldTypeRemoveItem): ReducerActionType<FieldTypeRemoveItem> => ({
    type: ACTION.HOSPITAL_REMOVE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeHospitalRemove): ReducerActionType<unknown, ResponseTypeHospitalRemove> => ({
    type: ACTION.HOSPITAL_REMOVE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.HOSPITAL_REMOVE.FAILURE,
    error
  })
}

export const hospitalAction = { list, create, update, remove }
