'use client';
import { useEffect, useState } from "react";
import db from "../../../database/dbconfig";
import { incomes } from "../../../database/schema";
import { getTableColumns, sql } from "drizzle-orm";

function IncomeList({ className, getIncomeList }) {
    const [incomeList, setIncomeList] = useState([]);

    useEffect(() => {
        const fetchIncome = async () => {
            try {
                const result = await db
                    .select({
                        ...getTableColumns(incomes),
                        totalEarn: sql`sum(${incomes.amount})`.mapWith(Number)
                    })
                    .from(incomes)
                    .groupBy(incomes.id); // Group by income ID or other relevant columns
                
             

                // Calculate total earnings
                const totalEarn = result.reduce((acc, income) => acc + (income.totalEarn || 0), 0); // Use totalEarn
                setIncomeList(result);
                getIncomeList(totalEarn); // Pass total earnings to parent component
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchIncome();
    }, [getIncomeList]);

    return (
        <div className={className}>
            <h2>Income List</h2>
            <ul>
                {incomeList.map(income => (
                    <li key={income.id}>
                        {income.name}: ${income.amount} {/* Display income name and amount */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default IncomeList;
