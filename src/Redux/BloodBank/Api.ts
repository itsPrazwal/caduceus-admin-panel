import * as Types from './Types'
import sendRequest from '../../Utils/httpRequest/sendRequest'
import { FieldTypeRemoveItem } from '../../Utils/types'
import {
  ResponseTypeBloodBankCreate,
  ResponseTypeBloodBankList,
  ResponseTypeBloodBankRemove,
  ResponseTypeBloodBankUpdate
} from './Types'

const path = '/bloodBank'

const list = async (): Promise<ResponseTypeBloodBankList> =>
  sendRequest('GET', path, true)

const create = async (payload: Types.FieldTypeBloodBankCreate): Promise<ResponseTypeBloodBankCreate> =>
  sendRequest('POST', path, true, payload)

const update = async (payload: Types.FieldTypeBloodBankUpdate): Promise<ResponseTypeBloodBankUpdate> =>
  sendRequest('PUT', `${path}/${payload._id}`, true, payload)

const remove = async (payload: FieldTypeRemoveItem): Promise<ResponseTypeBloodBankRemove> =>
  sendRequest('DELETE', `${path}/${payload._id}`, true)

export default { list, create, remove, update }
