import * as Types from './Types'
import sendRequest from '../../Utils/httpRequest/sendRequest'
import { FieldTypeRemoveItem } from '../../Utils/types'
import {
  ResponseTypeDepartmentCreate,
  ResponseTypeDepartmentList,
  ResponseTypeDepartmentRemove,
  ResponseTypeDepartmentUpdate
} from './Types'

const path = '/department'

const list = async (): Promise<ResponseTypeDepartmentList> =>
  sendRequest('GET', path, true)

const create = async (payload: Types.FieldTypeDepartmentCreate): Promise<ResponseTypeDepartmentCreate> =>
  sendRequest('POST', path, true, payload)

const update = async (payload: Types.FieldTypeDepartmentUpdate): Promise<ResponseTypeDepartmentUpdate> =>
  sendRequest('PUT', `${path}/${payload._id}`, true, payload)

const remove = async (payload: FieldTypeRemoveItem): Promise<ResponseTypeDepartmentRemove> =>
  sendRequest('DELETE', `${path}/${payload._id}`, true)

export default { list, create, remove, update }
