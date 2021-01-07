import React from 'react'
import queryString from 'query-string'
import { getItem, getItems } from '../utils/api'
import Loading from './Loading'

function PostHeader({ post }) {
  return (
    <p>{JSON.stringify({ post })}</p>
  )
}

export default class Post extends React.Component {

  state = { post: null, comments: [], hasComments: true }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)
    this.fetchPostAndComments(id)
  }

  fetchPostAndComments(id) {
    getItem(id).then(
      (post) => {
        this.setState({ post })

        if (post.kids) {
          getItems(post.kids).then(
            (comments) => {
              this.setState({ comments })
            }
          )
        }
        else {
          this.setState({ hasComments: false })
        }
      }
    )
  }

  isPostLoading() {
    return this.state.post === null
  }

  areCommentsLoading() {
    const { comments, hasComments } = this.state
    return comments.length === 0 && hasComments
  }

  render() {
    const { post, comments } = this.state
    return (
      <>
        { this.isPostLoading()
          ? <Loading text='Fetching post' />
          : <PostHeader post={post} />
        }
        { this.areCommentsLoading()
          ? <Loading text='Fetching comments' />
          : <p>{JSON.stringify(comments)}</p>
        }
      </>
    )
  }
}