import React from 'react'
import queryString from 'query-string'
import { getUserData } from '../utils/api'
import Loading from './Loading'
import ShortDate from './ShortDate'

function UserProfile({ profile }) {
  const { id, created, karma } = profile
  return (
    <>
      <h1>{id}</h1>
      <div className='meta-info'>
        <span>joined <b><ShortDate time={created} /></b></span>
        <span>has <b>{karma}</b> karma</span>
      </div>
    </>
  )
}

export default class User extends React.Component {
  state = {
    profile: null,
    posts: []
  }
  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)

    getUserData(id).then(
      ([profile, posts]) => {
        this.setState({ profile, posts })
      }
    )
  }

  isLoading = () => {
    const { posts, profile } = this.state
    return profile === null && posts.length === 0
  }

  render() {
    const { profile, posts } = this.state
    console.log('render')
    return (
      <>
        {this.isLoading()
          ? <Loading />
          : <>
            <UserProfile profile={profile} />
            <h2>Posts</h2>
          </>
        }
      </>
    )
  }
}