import { all } from 'redux-saga/effects'

import AuthRootSaga from './AuthRedux/AuthSagas'
import DiseaseRootSaga from './Diseases/Saga'

export default function* rootSagas(): Generator {
  yield all([
    AuthRootSaga(),
    DiseaseRootSaga(),
  ])
}
