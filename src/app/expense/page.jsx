import React from 'react'
import TransitionsModal from './createExpense'
import NavBar from '../Footer/NavBar'

const page = () => {
  return (
    <div>
        <NavBar/>
        <TransitionsModal/>
        <expenseList/>
        </div>
  )
}

export default page