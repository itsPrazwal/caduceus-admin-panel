import { all } from 'redux-saga/effects'

import AuthRootSaga from './AuthRedux/AuthSagas'
import BloodBankRootSaga from './BloodBank/Saga'
import DepartmentRootSaga from './Department/Saga'
import DiseaseRootSaga from './Diseases/Saga'

export default function* rootSagas(): Generator {
  yield all([
    AuthRootSaga(),
    BloodBankRootSaga(),
    DepartmentRootSaga(),
    DiseaseRootSaga()
  ])
}
