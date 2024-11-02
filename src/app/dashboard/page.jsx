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
      <div className = "ml-64">
      <NavBar />
      
      <h2 className = 'flex justify-center'>Welcome to the dashboard</h2>
      <div className="flex justify-center w-full mb-4"> {/* Centered and full width */}
        <div className="bg-slate-200 p-10 rounded-2xl border-2 border-dashed hover:shadow-md w-full max-w-lg"> {/* Full width and responsive max-width */}
          Total Spending: ${totalSpend}<br />
          Total Earn: ${totalEarn}<br />
          Total Budget: ${totalBudget}<br />
        </div>
      </div>
      <h2 className = 'flex justify-center'>Expense List</h2>
      <div className = "flex justify-center w-full mb-4">
        <ExpenseList className ="bg-slate-200 p-10 rounded-2xl border-2 border-dashed hover:shadow-md w-full max-w-lg  justify-end"  onTotalSpend = {handleTotalSpend}/>
        </div>
        <h2 className = 'flex justify-center'>Income List</h2>
      <div className = 'flex justify-center w-full mb-4'>
        <IncomeList className = "bg-slate-200 p-10 rounded-2xl border-2 border-dashed hover:shadow-md w-full max-w-lg justify-end" onTotalRevenue = {getIncomeList}/>
      </div>
      <h2 className = 'flex justify-center'>Your Budget</h2>
      <div className = 'flex justify-center w-full mb-4'>
      <BudgetItem className = "bg-slate-200 p-10 rounded-2xl border-2 border-dashed hover:shadow-md w-full max-w-lg justify-end" getTotalBudget = {getTotalBudget}/>
        </div>
       
        </div>
      </div>
  )
}

export default dashboard