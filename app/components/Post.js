import React from 'react'
import queryString from 'query-string'
import { getItem, getItems } from '../utils/api'
import Loading from './Loading'
import MetaInfo from './MetaInfo'

function PostHeader({ post }) {
  const { title, url } = post
  return (
    <>
      <h1 className='header'>
        <a className='link' href={url}>
          {title}
        </a>
      </h1>
      <MetaInfo item={post} />
    </>
  )
}

function Comments({ comments }) {
  return (
    <>
      {comments.map((comment) => {
        const { text, id } = comment
        return (
          <div className="comment" key={id}>
            <MetaInfo item={comment} />
            <p dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        )
      })}
    </>
  )
}

export default class Post extends React.Component {

  state = {
    post: null,
    comments: [],
    hasComments: true,
    error: null,
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)
    this.fetchPostAndComments(id)
  }

  fetchPostAndComments(id) {
    getItem(id).then(
      (post) => {
        this.setState({ post })
        this.setState({ hasComments: post.kids !== undefined})
        return getItems(post.kids || [])
      }
    ).then(
        (comments) => {
          const notDeletedcomments = comments.filter((comment) => !comment.deleted)
          this.setState({ comments:notDeletedcomments })
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
    const { post, comments, error } = this.state

    if (error) {
      return <p className='center-text error'>{error}</p>
    }

    return (
      <>
        { this.isPostLoading() &&
          <Loading text='Fetching post' />
        }
        {post &&
          <PostHeader post={post} />
        }
        { !this.isPostLoading() && this.areCommentsLoading() &&
          <Loading text='Fetching comments' />
        }
        {comments.length > 0 &&
          <Comments comments={comments} />
        }
      </>
    )
  }
}