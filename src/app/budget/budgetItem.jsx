'use client'
import React, { useEffect, useState } from 'react';
import db from '../../../database/dbconfig';
import { budgets, expenses } from '../../../database/schema';
import { eq, sql, desc, getTableColumns } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import BarChart from '../charts/graphBar'
import PieChart from '../charts/pieCharts'
function BudgetItem({ className, getTotalBudget }) {
  const [budgetItems, setBudgetItems] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchBudgets = async () => {
      if (!user) return; 
      try {
        const results = await db
          .select({
            ...getTableColumns(budgets),
            totalBudget: sql`sum(${budgets.amount})`.mapWith(Number),
            totalSpend: sql`COALESCE(sum(${expenses.amount}), 0)`.mapWith(Number),
            totalItem: sql`count(${expenses.id})`.mapWith(Number)
          })
          .from(budgets)
          .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
          .where(eq(budgets.createdBy, user.primaryEmailAddress.emailAddress))
          .groupBy(budgets.id)
          .orderBy(desc(budgets.id));
        
        const totalBudget = results.reduce((acc, budget) => acc + (budget.totalBudget || 0), 0);
        setBudgetItems(results);
        getTotalBudget(totalBudget);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchBudgets();
  }, [user, getTotalBudget]);

  return (
    <div className={className}>
      
      <ul>{budgetItems.map(budget => (
            <li key={budget.id}>{budget.name}: 
              ${budget.totalBudget.toFixed(2)}
            </li>
          ))}
      </ul>
      <BarChart budgetItems={budgetItems} /> {/* Pass the budgetItems prop */}
      <PieChart budgetItems={budgetItems}/>
    </div>
  );
}

export default BudgetItem;
