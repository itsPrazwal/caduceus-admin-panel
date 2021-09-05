import { StrictEffect, all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { NotifierTitle, NotifierTitleType } from '../../Utils/enums'
import { generateErrorMessage } from '../../Utils/utilFunctions'
import { notifier } from '../../Utils/Notifiers/Notifier'
import {
  ACTION,
  ResponseTypeEventCreate,
  ResponseTypeEventList,
  ResponseTypeEventRemove,
  ResponseTypeEventUpdate
} from './Types'
import { eventAction } from './Action'
import eventApis from './Api'
import { ErrorObject } from '../../Utils/types'
import { AxiosError } from 'axios'

//EVENT LIST SAGA
function* handleEventListRequest() {
  try {
    const res: ResponseTypeEventList = yield call(() => eventApis.list())
    if (!res.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    yield put( eventAction.list.success(res))
  } catch (err) {
    yield put( eventAction.list.failure(generateErrorMessage(NotifierTitle.EVENT, (err as AxiosError)?.message || '', NotifierTitleType.LIST) ))
    notifier.error({ title: NotifierTitle.EVENT, description: (err as AxiosError)?.message, type: NotifierTitleType.LIST  })
  }
}

function* watchEventList(): Generator {
  yield takeEvery(ACTION.EVENT_LIST.REQUEST, handleEventListRequest)
}

//EVENT ADD SAGA
function* handleEventCreateRequest(payload) {
  try {
    const res: ResponseTypeEventCreate = yield call(() => eventApis.create(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.EVENT, type: NotifierTitleType.CREATE })
    yield put( eventAction.create.success(res))
  } catch (err) {
    yield put( eventAction.create.failure(generateErrorMessage(NotifierTitle.EVENT, (err as AxiosError)?.message || '', NotifierTitleType.CREATE)))
    notifier.error({ title: NotifierTitle.EVENT, description: (err as AxiosError)?.message, type: NotifierTitleType.CREATE })
  }
}

function* watchEventCreate(): Generator {
  yield takeEvery(ACTION.EVENT_CREATE.REQUEST, handleEventCreateRequest)
}

//EVENT UPDATE SAGA
function* handleEventUpdateRequest(payload) {
  try {
    const res: ResponseTypeEventUpdate = yield call(() => eventApis.update(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.EVENT, type: NotifierTitleType.UPDATE })
    yield put( eventAction.update.success(res))
  } catch (err) {
    yield put( eventAction.update.failure(generateErrorMessage(NotifierTitle.EVENT, (err as AxiosError)?.message || '', NotifierTitleType.UPDATE)))
    notifier.error({ title: NotifierTitle.EVENT, description: (err as AxiosError)?.message, type: NotifierTitleType.UPDATE })
  }
}

function* watchEventUpdate(): Generator {
  yield takeEvery(ACTION.EVENT_UPDATE.REQUEST, handleEventUpdateRequest)
}

//EVENT DELETE SAGA
function* handleEventDeleteRequest(payload) {
  try {
    const res: ResponseTypeEventRemove = yield call(() => eventApis.remove(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.EVENT, type: NotifierTitleType.REMOVE })
    yield put( eventAction.remove.success(res))
  } catch (err) {
    yield put( eventAction.remove.failure(generateErrorMessage(NotifierTitle.EVENT, (err as AxiosError)?.message || '', NotifierTitleType.REMOVE)))
    notifier.error({ title: NotifierTitle.EVENT, description: (err as AxiosError)?.message, type: NotifierTitleType.REMOVE })
  }
}

function* watchEventDelete(): Generator {
  yield takeEvery(ACTION.EVENT_REMOVE.REQUEST, handleEventDeleteRequest)
}


export default function* rootSaga(): Generator<StrictEffect, void> {
  yield all([
    fork(watchEventList),
    fork(watchEventCreate),
    fork(watchEventUpdate),
    fork(watchEventDelete)
  ]) }
