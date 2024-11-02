import React from 'react'
import SideNav from '../Footer/sidenav'
import NavBar from '../Footer/NavBar'
import InputGoal from './inputGoal'
const page = () => {
  return (
   
    <div>
        <SideNav/>
        <div className = "ml-64">
        <NavBar/>
        <InputGoal/>
        </div>
    </div>
  )
}

export default page