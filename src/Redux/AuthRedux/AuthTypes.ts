import { ErrorObject, GenericObject, Nullable } from '../../Utils/types'
import { OperationStatus } from '../../Utils/enums'

interface AuthReducerState{
    cognitoDetails: GenericObject,
    error: Nullable<ErrorObject>
    operationStatus: {
        login: Nullable<OperationStatus>,
        newPassword: Nullable<OperationStatus>,
        resetPassword: Nullable<OperationStatus>,
        changePassword: Nullable<OperationStatus>,
        email: Nullable<OperationStatus>,
        logout: Nullable<OperationStatus>,
    },
    userInformation: Nullable<FieldTypeSelfInfoMain>
}

interface FieldTypeSelfInfoMain {
    email: string,
    id: string
    name: string
    organization: {
        name: string
    },
}

const CHANGE_PASSWORD = {
  REQUEST: 'CHANGE_PASSWORD_REQUEST',
  SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  FAILURE: 'CHANGE_PASSWORD_FAILURE',
}

const COMPLETE_NEW_PASSWORD = {
  REQUEST: 'COMPLETE_NEW_PASSWORD_REQUEST',
  SUCCESS: 'COMPLETE_NEW_PASSWORD_SUCCESS',
  FAILURE: 'COMPLETE_NEW_PASSWORD_FAILURE',
}

const LOGIN = {
  REQUEST : 'LOGIN_REQUEST',
  SUCCESS : 'LOGIN_SUCCESS',
  FAILURE : 'LOGIN_FAILURE',
}

const FORGOT_PASSWORD = {
  REQUEST : 'FORGOT_PASSWORD_REQUEST',
  SUCCESS : 'FORGOT_PASSWORD_SUCCESS',
  FAILURE : 'FORGOT_PASSWORD_FAILURE',
}

const RESET_PASSWORD = {
  REQUEST : 'RESET_PASSWORD_REQUEST',
  SUCCESS : 'RESET_PASSWORD_SUCCESS',
  FAILURE : 'RESET_PASSWORD_FAILURE',
}

const LOG_OUT = {
  REQUEST : 'LOG_OUT_REQUEST',
  SUCCESS : 'LOG_OUT_SUCCESS',
  FAILURE : 'LOG_OUT_FAILURE',
}

const GET_SELF_INFO = {
  REQUEST : 'GET_SELF_INFO_REQUEST',
  SUCCESS : 'GET_SELF_INFO_SUCCESS',
  FAILURE : 'GET_SELF_INFO_FAILURE',
}

export type { AuthReducerState, FieldTypeSelfInfoMain }
export { CHANGE_PASSWORD, COMPLETE_NEW_PASSWORD, FORGOT_PASSWORD, RESET_PASSWORD, LOGIN, LOG_OUT, GET_SELF_INFO }
