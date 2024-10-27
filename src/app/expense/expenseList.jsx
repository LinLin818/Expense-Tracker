'use client'
import { useEffect } from "react";
import db from "../../../database/dbconfig";
import { expenses } from "../../../database/schema";

function expenseList(){
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
    <div>
        <h2>Expense tracker</h2>
        <ul>{expenseList.map(expense => (
            <li>{expense.name}</li>
        ))}
            </ul>
    </div>
)
}
export default expenseList