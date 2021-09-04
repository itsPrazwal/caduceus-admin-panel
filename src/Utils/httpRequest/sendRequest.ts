import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { tokenAssembler } from '../utilFunctions'

const getRootUrl = ():string => {
  const port = process.env.REACT_APP_API_PORT || 8000
  const dev = process.env.REACT_APP_NODE_ENV !== 'production'
  return dev ? `http://localhost:${port}/api` : 'http://localhost:8000'
}

const sendRequest = async (
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'GET',
  path: string,
  secured = true,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  body?: any,
): Promise<AxiosResponse> => {

  const getApi:AxiosInstance = axios.create({
    baseURL: getRootUrl(),
    headers: secured
      ?
      {
        post: { 'Content-Type': 'application/json' },
        'x-access-token': tokenAssembler(),
      }
      :
      {
        post: { 'Content-Type': 'application/json' },
      },
  })

  return getApi.request({
    method: method,
    url: path,
    ...((method === 'POST' || method === 'PUT') && { data: body, }),
    timeout: 5000,
  })
}

export default sendRequest
