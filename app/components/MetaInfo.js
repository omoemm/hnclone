import React from 'react'
import { ThemeConsumer } from '../contexts/theme'
import { Link } from 'react-router-dom'
import ShortDate from './ShortDate'

export default function MetaInfo({ item }) {
  const { id, by, time, descendants } = item

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`meta-info meta-info-${theme}`}>
          <span>
            by <Link to={`/user?id=${by}`}>{by}</Link>
          </span>
          <span>
            on {<ShortDate time={time} />}
          </span>
          {
            descendants !== undefined &&
            <span>
              with <Link to={`/post?id=${id}`}>{descendants}</Link> comments
          </span>
          }
        </div>
      )}
    </ThemeConsumer>
  )
}