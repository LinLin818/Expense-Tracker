'use client';
import { useEffect, useState } from "react";
import db from "../../../database/dbconfig";
import { incomes } from "../../../database/schema";
import { getTableColumns, sql, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";

function IncomeList({ className, onTotalRevenue }) {
    const [incomeList, setIncomeList] = useState([]);
    const {user} = useUser()
    useEffect(() => {
        const fetchIncome = async () => {
            try {
                const result = await db
                    .select({
                        ...getTableColumns(incomes),
                        totalEarn: sql`sum(${incomes.amount})`.mapWith(Number)
                    })
                    .from(incomes)
                    .groupBy(incomes.id) // Group by income ID or other relevant columns
                    .where(eq(incomes.createdBy, user.primaryEmailAddress.emailAddress))
             

                // Calculate total earnings
                const totalEarn = result.reduce((acc, income) => acc + (income.totalEarn || 0), 0); // Use totalEarn
                setIncomeList(result);
                onTotalRevenue(totalEarn); // Pass total earnings to parent component
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchIncome();
    }, [onTotalRevenue]);

    return (
        <div className={className}>
        
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
