'use client'
import { useEffect, useState } from "react";
import db from "../../../database/dbconfig";
import { expenses } from "../../../database/schema";
import { getTableColumns, sql } from "drizzle-orm";

function ExpenseList({className,onTotalSpend}){
    const [expenseList, setExpenseList] = useState([])
   
    useEffect(() => {
        const fetchExpense = async () => {
            try{
                const result = await db
                .select({
                    ...getTableColumns(expenses),
                    totalSpend:sql`sum(${expenses.amount})`.mapWith(Number)

                })
                .from(expenses)
                .groupBy(expenses.id)
                
              

                const totalSpend = result.reduce((acc, expense) => acc + (expense.totalSpend || 0),0)
                setExpenseList(result)
                onTotalSpend(totalSpend)
            }catch(error){
                console.error("Failed to fetch data", error) 
            }
        }
        fetchExpense()
    
    }, [onTotalSpend])

return (
    <div  className = {className}>

        <ul>{expenseList.map(expense => (
            <li key = {expense.id}>{expense.name}{expense.amount}</li>
        ))}
            </ul>
           
    </div>
)
}
export default ExpenseList