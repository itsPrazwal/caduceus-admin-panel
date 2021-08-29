import axios, { AxiosRequestConfig } from 'axios'

import { ErrorObject, GenericObject, Nullable } from '../types'
import { error_messages } from '../en'
import { validateLogin } from '../checkLogin'
import { LocalStorageKeys } from '../enums'

const getRootUrl = ():string => {
  const port = process.env.REACT_APP_API_PORT || 8000
  const dev = process.env.REACT_APP_NODE_ENV !== 'production'
  return dev ? `http://localhost:${port}/api` : 'http://localhost:8000'
}

const tokenAssembler = ():Nullable<string> => {
  return validateLogin()
    ? `${localStorage.getItem(LocalStorageKeys.TOKEN_1)}.${localStorage.getItem(LocalStorageKeys.TOKEN_2)}.${localStorage.getItem(LocalStorageKeys.TOKEN_3)}`
    : null
}

let api

const getApi = (secured: boolean) => {
  if (!api) {
    api = axios.create({
      baseURL: getRootUrl(),
      headers: secured
        ?{
          post: { 'Content-Type': 'application/json' },
          'x-access-token': tokenAssembler(),
        }
        :{
          post: { 'Content-Type': 'application/json' },
        },
    })
  }
  return api
}

const sendRequest = async <T = GenericObject>(
  path: string,
  secured = true,
  opts: AxiosRequestConfig = { method: 'POST', headers: {} },
): Promise<T | { error: ErrorObject }> => {
  try {
    const response = await getApi(secured).request({
      method: opts.method,
      url: path,
      headers: opts.headers,
      timeout: 5000,
      ...opts,
    })
    const { data } = response
    if (data?.error) {
      return { error: data.error }
    }
    return data
  } catch (error) {
    return { error: error_messages.generic }
  }
}

export default sendRequest
