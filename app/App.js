import React from 'react'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import Loading from './components/Loading'

const Posts = React.lazy(() => import('./components/Posts'))
const User = React.lazy(() => import('./components/User'))
const Post = React.lazy(() => import('./components/Post'))

export default class App extends React.Component {

  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }

  render() {
    const { error, posts, theme } = this.state

    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={`${theme}`}>
            <div className='container'>
              <Nav />

              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path="/" render={() => <Posts category='top' />} />
                  <Route path="/new" render={() => <Posts category='new' />} />
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