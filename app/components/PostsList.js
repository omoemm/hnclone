import React from 'react'
import PropTypes from 'prop-types'
import PostMetaInfo from './PostMetaInfo'

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
            <PostMetaInfo post={post} />
          </li>
        )
      })}
    </ul>
  )
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
}