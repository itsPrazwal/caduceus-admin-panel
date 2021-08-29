import {
  FieldTypeChangePassword,
  FieldTypeForgotPassword,
  FieldTypeLogin, FieldTypeResetPassword, FieldTypeVerifyUser,
} from './AuthTypes'
import { AxiosResponse } from 'axios'
import sendRequest from '../../Utils/httpRequest/sendRequest'

const paths = {
  login: '/user/login',
  forgotPassword: '/user/forgot-password',
  resetPassword: '/user/reset-password',
  changePassword: '/user/change-password',
  verifyUser: '/user/verify'
}

const apiAuthSignIn = ({ email, password }: FieldTypeLogin): Promise<AxiosResponse> => {
  return sendRequest('POST', paths.login, false, { emailId: email, password } )
}

const apiAuthForgotPassword = ({ email }: FieldTypeForgotPassword): Promise<AxiosResponse> => {
  return sendRequest('POST', paths.forgotPassword, false, { emailId: email } )
}

const apiAuthVerifyUser = ({ token }: FieldTypeVerifyUser): Promise<AxiosResponse> => {
  return sendRequest('GET', `${paths.verifyUser}/${token}`, false )
}

const apiAuthResetPassword = ({ email, password, otp }: FieldTypeResetPassword): Promise<AxiosResponse> => {
  return sendRequest('PUT', paths.resetPassword, false, { emailId: email, password, otp } )
}

const apiAuthChangePassword = ({ prevPassword, newPassword }: FieldTypeChangePassword): Promise<AxiosResponse> => {
  return sendRequest('PUT', paths.changePassword, true, { prevPassword, newPassword } )
}

export { apiAuthSignIn, apiAuthForgotPassword, apiAuthChangePassword, apiAuthResetPassword, apiAuthVerifyUser }
