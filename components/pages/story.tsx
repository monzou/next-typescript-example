import * as React from 'react'
import MainLayout from '../layouts/main'
import { StoryCard, StoryCardProps } from '../widgets/story-card'

export interface StoryProps {
  path: string
  story: StoryCardProps
}

export const Story: React.SFC<StoryProps> = (props: StoryProps) => {
  const { path, story } = props
  return (
    <MainLayout>
      <h2>Path: {path}</h2>
      <StoryCard key={story.id} {...story} />
    </MainLayout>
  )
}

export default Story
