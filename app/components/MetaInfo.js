import React from 'react'
import { ThemeConsumer } from '../contexts/theme'
import ShortDate from './ShortDate'

export default function MetaInfo({ item }) {
  const { id, by, time, descendants } = item

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`meta-info meta-info-${theme}`}>
          <span>
            by <a href={`/user?id=${by}`}>{by}</a>
          </span>
          <span>
            on {<ShortDate time={time} />}
          </span>
          {
            descendants !== undefined &&
            <span>
              with <a href={`/post?id=${id}`}>{descendants}</a> comments
          </span>
          }
        </div>
      )}
    </ThemeConsumer>
  )
}