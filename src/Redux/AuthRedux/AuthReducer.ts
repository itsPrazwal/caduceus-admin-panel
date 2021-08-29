import { Reducer } from 'redux'
import {
  AuthReducerState,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  LOGIN,
  LOG_OUT,
  RESET_PASSWORD,
} from './AuthTypes'
import { ErrorObject, ReducerActionType } from '../../Utils/types'
import { OperationStatus } from '../../Utils/enums'

const initialOperationStatus = {
  email: null,
  login: null,
  newPassword: null,
  resetPassword: null,
  changePassword: null,
  logout: null,
}

const initialState: AuthReducerState = {
  error: null,
  operationStatus: initialOperationStatus,
  userInformation: null
}

export const AuthReducer: Reducer<AuthReducerState,
    ReducerActionType>
    = (state = initialState, action): AuthReducerState => {
      switch (action.type) {
      case LOGIN.REQUEST:
        return { ...state, error:null ,operationStatus: { ...initialOperationStatus, login: OperationStatus.IN_PROGRESS, logout: null } }
      case LOGIN.SUCCESS:
        return {
          ...state,
          operationStatus: { ...state.operationStatus, login: OperationStatus.SUCCEEDED },
          error: null
        }
      case LOGIN.FAILURE:
        return {
          ...state,
          operationStatus: { ...state.operationStatus, login: OperationStatus.FAILED },
          error: action.payload as ErrorObject }
      case CHANGE_PASSWORD.REQUEST:
        return { ...state, operationStatus: { ...initialOperationStatus, changePassword: OperationStatus.IN_PROGRESS } }
      case CHANGE_PASSWORD.SUCCESS:
        return { ...state, error: null, operationStatus: { ...state.operationStatus, changePassword: OperationStatus.SUCCEEDED } }
      case CHANGE_PASSWORD.FAILURE:
        return { ...state, error: action.payload as ErrorObject, operationStatus: { ...state.operationStatus, changePassword: OperationStatus.FAILED } }
      case FORGOT_PASSWORD.REQUEST:
        return { ...state, operationStatus: { ...initialOperationStatus, email: OperationStatus.IN_PROGRESS } }
      case FORGOT_PASSWORD.SUCCESS:
        return { ...state, error: null, operationStatus: { ...state.operationStatus, email: OperationStatus.SUCCEEDED } }
      case FORGOT_PASSWORD.FAILURE:
        return { ...state, error: action.payload as ErrorObject, operationStatus: { ...state.operationStatus, email: OperationStatus.FAILED } }
      case RESET_PASSWORD.REQUEST:
        return { ...state, operationStatus: { ...initialOperationStatus, resetPassword: OperationStatus.IN_PROGRESS } }
      case RESET_PASSWORD.SUCCESS:
        return { ...state, error: null, operationStatus: { ...state.operationStatus, resetPassword: OperationStatus.SUCCEEDED } }
      case RESET_PASSWORD.FAILURE:
        return { ...state, error: action.payload as ErrorObject, operationStatus: { ...state.operationStatus, resetPassword: OperationStatus.FAILED } }
      case LOG_OUT.REQUEST:
        return { ...state, operationStatus: { ...initialOperationStatus, logout: OperationStatus.IN_PROGRESS, login: null } }
      case LOG_OUT.SUCCESS:
        return { ...initialState, operationStatus: { ...initialState.operationStatus, logout: OperationStatus.SUCCEEDED } }
      case LOG_OUT.FAILURE:
        return { ...state, operationStatus: { ...state.operationStatus, logout: OperationStatus.FAILED }, error: action.payload as ErrorObject }
      default:
        return { ...state }
      }
    }
