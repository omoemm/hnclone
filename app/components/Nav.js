import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'

const activeStyle = {
  color: 'rgb(187, 46, 31)',
}

export default function Nav({setCategory}) {
  return (
    <nav className='row space-between'>
      <ul className='row nav'>
        <li>
          <NavLink
            to="/"
            exact
            activeStyle={activeStyle}
            className='nav-link'
            onClick={() => setCategory('top')}
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
            onClick={() => setCategory('new')}
          >
            New
            </NavLink>
        </li>
      </ul>
      <button
        style={{ fontSize: 30 }}
        className='btn-clear'>
        🔦
      </button>
    </nav>
  )
}