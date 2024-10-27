'use client'
import React, { useState } from 'react'
import NavBar from '../Footer/NavBar'
import SideNav from '../Footer/sidenav'
import ExpenseList from '../expense/expenseList'

const dashboard = () => {
  const [totalSpend, setTotalSpend] = useState(0)
  const handleTotalSpend = (total) => {
    setTotalSpend(total)
  }
  return (
    <div className = "text-2xl text-violet-400">
      <SideNav/>
      <NavBar/>
      <h2 className = 'flex justify-center'>Welcome to the dashboard</h2>
      <h3 className = "flex justify-center text-stone-950">
        Total Spending: ${totalSpend}
        <ExpenseList className ="" onTotalSpend = {handleTotalSpend}/>
      </h3>
      </div>
  )
}

export default dashboard