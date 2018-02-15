export interface CounterState {
  counter: number
  loading: boolean
}

export const INITIAL_STATE: CounterState = {
  counter: 0,
  loading: false
}

export default CounterState
