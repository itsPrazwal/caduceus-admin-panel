import { all } from 'redux-saga/effects'

import AuthRootSaga from './AuthRedux/AuthSagas'
import BloodBankRootSaga from './BloodBank/Saga'
import DepartmentRootSaga from './Department/Saga'
import DiseaseRootSaga from './Diseases/Saga'
import EventRootSaga from './Events/Saga'
import AmbulanceRootSaga from './Ambulance/Saga'
import HospitalRootSaga from './Hospital/Saga'

export default function* rootSagas(): Generator {
  yield all([
    AuthRootSaga(),
    BloodBankRootSaga(),
    DepartmentRootSaga(),
    DiseaseRootSaga(),
    EventRootSaga(),
    AmbulanceRootSaga(),
    HospitalRootSaga()
  ])
}
