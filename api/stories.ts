import { request } from './fetch'

const HOST = 'https://hacker-news.firebaseio.com/v0'

export interface Story {
  id: number
  title: string
  by: string
  url: string
  score: number
}

export function getTopStoriesIds(): Promise<number[]> {
  return request('GET', HOST, 'topstories.json')
}

export async function getTopStories(limit: number = 5): Promise<Story[]> {
  const ids = await getTopStoriesIds()
  return Promise.all(ids.slice(0, limit).map(id => getStory(id)))
}

export function getStory(id: number): Promise<Story> {
  return request('GET', HOST, `item/${id}.json`)
}
