import React from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

const activeStyle = {
  color: 'rgb(187, 46, 31)',
}

function ButtonTheme({ theme, toggleTheme }) {
  return (
    <button
      style={{ fontSize: 30 }}
      className='btn-clear'
      onClick={toggleTheme}
    >
      {theme === 'light'
        ? "🔦"
        : "💡"
      }
    </button>
  )
}

export default function Nav() {
  return (
    <nav className='row space-between'>
      <ul className='row nav'>
        <li>
          <NavLink
            to="/"
            exact
            activeStyle={activeStyle}
            className='nav-link'
          >
            Top
            </NavLink>
        </li>
        <li>
          <NavLink
            to="/new"
            exact
            activeStyle={activeStyle}
            className='nav-link'
          >
            New
            </NavLink>
        </li>
      </ul>
      <ThemeConsumer>
        {({ theme, toggleTheme }) => <ButtonTheme theme={theme} toggleTheme={toggleTheme} />}
      </ThemeConsumer>
    </nav>
  )
}