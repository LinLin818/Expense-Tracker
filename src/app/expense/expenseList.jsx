'use client'
import { useEffect, useState } from "react";
import db from "../../../database/dbconfig";
import { expenses } from "../../../database/schema";

function ExpenseList({className}){
    const [expenseList, setExpenseList] = useState([])
    useEffect(() => {
        const fetchExpense = async () => {
            try{
                const result = await db
                .select()
                .from(expenses)
                setExpenseList(result)
            }catch(error){
                console.error("Failed to fetch data")
            }
        }
        fetchExpense()
    
    }, [])

return (
    <div  className = {className}>
        <h2>Expense tracker</h2>
        <ul>{expenseList.map(expense => (
            <li key = {expense.id}>{expense.name}</li>
        ))}
            </ul>
    </div>
)
}
export default ExpenseList