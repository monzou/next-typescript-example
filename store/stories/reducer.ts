import produce from 'immer'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { showStory, showTopStories } from './actions'
import { INITIAL_STATE } from './state'

export default reducerWithInitialState(INITIAL_STATE)
  .case(showStory.started, (state, _) => {
    return produce(state, draft => {
      draft.loading = true
    })
  })
  .case(showStory.done, (state, payload) => {
    return produce(state, draft => {
      draft.loading = false
      draft.story = payload.result
    })
  })
  .case(showStory.failed, (state, payload) => {
    return produce(state, draft => {
      draft.loading = false
      draft.error = payload.error
    })
  })
  .case(showTopStories.started, (state, _) => {
    return produce(state, draft => {
      draft.loading = true
    })
  })
  .case(showTopStories.done, (state, payload) => {
    return produce(state, draft => {
      draft.loading = false
      draft.ids = payload.result
    })
  })
  .case(showTopStories.failed, (state, payload) => {
    return produce(state, draft => {
      draft.loading = false
      draft.error = payload.error
    })
  })
