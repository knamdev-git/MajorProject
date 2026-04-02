import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import ThemeButton from './ThemeButton/ThemeButton.jsx'


const Header = ({ theme, setTheme }) => {

  return (
    <div className='bg-emerald-600 flex justify-between p-2 '>
      <h1 className='font-bold text-xl text-white'>MediumClone</h1>
      <div className="navigations flex justify-between space-x-4">
        <Link to="/home">Home</Link >
        <Link to='/about'>About</Link >
        <Link to='/contact'>Contact</Link >
        <Link to='/getArticles'>Explore</Link>
        <ThemeButton  theme={theme} setTheme={setTheme} />
        <Link to={'/loginPage'}>Login</Link>
      </div>
    </div>
  )
}

export default Header
