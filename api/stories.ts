import { request } from './fetch'

const HOST = 'https://hacker-news.firebaseio.com/v0'

export interface Story {
  id: number
  title: string
  by: string
  url: string
  score: number
}

export function fetchTopStoryIds(): Promise<number[]> {
  return request('GET', HOST, 'topstories.json')
}

export async function fetchTopStories(limit: number = 5): Promise<Story[]> {
  const ids = await fetchTopStoryIds()
  return Promise.all(ids.slice(0, limit).map(id => fetchStory(id)))
}

export function fetchStory(id: number): Promise<Story> {
  return request('GET', HOST, `item/${id}.json`)
}
