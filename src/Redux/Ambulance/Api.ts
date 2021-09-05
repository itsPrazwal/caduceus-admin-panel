import * as Types from './Types'
import sendRequest from '../../Utils/httpRequest/sendRequest'
import { FieldTypeRemoveItem } from '../../Utils/types'
import {
  ResponseTypeAmbulanceCreate,
  ResponseTypeAmbulanceList,
  ResponseTypeAmbulanceRemove,
  ResponseTypeAmbulanceUpdate
} from './Types'

const path = '/ambulance'

const list = async (): Promise<ResponseTypeAmbulanceList> =>
  sendRequest('GET', path, true)

const create = async (payload: Types.FieldTypeAmbulanceCreate): Promise<ResponseTypeAmbulanceCreate> =>
  sendRequest('POST', path, true, payload)

const update = async (payload: Types.FieldTypeAmbulanceUpdate): Promise<ResponseTypeAmbulanceUpdate> =>
  sendRequest('PUT', `${path}/${payload._id}`, true, payload)

const remove = async (payload: FieldTypeRemoveItem): Promise<ResponseTypeAmbulanceRemove> =>
  sendRequest('DELETE', `${path}/${payload._id}`, true)

export default { list, create, remove, update }
