import * as React from 'react'

export interface StoryCardProps {
  id: number
  title: string
  by: string
  url: string
  score: number
}

export const StoryCard: React.SFC<StoryCardProps> = (props: StoryCardProps) => {
  const { title, by, url, score } = props
  return (
    <div className="story">
      <header className="story-title">
        <a href={url}>{title}</a>
      </header>
      <span className="story-description">
        By {by} | {score} points
      </span>
      <style jsx>{`
        $titleColor: #45d9fd;
        .story {
          margin: 1em 0;
        }
        .story-title {
          a {
            color: $titleColor;
          }
        }
        .story-description {
          font-size: 12px;
        }
      `}</style>
    </div>
  )
}

export default StoryCard
