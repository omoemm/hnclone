import React from 'react'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { getPosts } from './utils/api'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import Loading from './components/Loading'

const Posts = React.lazy(() => import('./components/Posts'))
const User = React.lazy(() => import('./components/User'))
const Post = React.lazy(() => import('./components/Post'))

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

              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path="/" render={() => <Posts error={error} posts={posts} />} />
                  <Route path="/new" render={() => <Posts error={error} posts={posts} />} />
                  <Route path="/user" component={User} />
                  <Route path="/post" component={Post} />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>

            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}