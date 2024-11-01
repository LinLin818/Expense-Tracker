'use client'
import React from 'react'
import ExpenseList from './expenseList'
import NavBar from '../Footer/NavBar'
import SideNav from '../Footer/sidenav'
import { useUser } from '@clerk/nextjs'
import CreateExpense from './createExpense'
 {/* If the website is still fetching data and not completely loaded */}
const page = () => {
  const {isLoaded} = useUser()
  if(!isLoaded){
    return <div>Loading...</div>
  }
  return (
    <>
    <div className = 'flex'>
      
        <SideNav/>
    </div>
    <div className = 'ml-64'>
        <NavBar/>
        <CreateExpense/>
        <div className='flex justify-end'>
        <ExpenseList className = "text-violet-600"/>
        </div>
        </div>
        

      </>
  )
}

export default page