import React from 'react'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Posts from './components/Posts'
import User from './components/User'
import Post from './components/Post'
import { getPosts } from './utils/api'
import { ThemeProvider } from './contexts/theme'

export default class App extends React.Component {

  state = {
    error: null,
    posts: [],
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }

  setCategory = (category) => {
    this.setState({ posts: [] })
    getPosts(category)
      .then(
        posts => { this.setState({ posts }) }
      )
      .catch((e) => {
        console.warn('Error fetching posts: ', e)
        this.setState({ error: `There was an error fetching the posts` })
      })
  }

  isTop() {
    return window.location.pathname === '/'
  }

  isNew() {
    return window.location.pathname === '/new'
  }

  componentDidMount = () => {
    if (this.isTop()) {
      this.setCategory('top')
    }
    else if (this.isNew()) {
      this.setCategory('new')
    }
  }

  render() {
    const { error, posts, theme } = this.state

    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={`${theme}`}>
            <div className='container'>
              <Nav setCategory={this.setCategory} />
              <Switch>
                <Route exact path="/" render={() => <Posts error={error} posts={posts} />} />
                <Route exact path="/new" render={() => <Posts error={error} posts={posts} />} />
                <Route path="/user" component={User} />
                <Route path="/post" component={Post} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}