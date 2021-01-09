import React from 'react'
import PropTypes from 'prop-types'
import MetaInfo from './MetaInfo'

export default function PostsList({ posts }) {
  return (
    <ul>
      {posts.map((post) => {
        const { id, url, title } = post
        return (
          <li className="post" key={id}>
            <a className="link" href={url}>
              {title}
            </a>
            <MetaInfo item={post} />
          </li>
        )
      })}
    </ul>
  )
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
}