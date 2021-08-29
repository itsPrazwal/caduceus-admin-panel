import { all } from 'redux-saga/effects'

import AuthRootSaga from './AuthRedux/AuthSagas'

export default function* rootSagas(): Generator {
  yield all([
    AuthRootSaga(),
  ])
}
