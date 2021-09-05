import { StrictEffect, all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { NotifierTitle, NotifierTitleType } from '../../Utils/enums'
import { generateErrorMessage } from '../../Utils/utilFunctions'
import { notifier } from '../../Utils/Notifiers/Notifier'
import {
  ACTION,
  ResponseTypeBloodBankCreate,
  ResponseTypeBloodBankList,
  ResponseTypeBloodBankRemove,
  ResponseTypeBloodBankUpdate
} from './Types'
import {  bloodBankAction } from './Action'
import bloodBankApi from './Api'
import { ErrorObject } from '../../Utils/types'
import { AxiosError } from 'axios'

//BLOOD_BANK LIST SAGA
function* handleBloodBankListRequest() {
  try {
    const res: ResponseTypeBloodBankList = yield call(() => bloodBankApi.list())
    if (!res.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    yield put( bloodBankAction.list.success(res))
  } catch (err) {
    yield put( bloodBankAction.list.failure(generateErrorMessage(NotifierTitle.BLOOD_BANK, (err as AxiosError)?.message || '', NotifierTitleType.LIST) ))
    notifier.error({ title: NotifierTitle.BLOOD_BANK, description: (err as AxiosError)?.message, type: NotifierTitleType.LIST  })
  }
}

function* watchBloodBankList(): Generator {
  yield takeEvery(ACTION.BLOOD_BANK_LIST.REQUEST, handleBloodBankListRequest)
}

//BLOOD_BANK ADD SAGA
function* handleBloodBankCreateRequest(payload) {
  try {
    const res: ResponseTypeBloodBankCreate = yield call(() => bloodBankApi.create(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.BLOOD_BANK, type: NotifierTitleType.CREATE })
    yield put( bloodBankAction.create.success(res))
  } catch (err) {
    yield put( bloodBankAction.create.failure(generateErrorMessage(NotifierTitle.BLOOD_BANK, (err as AxiosError)?.message || '', NotifierTitleType.CREATE)))
    notifier.error({ title: NotifierTitle.BLOOD_BANK, description: (err as AxiosError)?.message, type: NotifierTitleType.CREATE })
  }
}

function* watchBloodBankCreate(): Generator {
  yield takeEvery(ACTION.BLOOD_BANK_CREATE.REQUEST, handleBloodBankCreateRequest)
}

//BLOOD_BANK UPDATE SAGA
function* handleBloodBankUpdateRequest(payload) {
  try {
    const res: ResponseTypeBloodBankUpdate = yield call(() => bloodBankApi.update(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.BLOOD_BANK, type: NotifierTitleType.UPDATE })
    yield put( bloodBankAction.update.success(res))
  } catch (err) {
    yield put( bloodBankAction.update.failure(generateErrorMessage(NotifierTitle.BLOOD_BANK, (err as AxiosError)?.message || '', NotifierTitleType.UPDATE)))
    notifier.error({ title: NotifierTitle.BLOOD_BANK, description: (err as AxiosError)?.message, type: NotifierTitleType.UPDATE })
  }
}

function* watchBloodBankUpdate(): Generator {
  yield takeEvery(ACTION.BLOOD_BANK_UPDATE.REQUEST, handleBloodBankUpdateRequest)
}

//BLOOD_BANK DELETE SAGA
function* handleBloodBankDeleteRequest(payload) {
  try {
    const res: ResponseTypeBloodBankRemove = yield call(() => bloodBankApi.remove(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.BLOOD_BANK, type: NotifierTitleType.REMOVE })
    yield put( bloodBankAction.remove.success(res))
  } catch (err) {
    yield put( bloodBankAction.remove.failure(generateErrorMessage(NotifierTitle.BLOOD_BANK, (err as AxiosError)?.message || '', NotifierTitleType.REMOVE)))
    notifier.error({ title: NotifierTitle.BLOOD_BANK, description: (err as AxiosError)?.message, type: NotifierTitleType.REMOVE })
  }
}

function* watchBloodBankDelete(): Generator {
  yield takeEvery(ACTION.BLOOD_BANK_REMOVE.REQUEST, handleBloodBankDeleteRequest)
}


export default function* rootSaga(): Generator<StrictEffect, void> {
  yield all([
    fork(watchBloodBankList),
    fork(watchBloodBankCreate),
    fork(watchBloodBankUpdate),
    fork(watchBloodBankDelete)
  ]) }
