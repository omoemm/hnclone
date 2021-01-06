import React from 'react'
import queryString from 'query-string'

export default class User extends React.Component {
  state = {id:'loading'}

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)
    this.setState({ id })
  }

  render() {
    const { id } = this.state
    return <p>hello {id} </p>
  }
}