import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'


function ShortDate({ time }) {
  const date = new Date(time * 1e3)
  return <>{date.toLocaleString()}</>
}

function PostsList({ posts }) {
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

export default class Posts extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    error: PropTypes.string,
  }


  isLoading = () => {
    const { posts, error } = this.props
    return !posts.length && error === null
  }

  render() {
    const { posts, error } = this.props
    return (
      <>
        {this.isLoading() && <Loading />}
        {error && <p className='center-text error'>{error}</p>}
        {posts && <PostsList posts={posts} />}
      </>
    )
  }
}
