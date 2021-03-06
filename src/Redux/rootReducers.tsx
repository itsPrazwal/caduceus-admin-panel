import { CombinedState, combineReducers } from 'redux'

import { AuthReducer } from './AuthRedux/AuthReducer'

import { LOG_OUT } from './AuthRedux/AuthTypes'
import { ReducerActionType } from '../Utils/types'
import { DiseaseReducer } from './Diseases/Reducer'
import { DepartmentReducer } from './Department/Reducer'
import { BloodBankReducer } from './BloodBank/Reducer'
import { EventReducer } from './Events/Reducer'
import { AmbulanceReducer } from './Ambulance/Reducer'
import { HospitalReducer } from './Hospital/Reducer'

export const toPersistReducers = {
  AuthReducer,
}
const appReducer = combineReducers({
  ...toPersistReducers,
  DiseaseReducer,
  DepartmentReducer,
  BloodBankReducer,
  EventReducer,
  AmbulanceReducer,
  HospitalReducer
})

const rootReducer = (state: CombinedState<RootState>, action: ReducerActionType): RootState => {
  return appReducer(action.type === LOG_OUT.SUCCESS ? undefined : state, action)
}

export default rootReducer
export type RootState = ReturnType <typeof appReducer>
