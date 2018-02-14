import actionCreatorFactory, { Action, AsyncAction } from 'typescript-fsa'

const actionCreator = actionCreatorFactory('next:example:counter')

export interface CounterParams {
  delta: number
}

export const increment = actionCreator<CounterParams>('INCREMENT')
export const decrement = actionCreator<CounterParams>('DECREMENT')
export const incrementAsync = actionCreator.async<CounterParams, number>('INCREMENT_ASYNC')
export const decrementAsync = actionCreator.async<CounterParams, number>('DECREMENT_ASYNC')

export type CounterAction = Action<CounterParams> | AsyncAction<CounterParams, number, any>
