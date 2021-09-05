import * as Types from './Types'
import sendRequest from '../../Utils/httpRequest/sendRequest'
import { FieldTypeRemoveItem } from '../../Utils/types'
import {
  ResponseTypeEventCreate,
  ResponseTypeEventList,
  ResponseTypeEventRemove,
  ResponseTypeEventUpdate
} from './Types'

const path = '/event'

const list = async (): Promise<ResponseTypeEventList> =>
  sendRequest('GET', path, true)

const create = async (payload: Types.FieldTypeEventCreate): Promise<ResponseTypeEventCreate> =>
  sendRequest('POST', path, true, payload)

const update = async (payload: Types.FieldTypeEventUpdate): Promise<ResponseTypeEventUpdate> =>
  sendRequest('PUT', `${path}/${payload._id}`, true, payload)

const remove = async (payload: FieldTypeRemoveItem): Promise<ResponseTypeEventRemove> =>
  sendRequest('DELETE', `${path}/${payload._id}`, true)

export default { list, create, remove, update }
