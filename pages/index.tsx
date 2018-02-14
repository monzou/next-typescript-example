import { compose, defaultProps, pure } from 'recompose'
import { getTopStories } from '../api/stories'
import { initialProps } from '../components/pages/hoc'
import Index from '../components/pages/index'

const enhance = compose(
  initialProps(async () => {
    const stories = await getTopStories(3)
    return {
      env: process.env.NODE_ENV,
      stories
    }
  }),
  defaultProps({
    stories: []
  }),
  pure
)

export default enhance(Index)
