import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import PostsList from './PostsList'


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
