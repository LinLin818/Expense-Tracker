'use client'
import React from 'react'
import CreateBudget from './createBudgets'
import NavBar from '../Footer/NavBar'
import SideNav from '../Footer/sidenav'
import BudgetItem from './budgetItem'
import { useUser } from '@clerk/nextjs'

const page = () => {
   {/* If the website is still fetching data and not completely loaded */}
   const {isLoaded} = useUser()
   if(!isLoaded){
    return <div> Loading... </div>
   }
  return (
    <div>
    <SideNav/>
    <NavBar/>
    <CreateBudget/>
    <div className ="flex justify-end">
    <BudgetItem className = "text-violet-700"/>
    </div>
    </div>
  )
}

export default page