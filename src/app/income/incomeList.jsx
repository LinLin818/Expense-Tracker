'use client'
import { useEffect, useState } from "react";
import db from "../../../database/dbconfig";
import { incomes } from "../../../database/schema";

function IncomeList({className}){
    const [incomeList, setIncomeList] = useState([])
    useEffect(() => {
        const fetchIncome = async () =>{
            try{
                const result = await db
                .select()
                .from(incomes)
                setIncomeList(result)
            }catch(error){
                console.error("Failed to fetch data")
            }
        }
        fetchIncome()
    }, [])
    return(
        <div className = {className}>
            {incomeList.map(income => (
                <li key ={income.id}>{income.name}{income.amount}</li>
            ))}
        </div>
    )

}

export default IncomeList