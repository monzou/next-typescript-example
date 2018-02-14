import withRedux from 'next-redux-wrapper'
import RootState from 'store/root-state'
import * as API from '../api/stories'
import { initialProps } from '../components/pages/hoc'
import { Story, StoryProps } from '../components/pages/story'
import { initializeStore } from '../store/index'
import { showStory } from '../store/stories/actions'

const mapStateToProps = ({ stories }: RootState) => {
  return {
    story: stories.story
  }
}

const enhance = initialProps<StoryProps>(async ({ query, store, asPath }) => {
  const id = query.id as number
  const story = await API.getStory(id)
  store.dispatch(
    showStory.done({
      params: id,
      result: story
    })
  )
  return {
    path: asPath
  }
})

export default withRedux(initializeStore, mapStateToProps)(enhance(Story))
