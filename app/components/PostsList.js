import React from 'react'
import PropTypes from 'prop-types'
import ShortDate from './ShortDate'


export default function PostsList({ posts }) {
  return (
    <ul>
      {posts.map((post) => {
        const { id, url, title, by, time, descendants } = post
        return (
          <li className="post" key={id}>
            <a className="link" href={url}>
              {title}
            </a>
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
          </li>
        )
      })}
    </ul>
  )
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
}