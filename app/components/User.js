import React, { useState } from 'react'
import queryString from 'query-string'
import { getItems, getUser } from '../utils/api'
import Loading from './Loading'
import ShortDate from './ShortDate'
import PostsList from './PostsList'

function UserProfile({ profile }) {
  const { id, created, karma, about } = profile
  return (
    <>
      <h1>{id}</h1>
      <div className='meta-info'>
        <span>joined <b><ShortDate time={created} /></b></span>
        <span>has <b>{karma}</b> karma</span>
      </div>
      <p dangerouslySetInnerHTML={{ __html: about }} />
    </>
  )
}

export default class User extends React.Component {
  state = {
    profile: null,
    posts: [],
    hasPosts: true,
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)
    this.fetchUserAndPosts(id)
  }

  fetchUserAndPosts(id) {
    getUser(id).then(
      (user) => {
        this.setState({ profile: user })
        const { submitted } = user
        getItems(submitted).then(
          (data) => {
            const posts = data.filter((post) => post.type === 'story')
            this.setPosts({ posts })
          }
        )
      }
    )
  }

  setPosts({ posts }) {
    this.setState({ hasPosts: posts.length})
    this.setState({ posts })
  }

  isProfileLoading = () => {
    return this.state.profile === null
  }

  arePostsLoading = () => {
    const { posts, hasPosts } = this.state
    return posts.length === 0 && hasPosts
  }

  render() {
    const { profile, posts, hasPosts } = this.state
    return (
      <>
        {this.isProfileLoading() &&
          <Loading text='Fetching user' />
        }
        {profile &&
          <UserProfile profile={profile} />
        }
        {!this.isProfileLoading && this.arePostsLoading()
          ? <Loading text='Fetching posts' />
          : <h2>Posts</h2>
        }
        {posts.length > 0 &&
          <>
            <PostsList posts={posts} />
          </>
        }
        {!hasPosts &&
          <p>User has not posted yet</p>
        }
      </>
    )
  }
}