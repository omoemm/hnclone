import React from 'react'
import PropTypes from 'prop-types'
import {getPostIds} from '../utils/api'

function PostsList({posts}) {
  return (
    <ul>
      {posts.map((post) => {
        const {id, title} = post
        return (
          <li key={id}>
            {title}
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
    posts: [{id: 22, title:'toto'},{id: 23, title: 'titi'}]
  }

  componentDidMount = () => {
    const { category } = this.props

    getPostIds(category).then((data) => {
      debugger
    })
  }

  render() {
    const { posts } = this.state
    return (
      <>
      {posts && <PostsList posts={posts}/>}
      </>
    )
  }
}
