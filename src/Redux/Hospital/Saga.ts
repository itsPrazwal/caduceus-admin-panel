import { StrictEffect, all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { NotifierTitle, NotifierTitleType } from '../../Utils/enums'
import { generateErrorMessage } from '../../Utils/utilFunctions'
import { notifier } from '../../Utils/Notifiers/Notifier'
import {
  ACTION,
  ResponseTypeHospitalCreate,
  ResponseTypeHospitalList,
  ResponseTypeHospitalRemove,
  ResponseTypeHospitalUpdate
} from './Types'
import {  hospitalAction } from './Action'
import hospitalApi from './Api'
import { ErrorObject } from '../../Utils/types'
import { AxiosError } from 'axios'

//HOSPITAL LIST SAGA
function* handleHospitalListRequest() {
  try {
    const res: ResponseTypeHospitalList = yield call(() => hospitalApi.list())
    if (!res.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    yield put( hospitalAction.list.success(res))
  } catch (err) {
    yield put( hospitalAction.list.failure(generateErrorMessage(NotifierTitle.HOSPITAL, (err as AxiosError)?.message || '', NotifierTitleType.LIST) ))
    notifier.error({ title: NotifierTitle.HOSPITAL, description: (err as AxiosError)?.message, type: NotifierTitleType.LIST  })
  }
}

function* watchHospitalList(): Generator {
  yield takeEvery(ACTION.HOSPITAL_LIST.REQUEST, handleHospitalListRequest)
}

//HOSPITAL ADD SAGA
function* handleHospitalCreateRequest(payload) {
  try {
    const res: ResponseTypeHospitalCreate = yield call(() => hospitalApi.create(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.HOSPITAL, type: NotifierTitleType.CREATE })
    yield put( hospitalAction.create.success(res))
  } catch (err) {
    yield put( hospitalAction.create.failure(generateErrorMessage(NotifierTitle.HOSPITAL, (err as AxiosError)?.message || '', NotifierTitleType.CREATE)))
    notifier.error({ title: NotifierTitle.HOSPITAL, description: (err as AxiosError)?.message, type: NotifierTitleType.CREATE })
  }
}

function* watchHospitalCreate(): Generator {
  yield takeEvery(ACTION.HOSPITAL_CREATE.REQUEST, handleHospitalCreateRequest)
}

//HOSPITAL UPDATE SAGA
function* handleHospitalUpdateRequest(payload) {
  try {
    const res: ResponseTypeHospitalUpdate = yield call(() => hospitalApi.update(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.HOSPITAL, type: NotifierTitleType.UPDATE })
    yield put( hospitalAction.update.success(res))
  } catch (err) {
    yield put( hospitalAction.update.failure(generateErrorMessage(NotifierTitle.HOSPITAL, (err as AxiosError)?.message || '', NotifierTitleType.UPDATE)))
    notifier.error({ title: NotifierTitle.HOSPITAL, description: (err as AxiosError)?.message, type: NotifierTitleType.UPDATE })
  }
}

function* watchHospitalUpdate(): Generator {
  yield takeEvery(ACTION.HOSPITAL_UPDATE.REQUEST, handleHospitalUpdateRequest)
}

//HOSPITAL DELETE SAGA
function* handleHospitalDeleteRequest(payload) {
  try {
    const res: ResponseTypeHospitalRemove = yield call(() => hospitalApi.remove(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.HOSPITAL, type: NotifierTitleType.REMOVE })
    yield put( hospitalAction.remove.success(res))
  } catch (err) {
    yield put( hospitalAction.remove.failure(generateErrorMessage(NotifierTitle.HOSPITAL, (err as AxiosError)?.message || '', NotifierTitleType.REMOVE)))
    notifier.error({ title: NotifierTitle.HOSPITAL, description: (err as AxiosError)?.message, type: NotifierTitleType.REMOVE })
  }
}

function* watchHospitalDelete(): Generator {
  yield takeEvery(ACTION.HOSPITAL_REMOVE.REQUEST, handleHospitalDeleteRequest)
}


export default function* rootSaga(): Generator<StrictEffect, void> {
  yield all([
    fork(watchHospitalList),
    fork(watchHospitalCreate),
    fork(watchHospitalUpdate),
    fork(watchHospitalDelete)
  ]) }
