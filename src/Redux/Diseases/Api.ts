import * as Types from './Types'
import sendRequest from '../../Utils/httpRequest/sendRequest'
import { FieldTypeRemoveItem } from '../../Utils/types'
import {
  ResponseTypeDiseaseCreate,
  ResponseTypeDiseaseDelete,
  ResponseTypeDiseaseList,
  ResponseTypeDiseaseUpdate
} from './Types'

const path = '/disease'

const list = async (): Promise<ResponseTypeDiseaseList> =>
  sendRequest('GET', path, true)

const create = async (payload: Types.FieldTypeDiseaseCreate): Promise<ResponseTypeDiseaseCreate> =>
  sendRequest('POST', path, true, payload)

const update = async (payload: Types.FieldTypeDiseaseUpdate): Promise<ResponseTypeDiseaseUpdate> =>
  sendRequest('PUT', `${path}/${payload._id}`, true, payload)

const remove = async (payload: FieldTypeRemoveItem): Promise<ResponseTypeDiseaseDelete> =>
  sendRequest('DELETE', `${path}/${payload._id}`, true)

export default { list, create, remove, update }
