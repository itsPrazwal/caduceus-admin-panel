import { AxiosError, AxiosResponse } from 'axios'
import { StrictEffect, all, call, fork, put, takeLatest } from 'redux-saga/effects'

import { changePassword, forgotPassword, logOut, login, resetPassword } from './AuthActions'
import {
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  FieldTypeChangePassword,
  FieldTypeForgotPassword,
  FieldTypeLogin,
  FieldTypeResetPassword, LOGIN, LOG_OUT, RESET_PASSWORD, ResponseTypeLoginData
} from './AuthTypes'
import { apiAuthChangePassword, apiAuthForgotPassword, apiAuthResetPassword, apiAuthSignIn } from './AuthApi'

import { notifier } from '../../Utils/Notifiers/Notifier'
import { generateErrorMessage, setLocalStorageAfterLogin } from '../../Utils/utilFunctions'
import { ReducerActionType } from '../../Utils/types'
import { NotifierTitle } from '../../Utils/enums'

//LOGIN SAGA
function* tryLogin(params: ReducerActionType) {
  const { payload } = params
  try {
    const res: AxiosResponse<ResponseTypeLoginData> = yield call(apiAuthSignIn, payload as FieldTypeLogin)
    if (!res) throw NotifierTitle.GENERIC
    const { data: { id, token } } = res
    setLocalStorageAfterLogin({ id, token })
    notifier.success(NotifierTitle.LOGIN)
    yield put(login.success(res))
  } catch (err) {
    const errMessage = (err as AxiosError).response?.data.message
    yield put(login.failure(generateErrorMessage(NotifierTitle.LOGIN, errMessage)))
    notifier.error(NotifierTitle.LOGIN, errMessage)
  }
  return true
}

function* watchTryLogin(): Generator {
  yield takeLatest(LOGIN.REQUEST, tryLogin)
}

//LOG OUT SAGA
function* tryLogOut() {
  try {
    localStorage.clear()
    yield put(logOut.success())
    notifier.success(NotifierTitle.LOG_OUT)
  } catch (err) {
    yield put(login.failure(generateErrorMessage(NotifierTitle.LOG_OUT)))
    notifier.error(NotifierTitle.LOG_OUT)
  }
  return true
}

function* watchTryLogOut(): Generator {
  yield takeLatest(LOG_OUT.REQUEST, tryLogOut)
}

//FORGOT PASSWORD SAGA
function* tryForgotPassword(params: ReducerActionType<FieldTypeForgotPassword>) {
  const { payload } = params
  try {
    const res: AxiosResponse = yield call(apiAuthForgotPassword, payload as FieldTypeForgotPassword)
    if (!res) throw NotifierTitle.GENERIC
    notifier.success(NotifierTitle.SEND_EMAIL)
    yield put(forgotPassword.success(res))
  } catch (err) {
    const errMessage = (err as AxiosError).response?.data.message
    yield put(forgotPassword.failure(generateErrorMessage(NotifierTitle.SEND_EMAIL, errMessage)))
    notifier.error(NotifierTitle.SEND_EMAIL, errMessage)
  }
  return true
}

function* watchTryForgotPassword(): Generator {
  yield takeLatest(FORGOT_PASSWORD.REQUEST, tryForgotPassword)
}

//FORGOT PASSWORD SAGA
function* tryResetPassword(params: ReducerActionType<FieldTypeResetPassword>) {
  const { payload } = params
  try {
    const res: AxiosResponse = yield call(apiAuthResetPassword, payload as FieldTypeResetPassword)
    if (!res) throw NotifierTitle.GENERIC
    notifier.success(NotifierTitle.RESET_PASSWORD)
    yield put(resetPassword.success(res))
  } catch (err) {
    const errMessage = (err as AxiosError).response?.data.message
    yield put(resetPassword.failure(generateErrorMessage(NotifierTitle.RESET_PASSWORD, errMessage)))
    notifier.error(NotifierTitle.RESET_PASSWORD, errMessage)
  }
  return true
}

function* watchTryResetPassword(): Generator {
  yield takeLatest(RESET_PASSWORD.REQUEST, tryResetPassword)
}

//FORGOT PASSWORD SAGA
function* tryChangePassword(params: ReducerActionType<FieldTypeChangePassword>) {
  const { payload } = params
  try {
    const res: AxiosResponse = yield call(apiAuthChangePassword, payload as FieldTypeChangePassword)
    if (!res) throw NotifierTitle.GENERIC
    notifier.success(NotifierTitle.CHANGE_PASSWORD)
    yield put(changePassword.success(res))
  } catch (err) {
    const errMessage = (err as AxiosError).response?.data.message
    yield put(changePassword.failure(generateErrorMessage(NotifierTitle.CHANGE_PASSWORD, errMessage)))
    notifier.error(NotifierTitle.CHANGE_PASSWORD, errMessage)
  }
  return true
}

function* watchTryChangePassword(): Generator {
  yield takeLatest(CHANGE_PASSWORD.REQUEST, tryChangePassword)
}

//EXPORT ALL SAGA
export default function* AuthSagas(): Generator<StrictEffect, void> {
  yield all([
    fork(watchTryLogin),
    fork(watchTryLogOut),
    fork(watchTryForgotPassword),
    fork(watchTryResetPassword),
    fork(watchTryChangePassword)
  ])
}
