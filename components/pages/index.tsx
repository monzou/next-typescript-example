import * as React from 'react'
import { compose, defaultProps, pure } from 'recompose'
import MainLayout from '../layouts/main'
import { StoryCard, StoryCardProps } from '../widgets/story-card'

export interface IndexProps {
  env: string
  stories: StoryCardProps[]
}

const Index: React.SFC<IndexProps> = (props: IndexProps) => {
  const { env, stories } = props
  return (
    <MainLayout>
      <h2>{env}</h2>
      <h3>Stories</h3>
      {stories.map(story => {
        return <StoryCard key={story.id} {...story} />
      })}
    </MainLayout>
  )
}

const enhance = compose(
  defaultProps<Partial<IndexProps>>({
    stories: []
  }),
  pure
)

export default enhance(Index)
