import { StrictEffect, all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { NotifierTitle, NotifierTitleType } from '../../Utils/enums'
import { generateErrorMessage } from '../../Utils/utilFunctions'
import { notifier } from '../../Utils/Notifiers/Notifier'
import {
  ACTION,
  ResponseTypeDepartmentCreate,
  ResponseTypeDepartmentList,
  ResponseTypeDepartmentRemove,
  ResponseTypeDepartmentUpdate
} from './Types'
import { departmentAction } from './Action'
import diseaseApis from './Api'
import { ErrorObject } from '../../Utils/types'
import { AxiosError } from 'axios'

//DEPARTMENT LIST SAGA
function* handleDepartmentListRequest() {
  try {
    const res: ResponseTypeDepartmentList = yield call(() => diseaseApis.list())
    if (!res.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    yield put(departmentAction.list.success(res))
  } catch (err) {
    yield put(departmentAction.list.failure(generateErrorMessage(NotifierTitle.DEPARTMENT, (err as AxiosError)?.message || '', NotifierTitleType.LIST) ))
    notifier.error({ title: NotifierTitle.DEPARTMENT, description: (err as AxiosError)?.message, type: NotifierTitleType.LIST  })
  }
}

function* watchDepartmentList(): Generator {
  yield takeEvery(ACTION.DEPARTMENT_LIST.REQUEST, handleDepartmentListRequest)
}

//DEPARTMENT ADD SAGA
function* handleDepartmentCreateRequest(payload) {
  try {
    const res: ResponseTypeDepartmentCreate = yield call(() => diseaseApis.create(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.DEPARTMENT, type: NotifierTitleType.CREATE })
    yield put(departmentAction.create.success(res))
  } catch (err) {
    yield put(departmentAction.create.failure(generateErrorMessage(NotifierTitle.DEPARTMENT, (err as AxiosError)?.message || '', NotifierTitleType.CREATE)))
    notifier.error({ title: NotifierTitle.DEPARTMENT, description: (err as AxiosError)?.message, type: NotifierTitleType.CREATE })
  }
}

function* watchDepartmentCreate(): Generator {
  yield takeEvery(ACTION.DEPARTMENT_CREATE.REQUEST, handleDepartmentCreateRequest)
}

//DEPARTMENT UPDATE SAGA
function* handleDepartmentUpdateRequest(payload) {
  try {
    const res: ResponseTypeDepartmentUpdate = yield call(() => diseaseApis.update(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.DEPARTMENT, type: NotifierTitleType.UPDATE })
    yield put(departmentAction.update.success(res))
  } catch (err) {
    yield put(departmentAction.update.failure(generateErrorMessage(NotifierTitle.DEPARTMENT, (err as AxiosError)?.message || '', NotifierTitleType.UPDATE)))
    notifier.error({ title: NotifierTitle.DEPARTMENT, description: (err as AxiosError)?.message, type: NotifierTitleType.UPDATE })
  }
}

function* watchDepartmentUpdate(): Generator {
  yield takeEvery(ACTION.DEPARTMENT_UPDATE.REQUEST, handleDepartmentUpdateRequest)
}

//DEPARTMENT DELETE SAGA
function* handleDepartmentDeleteRequest(payload) {
  try {
    const res: ResponseTypeDepartmentRemove = yield call(() => diseaseApis.remove(payload.payload))
    if (!res?.data?.result || !res) throw { message: res.data?.message } as ErrorObject
    notifier.success({ title: NotifierTitle.DEPARTMENT, type: NotifierTitleType.REMOVE })
    yield put(departmentAction.remove.success(res))
  } catch (err) {
    yield put(departmentAction.remove.failure(generateErrorMessage(NotifierTitle.DEPARTMENT, (err as AxiosError)?.message || '', NotifierTitleType.REMOVE)))
    notifier.error({ title: NotifierTitle.DEPARTMENT, description: (err as AxiosError)?.message, type: NotifierTitleType.REMOVE })
  }
}

function* watchDepartmentDelete(): Generator {
  yield takeEvery(ACTION.DEPARTMENT_REMOVE.REQUEST, handleDepartmentDeleteRequest)
}


export default function* rootSaga(): Generator<StrictEffect, void> {
  yield all([
    fork(watchDepartmentList),
    fork(watchDepartmentCreate),
    fork(watchDepartmentUpdate),
    fork(watchDepartmentDelete)
  ]) }
