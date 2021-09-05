import { StrictEffect, all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { NotifierTitle, NotifierTitleType } from '../../Utils/enums'
import { generateErrorMessage } from '../../Utils/utilFunctions'
import { notifier } from '../../Utils/Notifiers/Notifier'
import {
  ACTION,
  ResponseTypeDiseaseCreate,
  ResponseTypeDiseaseList,
  ResponseTypeDiseaseRemove,
  ResponseTypeDiseaseUpdate
} from './Types'
import { diseaseAction } from './Action'
import diseaseApis from './Api'
import { ErrorObject } from '../../Utils/types'
import { AxiosError } from 'axios'

//DISEASE LIST SAGA
function* handleDiseaseListRequest() {
  try {
    const res: ResponseTypeDiseaseList = yield call(() => diseaseApis.list())
    if (!res.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    yield put(diseaseAction.list.success(res))
  } catch (err) {
    yield put(diseaseAction.list.failure(generateErrorMessage(NotifierTitle.DISEASE, (err as AxiosError)?.message || '', NotifierTitleType.LIST) ))
    notifier.error({ title: NotifierTitle.DISEASE, description: (err as AxiosError)?.message, type: NotifierTitleType.LIST  })
  }
}

function* watchDiseaseList(): Generator {
  yield takeEvery(ACTION.DISEASE_LIST.REQUEST, handleDiseaseListRequest)
}

//DISEASE ADD SAGA
function* handleDiseaseCreateRequest(payload) {
  try {
    const res: ResponseTypeDiseaseCreate = yield call(() => diseaseApis.create(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.DISEASE, type: NotifierTitleType.CREATE })
    yield put(diseaseAction.create.success(res))
  } catch (err) {
    yield put(diseaseAction.create.failure(generateErrorMessage(NotifierTitle.DISEASE, (err as AxiosError)?.message || '', NotifierTitleType.CREATE)))
    notifier.error({ title: NotifierTitle.DISEASE, description: (err as AxiosError)?.message, type: NotifierTitleType.CREATE })
  }
}

function* watchDiseaseCreate(): Generator {
  yield takeEvery(ACTION.DISEASE_CREATE.REQUEST, handleDiseaseCreateRequest)
}

//DISEASE UPDATE SAGA
function* handleDiseaseUpdateRequest(payload) {
  try {
    const res: ResponseTypeDiseaseUpdate = yield call(() => diseaseApis.update(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.DISEASE, type: NotifierTitleType.UPDATE })
    yield put(diseaseAction.update.success(res))
  } catch (err) {
    yield put(diseaseAction.update.failure(generateErrorMessage(NotifierTitle.DISEASE, (err as AxiosError)?.message || '', NotifierTitleType.UPDATE)))
    notifier.error({ title: NotifierTitle.DISEASE, description: (err as AxiosError)?.message, type: NotifierTitleType.UPDATE })
  }
}

function* watchDiseaseUpdate(): Generator {
  yield takeEvery(ACTION.DISEASE_UPDATE.REQUEST, handleDiseaseUpdateRequest)
}

//DISEASE REMOVE SAGA
function* handleDiseaseDeleteRequest(payload) {
  try {
    const res: ResponseTypeDiseaseRemove = yield call(() => diseaseApis.remove(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.DISEASE, type: NotifierTitleType.REMOVE })
    yield put(diseaseAction.remove.success(res))
  } catch (err) {
    yield put(diseaseAction.remove.failure(generateErrorMessage(NotifierTitle.DISEASE, (err as AxiosError)?.message || '', NotifierTitleType.REMOVE)))
    notifier.error({ title: NotifierTitle.DISEASE, description: (err as AxiosError)?.message, type: NotifierTitleType.REMOVE })
  }
}

function* watchDiseaseDelete(): Generator {
  yield takeEvery(ACTION.DISEASE_REMOVE.REQUEST, handleDiseaseDeleteRequest)
}


export default function* rootSaga(): Generator<StrictEffect, void> {
  yield all([
    fork(watchDiseaseList),
    fork(watchDiseaseCreate),
    fork(watchDiseaseUpdate),
    fork(watchDiseaseDelete)
  ]) }
