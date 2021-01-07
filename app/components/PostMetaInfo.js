import React from 'react'
import ShortDate from './ShortDate'

export default function PostMetaInfo({post}) {
  const { id, by, time, descendants } = post
  return (
    <div className="meta-info">
      <span>
        by <a href={`/user?id=${by}`}>{by}</a>
      </span>
      <span>
        on {<ShortDate time={time} />}
      </span>
      <span>
        with <a href={`/post?id=${id}`}>{descendants}</a> comments
      </span>
    </div>
  )
}