import {
  ChangePasswordFieldType,
  CompleteNewPasswordFieldType,
  ErrorObject, ForgotPasswordFieldType,
  LoginFieldType,
  ReducerActionType, ResetPasswordFieldType
} from '../../Utils/types'
import {
  CHANGE_PASSWORD,
  COMPLETE_NEW_PASSWORD,
  FORGOT_PASSWORD,
  LOGIN,
  LOG_OUT, RESET_PASSWORD,
} from './AuthTypes'
import { AxiosResponse } from 'axios'

//LOGIN ACTIONS
const login = {
  request: (params: LoginFieldType): ReducerActionType => ({
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
  request : (params: ChangePasswordFieldType): ReducerActionType => ({
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

//COMPLETE NEW PASSWORD ACTIONS
const completeNewPassword = {
  request: (params: CompleteNewPasswordFieldType): ReducerActionType => ({
    type: COMPLETE_NEW_PASSWORD.REQUEST,
    payload: params
  }),
  success: (response: AxiosResponse): ReducerActionType => ({
    type: COMPLETE_NEW_PASSWORD.SUCCESS,
    payload: response
  }),
  failure: (error: ErrorObject): ReducerActionType => ({
    type: COMPLETE_NEW_PASSWORD.FAILURE,
    payload: error
  })
}

//FORGOT PASSWORD ACTIONS
const forgotPassword = {
  request: (params: ForgotPasswordFieldType): ReducerActionType => ({
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
  request: (params: ResetPasswordFieldType): ReducerActionType => ({
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
  success: (response: AxiosResponse): ReducerActionType => ({
    type: LOG_OUT.SUCCESS,
    payload: response
  }),
  failure: (error: ErrorObject): ReducerActionType => ({
    type: LOG_OUT.FAILURE,
    payload: error
  })
}

export { changePassword, completeNewPassword, forgotPassword, login, resetPassword, logOut }



