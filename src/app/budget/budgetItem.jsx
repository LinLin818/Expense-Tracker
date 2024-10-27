'use client';
import React, { useEffect, useState } from 'react';
import db from '../../../database/dbconfig';
import { budgets, expenses } from '../../../database/schema';
import { eq, sql, desc, getTableColumns } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import CreateBudget from './createBudgets';

function BudgetItem({ className }) {
    const [budgetItems, setBudgetItems] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchBudgets = async () => {
            if (!user) return; 
            try {
                const results = await db
                    .select({
                        ...getTableColumns(budgets),
                        totalSpend: sql`COALESCE(sum(${expenses.amount}),0)`.mapWith(Number),
                        totalItem: sql`count(${expenses.id})`.mapWith(Number)

                    })
                    .from(budgets)
                    .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
                    .where(eq(budgets.createdBy, user.primaryEmailAddress.emailAddress))
                    .groupBy(budgets.id)
                    .orderBy(desc(budgets.id));

                setBudgetItems(results);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchBudgets();
    }, [user]); // Re-fetch when the user changes

    return (
        <div className={className}>
            <h2>Your Budgets</h2>
            
            <CreateBudget refreshData={() => setBudgetItems([])} /> {/* Refresh budget list after creating */}
            <ul>
                {budgetItems.length > 0 ? (
                    budgetItems.map(budget => (
                        <li key={budget.id}>
                            {budget.name}: ${budget.amount}<br/>(Total Spend: ${budget.totalSpend || 0})(Total Item: ${budget.totalItem || 0})
                        </li>
                    ))
                ) : (
                    [1, 2, 3, 4, 5].map((item, index) => (
                        <div
                            key={index}
                            className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
                        ></div>
                    ))
                )}
            </ul>
        </div>
    );
}

export default BudgetItem;
