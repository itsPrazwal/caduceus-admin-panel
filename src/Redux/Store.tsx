import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSagas from './rootSagas'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducers from './rootReducers'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['AuthReducer'],
  blacklist: ['DiseaseReducer', 'DepartmentReducer', 'BloodBankReducer', 'EventReducer']
}

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducers)

const enhancer = composeWithDevTools(
  applyMiddleware(...middleware)
)

const store = createStore(persistedReducer, enhancer)
sagaMiddleware.run(rootSagas)
const persistedStore = persistStore(store)

export { store, persistedStore }

// export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
