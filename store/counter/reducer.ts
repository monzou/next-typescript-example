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
  .case(incrementAsync.done, (state, payload) => {
    return produce(state, draft => {
      draft.counter = state.counter + payload.result
    })
  })
  .case(decrementAsync.done, (state, payload) => {
    return produce(state, draft => {
      draft.counter = state.counter - payload.result
    })
  })
