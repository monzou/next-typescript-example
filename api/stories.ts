import Fetcher from './fetcher'

const fetcher = new Fetcher('https://hacker-news.firebaseio.com/v0', {
  credentials: 'omit'
})

export interface Story {
  id: number
  title: string
  by: string
  url: string
  score: number
}

export function fetchTopStoryIds(): Promise<number[]> {
  return fetcher.fetch('GET', 'topstories.json').exec()
}

export async function fetchTopStories(limit: number = 5): Promise<Story[]> {
  const ids = await fetchTopStoryIds()
  return Promise.all(ids.slice(0, limit).map(id => fetchStory(id)))
}

export function fetchStory(id: number): Promise<Story> {
  return fetcher.fetch('GET', `item/${id}.json`).exec()
}
