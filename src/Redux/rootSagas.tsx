import { all } from 'redux-saga/effects'

import AuthRootSaga from './AuthRedux/AuthSagas'
import DiseaseRootSaga from './Diseases/Saga'
import DepartmentRootSaga from './Department/Saga'

export default function* rootSagas(): Generator {
  yield all([
    AuthRootSaga(),
    DiseaseRootSaga(),
    DepartmentRootSaga()
  ])
}
