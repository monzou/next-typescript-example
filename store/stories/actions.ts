import actionCreatorFactory, { AsyncAction } from 'typescript-fsa'
import { Story } from '../../api/stories'

const actionCreator = actionCreatorFactory('next:example:stories')

export const fetchTopStories = actionCreator.async<{}, number[], string>('FETCH_TOP_STORIES')
export const fetchStory = actionCreator.async<number, Story, string>('FETCH_STORY')

export type StoriesAction = AsyncAction<{}, number[], string> | AsyncAction<number, Story, string>
