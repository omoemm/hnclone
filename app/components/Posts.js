import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import { getPosts, getPostIds } from '../utils/api'


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
    category: PropTypes.string.isRequired,
  }

  state = {
    posts: [],
    error: null
  }

  componentDidMount = () => {
    const { category } = this.props
    getPosts(category)
      .then(
        posts => { this.setState({ posts }) }
      )
      .catch((e) => {
        console.warn('Error fetching posts: ', e)
        this.setState({ error: `There was an error fetching the posts` })
      })

  }

  isLoading = () => {
    const { posts, error } = this.state
    return !posts.length && error === null
  }

  render() {
    const { posts, error } = this.state
    return (
      <>
        {this.isLoading() && <Loading />}
        {error && <p className='center-text error'>{error}</p>}
        {posts && <PostsList posts={posts} />}
      </>
    )
  }
}
