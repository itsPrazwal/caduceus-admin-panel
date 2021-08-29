import { ErrorObject, Nullable } from '../../Utils/types'
import { OperationStatus } from '../../Utils/enums'

interface AuthReducerState{
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

interface FieldTypeLogin {
    email: string,
    password: string,
}

interface FieldTypeForgotPassword {
    email: string,
}

interface FieldTypeVerifyUser {
    token: string,
}

interface FieldTypeResetPassword {
    email: string,
    otp: string,
    password: string,
}

interface FieldTypeChangePassword {
    prevPassword: string,
    newPassword: string,
}

interface FieldTypeSelfInfoMain {
    email: string,
    id: string
    name: string
    organization: {
        name: string
    },
}

interface ResponseTypeLoginData {
    emailId: string
    fullName: string
    id: string
    token: string
}

const CHANGE_PASSWORD = {
  REQUEST: 'CHANGE_PASSWORD_REQUEST',
  SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  FAILURE: 'CHANGE_PASSWORD_FAILURE',
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

export type { AuthReducerState, FieldTypeSelfInfoMain, ResponseTypeLoginData, FieldTypeLogin, FieldTypeResetPassword, FieldTypeForgotPassword, FieldTypeChangePassword, FieldTypeVerifyUser }
export { CHANGE_PASSWORD, FORGOT_PASSWORD, RESET_PASSWORD, LOGIN, LOG_OUT }
