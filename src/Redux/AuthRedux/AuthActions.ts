import {
  ErrorObject,
  ReducerActionType
} from '../../Utils/types'
import {
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  FieldTypeChangePassword,
  FieldTypeForgotPassword,
  FieldTypeLogin,
  FieldTypeResetPassword,
  LOGIN,
  LOG_OUT,
  RESET_PASSWORD,
} from './AuthTypes'
import { AxiosResponse } from 'axios'

//LOGIN ACTIONS
const login = {
  request: (params: FieldTypeLogin): ReducerActionType => ({
    type: LOGIN.REQUEST,
    payload: params
  }),
  success: (response: AxiosResponse): ReducerActionType => ({
    type: LOGIN.SUCCESS,
    payload: response
  }),
  failure: (error: ErrorObject): ReducerActionType => ({
    type: LOGIN.FAILURE,
    payload: error
  }),
}

//CHANGE PASSWORD ACTIONS
const changePassword = {
  request : (params: FieldTypeChangePassword): ReducerActionType => ({
    type: CHANGE_PASSWORD.REQUEST,
    payload: params
  }),
  success : (response: AxiosResponse): ReducerActionType => ({
    type: CHANGE_PASSWORD.SUCCESS,
    payload: response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: CHANGE_PASSWORD.FAILURE,
    payload: error
  })
}

//FORGOT PASSWORD ACTIONS
const forgotPassword = {
  request: (params: FieldTypeForgotPassword): ReducerActionType => ({
    type: FORGOT_PASSWORD.REQUEST,
    payload: params
  }),
  success: (response: AxiosResponse): ReducerActionType => ({
    type: FORGOT_PASSWORD.SUCCESS,
    payload: response
  }),
  failure: (error: ErrorObject): ReducerActionType => ({
    type: FORGOT_PASSWORD.FAILURE,
    payload: error
  })
}

//COMPLETE NEW PASSWORD ACTIONS
const resetPassword = {
  request: (params: FieldTypeResetPassword): ReducerActionType => ({
    type: RESET_PASSWORD.REQUEST,
    payload: params
  }),
  success: (response: AxiosResponse): ReducerActionType => ({
    type: RESET_PASSWORD.SUCCESS,
    payload: response
  }),
  failure: (error: ErrorObject): ReducerActionType => ({
    type: RESET_PASSWORD.FAILURE,
    payload: error
  })
}

//LOG OUT ACTIONS
const logOut = {
  request: (): ReducerActionType => ({
    type: LOG_OUT.REQUEST
  }),
  success: (): ReducerActionType => ({
    type: LOG_OUT.SUCCESS,
  }),
  failure: (error: ErrorObject): ReducerActionType => ({
    type: LOG_OUT.FAILURE,
    payload: error
  })
}

export { changePassword, forgotPassword, login, resetPassword, logOut }



