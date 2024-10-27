'use client'
import React, { useState } from 'react'
import NavBar from '../Footer/NavBar'
import SideNav from '../Footer/sidenav'
import ExpenseList from '../expense/expenseList'
import IncomeList from '../income/incomeList'
import BudgetItem from '../budget/budgetItem'

const dashboard = () => {
  const [totalSpend, setTotalSpend] = useState(0)
  const handleTotalSpend = (total) => {
    setTotalSpend(total)
  }
  const [totalEarn, setTotalEarn] = useState(0)
  const getIncomeList = (total) => {
    setTotalEarn(total)
  }
  const [totalBudget, setTotalBudget] = useState(0)
  const getTotalBudget = (total) => {
    setTotalBudget(total)

  
  
  }
  return (
    <div className = "text-2xl text-violet-400">
      <SideNav/>
      <NavBar/>
      <h2 className = 'flex justify-center'>Welcome to the dashboard</h2>
      <h3 className = "text-xl flex justify-center text-stone-950">
        Total Spending: ${totalSpend}<br/>
        Total Earn: ${totalEarn}<br/>
        Total Budget: ${totalBudget}<br/>
  
       
      </h3>
      <div className = "flex justify-end">
      <ExpenseList className ="" onTotalSpend = {handleTotalSpend}/>
        <IncomeList className = "" getIncomeList = {getIncomeList}/>
        <BudgetItem className = "" getTotalBudget = {getTotalBudget}/>
      </div>
      </div>
  )
}

export default dashboard