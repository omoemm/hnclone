import React from 'react'
import queryString from 'query-string'
import { getUserData } from '../utils/api'
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

    getUserData(id).then(
      ([profile, posts]) => {
        this.setState({ profile, posts })
      }
    )
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
        {!this.isProfileLoading && this.arePostsLoading() &&
          <Loading text='Fetching posts' />
        }
        {posts.length > 0 &&
          <>
            <h2>Posts</h2>
            <PostsList posts={posts} />
          </>
        }
        {!hasPosts &&
          <p>User has never posted</p>
        }
      </>
    )
  }
}