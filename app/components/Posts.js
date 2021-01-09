import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import PostsList from './PostsList'
import { getPosts } from '../utils/api'


export default class Posts extends React.Component {
  static propTypes = {
    category: PropTypes.oneOf(['top', 'new'])
  }

  state = {
    posts: [],
    error: null,
  }

  componentDidMount() {
    this.fetchPosts()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.fetchPosts()
    }
  }

  fetchPosts = () => {
    this.setState({ posts: [] })
    getPosts(this.props.category)
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
