import React from 'react'
import './index.css'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
        </div>
      </Router>
    )
  }
}