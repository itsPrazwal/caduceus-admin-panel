import { StrictEffect, all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { NotifierTitle, NotifierTitleType } from '../../Utils/enums'
import { generateErrorMessage } from '../../Utils/utilFunctions'
import { notifier } from '../../Utils/Notifiers/Notifier'
import {
  ACTION,
  ResponseTypeAmbulanceCreate,
  ResponseTypeAmbulanceList,
  ResponseTypeAmbulanceRemove,
  ResponseTypeAmbulanceUpdate
} from './Types'
import {  ambulanceAction } from './Action'
import bloodBankApi from './Api'
import { ErrorObject } from '../../Utils/types'
import { AxiosError } from 'axios'

//AMBULANCE LIST SAGA
function* handleAmbulanceListRequest() {
  try {
    const res: ResponseTypeAmbulanceList = yield call(() => bloodBankApi.list())
    if (!res.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    yield put( ambulanceAction.list.success(res))
  } catch (err) {
    yield put( ambulanceAction.list.failure(generateErrorMessage(NotifierTitle.AMBULANCE, (err as AxiosError)?.message || '', NotifierTitleType.LIST) ))
    notifier.error({ title: NotifierTitle.AMBULANCE, description: (err as AxiosError)?.message, type: NotifierTitleType.LIST  })
  }
}

function* watchAmbulanceList(): Generator {
  yield takeEvery(ACTION.AMBULANCE_LIST.REQUEST, handleAmbulanceListRequest)
}

//AMBULANCE ADD SAGA
function* handleAmbulanceCreateRequest(payload) {
  try {
    const res: ResponseTypeAmbulanceCreate = yield call(() => bloodBankApi.create(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.AMBULANCE, type: NotifierTitleType.CREATE })
    yield put( ambulanceAction.create.success(res))
  } catch (err) {
    yield put( ambulanceAction.create.failure(generateErrorMessage(NotifierTitle.AMBULANCE, (err as AxiosError)?.message || '', NotifierTitleType.CREATE)))
    notifier.error({ title: NotifierTitle.AMBULANCE, description: (err as AxiosError)?.message, type: NotifierTitleType.CREATE })
  }
}

function* watchAmbulanceCreate(): Generator {
  yield takeEvery(ACTION.AMBULANCE_CREATE.REQUEST, handleAmbulanceCreateRequest)
}

//AMBULANCE UPDATE SAGA
function* handleAmbulanceUpdateRequest(payload) {
  try {
    const res: ResponseTypeAmbulanceUpdate = yield call(() => bloodBankApi.update(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.AMBULANCE, type: NotifierTitleType.UPDATE })
    yield put( ambulanceAction.update.success(res))
  } catch (err) {
    yield put( ambulanceAction.update.failure(generateErrorMessage(NotifierTitle.AMBULANCE, (err as AxiosError)?.message || '', NotifierTitleType.UPDATE)))
    notifier.error({ title: NotifierTitle.AMBULANCE, description: (err as AxiosError)?.message, type: NotifierTitleType.UPDATE })
  }
}

function* watchAmbulanceUpdate(): Generator {
  yield takeEvery(ACTION.AMBULANCE_UPDATE.REQUEST, handleAmbulanceUpdateRequest)
}

//AMBULANCE DELETE SAGA
function* handleAmbulanceDeleteRequest(payload) {
  try {
    const res: ResponseTypeAmbulanceRemove = yield call(() => bloodBankApi.remove(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.AMBULANCE, type: NotifierTitleType.REMOVE })
    yield put( ambulanceAction.remove.success(res))
  } catch (err) {
    yield put( ambulanceAction.remove.failure(generateErrorMessage(NotifierTitle.AMBULANCE, (err as AxiosError)?.message || '', NotifierTitleType.REMOVE)))
    notifier.error({ title: NotifierTitle.AMBULANCE, description: (err as AxiosError)?.message, type: NotifierTitleType.REMOVE })
  }
}

function* watchAmbulanceDelete(): Generator {
  yield takeEvery(ACTION.AMBULANCE_REMOVE.REQUEST, handleAmbulanceDeleteRequest)
}


export default function* rootSaga(): Generator<StrictEffect, void> {
  yield all([
    fork(watchAmbulanceList),
    fork(watchAmbulanceCreate),
    fork(watchAmbulanceUpdate),
    fork(watchAmbulanceDelete)
  ]) }
