import React from 'react'
import PropTypes from 'prop-types'

export default class Posts extends React.Component {
  propTypes = {
    category: PropTypes.string.isRequired,
  }

  render() {
    const { category } = this.props
    return <h1>{category}</h1>
  }
}
