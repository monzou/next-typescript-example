import produce from 'immer'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { fetchStory, fetchTopStories } from './actions'
import { INITIAL_STATE } from './state'

export default reducerWithInitialState(INITIAL_STATE)
  .cases([fetchStory.started, fetchTopStories.started], (state, _) => {
    return produce(state, draft => {
      draft.loading = true
    })
  })
  .case(fetchStory.done, (state, payload) => {
    return produce(state, draft => {
      draft.loading = false
      draft.story = payload.result
    })
  })
  .case(fetchTopStories.done, (state, payload) => {
    return produce(state, draft => {
      draft.loading = false
      draft.ids = payload.result
    })
  })
  .cases([fetchStory.failed, fetchTopStories.failed], (state, payload) => {
    return produce(state, draft => {
      draft.loading = false
      draft.error = payload.error
    })
  })
