import React from 'react'
import queryString from 'query-string'
import { getUserData } from '../utils/api'

export default class User extends React.Component {
  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)

    getUserData(id).then(
      (profile, posts) => {
        this.setState({profile, posts})
      }
    )
  }

  render() {
    return <p>hello {JSON.stringify(this.state)}</p>
  }
}