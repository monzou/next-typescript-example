import { Story } from '../../api/stories'

export interface StoriesState {
  ids: number[]
  story?: Story
  loading?: boolean
  error?: string
}

export const INITIAL_STATE: StoriesState = {
  ids: [] as number[],
  loading: false
}

export default StoriesState
