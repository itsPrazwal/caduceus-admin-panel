import { ErrorObject, FieldTypeRemoveItem, ReducerActionType } from '../../Utils/types'
import {
  ACTION,
  FieldTypeDepartmentCreate,
  FieldTypeDepartmentUpdate,
  ResponseTypeDepartmentCreate,
  ResponseTypeDepartmentList,
  ResponseTypeDepartmentRemove,
  ResponseTypeDepartmentUpdate,
} from './Types'

const list = {
  request : (): ReducerActionType => ({
    type: ACTION.DEPARTMENT_LIST.REQUEST
  }),
  success : (response: ResponseTypeDepartmentList): ReducerActionType<unknown, ResponseTypeDepartmentList> => ({
    type: ACTION.DEPARTMENT_LIST.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.DEPARTMENT_LIST.FAILURE,
    error
  })
}

const create = {
  request : (payload: FieldTypeDepartmentCreate): ReducerActionType<FieldTypeDepartmentCreate> => ({
    type: ACTION.DEPARTMENT_CREATE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeDepartmentCreate): ReducerActionType<unknown, ResponseTypeDepartmentCreate> => ({
    type: ACTION.DEPARTMENT_CREATE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.DEPARTMENT_CREATE.FAILURE,
    error
  })
}

const update = {
  request : (payload: FieldTypeDepartmentUpdate): ReducerActionType<FieldTypeDepartmentUpdate> => ({
    type: ACTION.DEPARTMENT_UPDATE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeDepartmentUpdate): ReducerActionType<unknown, ResponseTypeDepartmentUpdate> => ({
    type: ACTION.DEPARTMENT_UPDATE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.DEPARTMENT_UPDATE.FAILURE,
    error
  })
}

const remove = {
  request : (payload: FieldTypeRemoveItem): ReducerActionType<FieldTypeRemoveItem> => ({
    type: ACTION.DEPARTMENT_REMOVE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeDepartmentRemove): ReducerActionType<unknown, ResponseTypeDepartmentRemove> => ({
    type: ACTION.DEPARTMENT_REMOVE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.DEPARTMENT_REMOVE.FAILURE,
    error
  })
}

export const departmentAction = { list, create, update, remove }
