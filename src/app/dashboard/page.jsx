import React from 'react'
import NavBar from '../Footer/NavBar'
import SideNav from '../Footer/sidenav'
const dashboard = () => {
  return (
    <div className = "text-2xl text-violet-400">
      <SideNav/>
      <NavBar/>
      <h2 className = 'flex justify-center'>Welcome to the dashboard</h2>
      
      </div>
  )
}

export default dashboard