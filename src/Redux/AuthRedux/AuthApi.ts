import {
  ErrorObject,
  LoginFieldType,
} from '../../Utils/types'
import { AxiosResponse } from 'axios'
import sendRequest from '../../Utils/httpRequest/sendRequest'

const signInApi = ({ email, password }: LoginFieldType): Promise<AxiosResponse | { error: ErrorObject }> => {
  return sendRequest('/login', false, { data: { email, password } })
}

export { signInApi }
