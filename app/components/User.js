import React from 'react'
import queryString from 'query-string'
import { getUserData } from '../utils/api'

export default class User extends React.Component {
  state = {id:'loading'}

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)

    getUserData(id).then(
      result => {this.setState(result)}
    )
  }

  render() {
    return <p>hello {JSON.stringify(this.state)}</p>
  }
}