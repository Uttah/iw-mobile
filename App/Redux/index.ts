import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';
import ReduxPersist from '../Config/ReduxPersist';
import { reducer as formReducer } from 'redux-form';
import { toastReducer as toast } from 'react-native-redux-toast';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  user: require('./UserRedux').reducer,
  login: require('./LoginRedux').reducer,
  pools: require('./PoolsRedux').reducer,
  root: require('./RootRedux').reducer,
  chat: require('./ChatRedux').reducer,
  form: formReducer,
  toast: toast,
  edituser: require('./EditUserRedux').reducer,
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
