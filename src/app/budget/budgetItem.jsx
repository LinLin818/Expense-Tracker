'use client'
import React, { useEffect, useState } from 'react'
import db from '../../../database/dbconfig'
import { budgets } from '../../../database/schema'

function budgetItem() {
    const [budgetItem, setbudgetItem] = useState([])
    useEffect(() => {
        const fetchBudget = async () => {
            try{
            const result = await db
            .select()
            .from(budgets)

        setbudgetItem(result)
        }catch(error){
        console.error("failed to fetch data")
    }
    }
    fetchBudget()
}, [])
return(
    <div>
        <h2>Your Budgets</h2>
        <ul>
            {budgetItem.map(budget => (
                <li key={budget.id}>{budget.name}: ${budget.amount}</li>
            ))}
        </ul>
    </div>
)

}
export default budgetItem