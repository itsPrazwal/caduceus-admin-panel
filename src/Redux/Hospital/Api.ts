import * as Types from './Types'
import sendRequest from '../../Utils/httpRequest/sendRequest'
import { FieldTypeRemoveItem } from '../../Utils/types'
import {
  ResponseTypeHospitalCreate,
  ResponseTypeHospitalList,
  ResponseTypeHospitalRemove,
  ResponseTypeHospitalUpdate
} from './Types'

const path = '/hospital'

const list = async (): Promise<ResponseTypeHospitalList> =>
  sendRequest('GET', path, true)

const create = async (payload: Types.FieldTypeHospitalCreate): Promise<ResponseTypeHospitalCreate> =>
  sendRequest('POST', path, true, payload)

const update = async (payload: Types.FieldTypeHospitalUpdate): Promise<ResponseTypeHospitalUpdate> =>
  sendRequest('PUT', `${path}/${payload._id}`, true, payload)

const remove = async (payload: FieldTypeRemoveItem): Promise<ResponseTypeHospitalRemove> =>
  sendRequest('DELETE', `${path}/${payload._id}`, true)

export default { list, create, remove, update }
