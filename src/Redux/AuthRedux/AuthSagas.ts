import { AxiosResponse } from 'axios'
import { StrictEffect, all, call, fork, put, takeLatest } from 'redux-saga/effects'

import { login } from './AuthActions'
import { LOGIN } from './AuthTypes'
import { signInApi } from './AuthApi'

import { notifier } from '../../Utils/Notifiers/Notifier'
import { generateErrorMessage } from '../../Utils/utilFunctions'
import { LoginFieldType, ReducerActionType } from '../../Utils/types'
import { NotifierTitle } from '../../Utils/enums'

//LOGIN SAGA
function* tryLogin(params: ReducerActionType) {
  const { payload } = params
  try {
    const res: AxiosResponse = yield call(signInApi, payload as LoginFieldType)
    if (!res) throw NotifierTitle.GENERIC
    notifier.success(NotifierTitle.LOGIN)
    yield put(login.success(res))
  } catch (err) {
    yield put(login.failure(generateErrorMessage(NotifierTitle.LOGIN)))
    notifier.error(NotifierTitle.LOGIN)
  }
  return true
}

function* watchTryLogin(): Generator {
  yield takeLatest(LOGIN.REQUEST, tryLogin)
}

//EXPORT ALL SAGA
export default function* AuthSagas(): Generator<StrictEffect, void> {
  yield all([
    fork(watchTryLogin),
  ])
}
