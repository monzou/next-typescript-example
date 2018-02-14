import actionCreatorFactory, { AsyncAction } from 'typescript-fsa'
import { Story } from '../../api/stories'

const actionCreator = actionCreatorFactory('next:example:stories')

export const showTopStories = actionCreator.async<{}, number[], string>('SHOW_TOP_STORIES')
export const showStory = actionCreator.async<number, Story, string>('SHOW_STORY')

export type StoriesAction = AsyncAction<{}, number[], string> | AsyncAction<number, Story, string>
