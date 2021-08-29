import { LocalStorageKeys, NotifierTitle } from './enums'
import { error_messages } from './en'
import { ErrorObject, FunctionWithParam, Nullable } from './types'
import moment, { Moment } from 'moment'
import { validateLogin } from './checkLogin'

export const generateErrorMessage = (title: NotifierTitle, description?: string): ErrorObject => ({
  message: error_messages.default.message.replace('~~~', title),
  description: description || error_messages.default.description.replace('~~~', title)
})

export const disableDate =
    (current: Moment): boolean =>
      current && current < moment().subtract(1, 'days').endOf('day')

export const getRange = (start: number, end: number): number[] => {
  const result:number[] = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}

export const tokenAssembler = ():Nullable<string> => {
  return validateLogin()
    ? `${localStorage.getItem(LocalStorageKeys.TOKEN_1)}.${localStorage.getItem(LocalStorageKeys.TOKEN_2)}.${localStorage.getItem(LocalStorageKeys.TOKEN_3)}`
    : null
}

export const setLocalStorageAfterLogin:FunctionWithParam<{ id: string, token: string }> = ({ token, id }) => {
  const splitArray = token.split('.')
  localStorage.setItem(LocalStorageKeys.TOKEN_1, splitArray[0])
  localStorage.setItem(LocalStorageKeys.TOKEN_2, splitArray[1])
  localStorage.setItem(LocalStorageKeys.TOKEN_3, splitArray[2])
  localStorage.setItem(LocalStorageKeys.USER_ID, id)
  localStorage.setItem(LocalStorageKeys.EXPIRY, Date.now().toString())
}
