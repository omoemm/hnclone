import React from 'react'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Posts from './components/Posts'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />

          <Switch>
            <Route exact path="/" render={() => <Posts category='top'/>}/>
            <Route exact path="/new" render={() => <Posts category='new'/>}/>
            <Route render={() => <h1>404</h1>}/>
          </Switch>

        </div>
      </Router>
    )
  }
}