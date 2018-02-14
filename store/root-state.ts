import CounterState from './counter/state'
import StoriesState from './stories/state'

export default interface RootState {
  counter: CounterState
  stories: StoriesState
}
