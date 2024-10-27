import React from 'react'
import TransitionsModal from './createBudgets'
import NavBar from '../Footer/NavBar'
import BudgetManager from './budgetItem'

const page = () => {
  return (
    <div>
  
    <NavBar/>
    <TransitionsModal/>
    <BudgetManager/>

    </div>
  )
}

export default page