import { combineReducers } from 'redux'
import RootState from './root-state'

import counter from './counter/reducer'
import stories from './stories/reducer'

export default combineReducers<RootState>({
  counter,
  stories
})
