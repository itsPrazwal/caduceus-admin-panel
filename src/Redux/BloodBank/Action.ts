import { ErrorObject, FieldTypeRemoveItem, ReducerActionType } from '../../Utils/types'
import {
  ACTION,
  FieldTypeBloodBankCreate,
  FieldTypeBloodBankUpdate,
  ResponseTypeBloodBankCreate,
  ResponseTypeBloodBankList,
  ResponseTypeBloodBankRemove,
  ResponseTypeBloodBankUpdate,
} from './Types'

const list = {
  request : (): ReducerActionType => ({
    type: ACTION.BLOOD_BANK_LIST.REQUEST
  }),
  success : (response: ResponseTypeBloodBankList): ReducerActionType<unknown, ResponseTypeBloodBankList> => ({
    type: ACTION.BLOOD_BANK_LIST.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.BLOOD_BANK_LIST.FAILURE,
    error
  })
}

const create = {
  request : (payload: FieldTypeBloodBankCreate): ReducerActionType<FieldTypeBloodBankCreate> => ({
    type: ACTION.BLOOD_BANK_CREATE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeBloodBankCreate): ReducerActionType<unknown, ResponseTypeBloodBankCreate> => ({
    type: ACTION.BLOOD_BANK_CREATE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.BLOOD_BANK_CREATE.FAILURE,
    error
  })
}

const update = {
  request : (payload: FieldTypeBloodBankUpdate): ReducerActionType<FieldTypeBloodBankUpdate> => ({
    type: ACTION.BLOOD_BANK_UPDATE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeBloodBankUpdate): ReducerActionType<unknown, ResponseTypeBloodBankUpdate> => ({
    type: ACTION.BLOOD_BANK_UPDATE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.BLOOD_BANK_UPDATE.FAILURE,
    error
  })
}

const remove = {
  request : (payload: FieldTypeRemoveItem): ReducerActionType<FieldTypeRemoveItem> => ({
    type: ACTION.BLOOD_BANK_REMOVE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeBloodBankRemove): ReducerActionType<unknown, ResponseTypeBloodBankRemove> => ({
    type: ACTION.BLOOD_BANK_REMOVE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.BLOOD_BANK_REMOVE.FAILURE,
    error
  })
}

export const bloodBankAction = { list, create, update, remove }
