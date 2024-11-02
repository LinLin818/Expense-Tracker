'use client'
import { useEffect, useState } from "react";
import db from "../../../database/dbconfig";
import { expenses } from "../../../database/schema";
import { getTableColumns, sql, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";

function ExpenseList({className,onTotalSpend}){
    const [expenseList, setExpenseList] = useState([])
    const {user} = useUser()
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
                .where(eq(expenses.createdBy, user.primaryEmailAddress.emailAddress))
                
              

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
            <li key = {expense.id}>{expense.name}: ${expense.amount}</li>

        ))}
            </ul>
           
    </div>
)
}
export default ExpenseList