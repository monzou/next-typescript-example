import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import RootReducer from './root-reducer'
import RootState from './root-state'

export const initializeStore = (initialState: RootState) => {
  return createStore(RootReducer, initialState, devToolsEnhancer({}))
}
