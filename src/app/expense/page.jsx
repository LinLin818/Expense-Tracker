'use client'
import React from 'react'
import ExpenseList from './expenseList'
import NavBar from '../Footer/NavBar'
import SideNav from '../Footer/sidenav'
import { useUser } from '@clerk/nextjs'

 {/* If the website is still fetching data and not completely loaded */}
const page = () => {
  const {isLoaded} = useUser()
  if(!isLoaded){
    return <div>Loading...</div>
  }
  return (
    <div>
        <h2 className = "text-3xl text-teal-300">
        Welcome to the expense section
        </h2>
        <SideNav/>
        <NavBar/>
        <div className='flex justify-end'>
        <ExpenseList className = "text-violet-600"/>
        </div>
        
        </div>
  )
}

export default page