import React, { useEffect, useState } from 'react';
import db from '../../../database/dbconfig';
import { budgets, expenses } from '../../../database/schema';
import { eq, sql, desc, getTableColumns } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import BarChart from '../charts/graphBar';
import PieChart from '../charts/pieCharts';

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
            totalSpend: sql`COALESCE(sum(${expenses.amount}),0)`.mapWith(Number),
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
      <h2>Your Budgets</h2>
      <ul>
        {budgetItems.length > 0 ? (
          budgetItems.map(budget => (
            <li key={budget.id}>
              {budget.totalBudget}
            </li>
          ))
        ) : (
          [1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
            ></div>
          ))
        )}
      </ul>
      {/* Render the BarChart with budgetItems */}
      <BarChart budgetItems={budgetItems} />
      <PieChart budgetItems={budgetItems} />
    </div>
  );
}

export default BudgetItem;
