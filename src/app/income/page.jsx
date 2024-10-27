'use client'
import React from 'react'
import CreateIncome from './createIncome'
import NavBar from '../Footer/NavBar'
import SideNav from '../Footer/sidenav'
import IncomeList from './incomeList'
import { useUser } from '@clerk/nextjs'

 {/* If the website is still fetching data and not completely loaded */}
const page = () => {
  const {isLoaded} = useUser()
  if(!isLoaded){
    return <div>Loading...</div>
  }
  return (
    

    <div>
     <SideNav/>
      
      <NavBar/>
      <CreateIncome/>
      <div className = 'flex justify-end'>
      <IncomeList className = 'text-violet-800'/>
      </div>
      </div>
  )
}

export default page