import {
  ACTION,
  FieldTypeDepartmentCreate,
  FieldTypeDepartmentMain,
  FieldTypeDepartmentUpdate,
  ReducerDepartmentType,
  ResponseTypeDepartmentCreate, ResponseTypeDepartmentList,
  ResponseTypeDepartmentRemove, ResponseTypeDepartmentUpdate,
} from './Types'
import { Reducer } from 'redux'
import { ErrorObject, FieldTypeRemoveItem, ReducerActionType } from '../../Utils/types'
import { OperationStatus } from '../../Utils/enums'

const initialOperationStatus = {
  list: null,
  remove: null,
  create: null,
  update: null,
}

const initialErrorMessageState = {
  error: null,
  message: ''
}

const initialReducerStateDepartment: ReducerDepartmentType = {
  ...initialErrorMessageState,
  departmentData: null,
  operationStatus: initialOperationStatus ,
  departmentLastFetchedTime: 0
}

export const DepartmentReducer:Reducer<ReducerDepartmentType, ReducerActionType<FieldTypeDepartmentCreate | FieldTypeDepartmentUpdate | FieldTypeRemoveItem,
    ResponseTypeDepartmentCreate | ResponseTypeDepartmentList | ResponseTypeDepartmentUpdate | ResponseTypeDepartmentRemove>> = (state = initialReducerStateDepartment, action): ReducerDepartmentType => {
      switch (action.type) {
      // LIST DEPARTMENT
      case ACTION.DEPARTMENT_LIST.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, list: OperationStatus.IN_PROGRESS } })
      case ACTION.DEPARTMENT_LIST.SUCCESS: {
        return {
          ...state,
          error: null,
          departmentData: (action?.response as ResponseTypeDepartmentList).data.data,
          message: (action?.response as ResponseTypeDepartmentList).data.message,
          operationStatus: { ...state.operationStatus, list: OperationStatus.SUCCEEDED },
          departmentLastFetchedTime: Date.now()
        }
      }
      case ACTION.DEPARTMENT_LIST.FAILURE: return ({ ...state, error: action.error as ErrorObject, operationStatus: { ...state.operationStatus, list: OperationStatus.FAILED } })

        // CREATE DEPARTMENT
      case ACTION.DEPARTMENT_CREATE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, create: OperationStatus.IN_PROGRESS } })
      case ACTION.DEPARTMENT_CREATE.SUCCESS: {
        const newDepartment = (action?.response as ResponseTypeDepartmentCreate).data.data
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeDepartmentCreate)?.data?.message,
          departmentData: newDepartment ? [...state.departmentData as FieldTypeDepartmentMain[], newDepartment] : [...state.departmentData as FieldTypeDepartmentMain[]],
          operationStatus: { ...initialOperationStatus, create: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.DEPARTMENT_CREATE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, create: OperationStatus.FAILED } })

        // UPDATE DEPARTMENT
      case ACTION.DEPARTMENT_UPDATE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, update: OperationStatus.IN_PROGRESS } })
      case ACTION.DEPARTMENT_UPDATE.SUCCESS: {
        const updatedDepartment: FieldTypeDepartmentMain = (action?.response as ResponseTypeDepartmentUpdate)?.data?.data
        const orgIndex: number = state.departmentData?.findIndex(od => od?._id === updatedDepartment?._id) as number
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeDepartmentUpdate)?.data?.message,
          departmentData: state.departmentData?.map((od, i) => i === orgIndex ? updatedDepartment : od) as FieldTypeDepartmentMain[],
          operationStatus: { ...initialOperationStatus, update: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.DEPARTMENT_UPDATE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, update: OperationStatus.FAILED } })

        // DELETE DEPARTMENT
      case ACTION.DEPARTMENT_REMOVE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, remove: OperationStatus.IN_PROGRESS } })
      case ACTION.DEPARTMENT_REMOVE.SUCCESS: {
        const departmentId: string = (action?.response as ResponseTypeDepartmentRemove)?.data?.data._id
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeDepartmentRemove)?.data?.message,
          departmentData: state.departmentData?.filter(od => od._id !== departmentId) as FieldTypeDepartmentMain[],
          operationStatus: { ...initialOperationStatus, remove: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.DEPARTMENT_REMOVE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, remove: OperationStatus.FAILED } })
      default:
        return state
      }
    }
