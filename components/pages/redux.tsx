import * as React from 'react'
import CounterState from '../../store/counter/state'
import StoriesState from '../../store/stories/state'
import MainLayout from '../layouts/main'

export interface ReduxActions {
  increment(delta: number)
  decrement(delta: number)
  incrementAsync()
  decrementAsync()
  showStoryAsync(id: number)
}

export interface ReduxProps {
  counter: CounterState
  stories: StoriesState
  actions: ReduxActions
}

export const Redux: React.SFC<ReduxProps> = (props: ReduxProps) => {
  const { counter, stories, actions } = props
  return (
    <MainLayout>
      <div>
        <h2>Counter {counter.counter}</h2>
        <h3>Sync Actions</h3>
        <section>
          <button onClick={() => actions.increment(3)}>Increment 3</button>
          <button onClick={() => actions.decrement(3)}>Decrement 3</button>
        </section>
        <h3>Async Actions</h3>
        <section>
          <button onClick={actions.incrementAsync}>Increment Async 1</button>
          <button onClick={actions.decrementAsync}>Decrement Async 1</button>
        </section>
      </div>
      <div>
        <h2>Stories</h2>
        <section>
          {stories.loading
            ? 'Loading ...'
            : stories.story ? stories.story.title : stories.error || 'Please click story'}
        </section>
        <ul>
          {stories.ids.map(id => {
            return (
              <li key={`story-id-${id}`} onClick={() => actions.showStoryAsync(id)}>
                {id}
              </li>
            )
          })}
        </ul>
      </div>
    </MainLayout>
  )
}

export default Redux
