import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import PostsList from './PostsList'
import { fetchPosts } from '../utils/api'


export default class Posts extends React.Component {
  static propTypes = {
    category: PropTypes.oneOf(['top', 'new'])
  }

  state = {
    posts: [],
    error: null,
  }

  componentDidMount() {
    this.fetchMainPosts()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.fetchMainPosts()
    }
  }

  fetchMainPosts = () => {
    this.setState({ posts: [] })
    fetchPosts(this.props.category)
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

    if (this.isLoading()) {
      return <Loading />
    }

    if (error) {
      return <p className='center-text error'>{error}</p>
    }

    return <PostsList posts={posts} />
  }
}
