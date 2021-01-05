import React from 'react'
import PropTypes from 'prop-types'
import { getPosts, getPostIds } from '../utils/api'

function PostsList({ posts }) {
  return (
    <ul>
      {posts.map((post, index) => {
        const postAsJson = JSON.stringify(post)
        return (
          // TODO change index to a unique id
          <li key={index}>
            {postAsJson}
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
      posts => {this.setState({ posts })}
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
        {this.isLoading() && <p>LOADING ...</p>}
        {error && <p className='center-text error'>{error}</p>}
        {posts && <PostsList posts={posts} />}
      </>
    )
  }
}
