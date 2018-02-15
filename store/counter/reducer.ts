import produce from 'immer'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { decrement, decrementAsync, increment, incrementAsync } from './actions'
import { INITIAL_STATE } from './state'

export default reducerWithInitialState(INITIAL_STATE)
  .case(increment, (state, payload) => {
    const { delta } = payload
    return produce(state, draft => {
      draft.counter = state.counter + delta
    })
  })
  .case(decrement, (state, payload) => {
    const { delta } = payload
    return produce(state, draft => {
      draft.counter = state.counter - delta
    })
  })
  .case(incrementAsync.started, (state, _) => {
    return produce(state, draft => {
      draft.loading = true
    })
  })
  .case(incrementAsync.done, (state, payload) => {
    return produce(state, draft => {
      draft.counter = state.counter + payload.result
      draft.loading = false
    })
  })
  .case(incrementAsync.failed, (state, _) => {
    return produce(state, draft => {
      draft.loading = false
    })
  })
  .case(decrementAsync.started, (state, _) => {
    return produce(state, draft => {
      draft.loading = true
    })
  })
  .case(decrementAsync.done, (state, payload) => {
    return produce(state, draft => {
      draft.counter = state.counter - payload.result
      draft.loading = false
    })
  })
  .case(decrementAsync.failed, (state, _) => {
    return produce(state, draft => {
      draft.loading = false
    })
  })
