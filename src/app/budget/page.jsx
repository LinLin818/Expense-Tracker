'use client';
import React, { useState, useEffect } from 'react';
import CreateBudget from './createBudgets';
import NavBar from '../Footer/NavBar';
import SideNav from '../Footer/sidenav';
import { useUser } from '@clerk/nextjs';
import db from '../../../database/dbconfig';
import { budgets } from '../../../database/schema';
import { eq } from 'drizzle-orm';

const Page = () => {
  const { isLoaded, user } = useUser();
  const [budgetItems, setBudgetItems] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      if (!user) return;

      try {
        const results = await db
          .select({ ...getTableColumns(budgets) })
          .from(budgets)
          .where(eq(budgets.createdBy, user.primaryEmailAddress.emailAddress));
          
        setBudgetItems(results);
      } catch (error) {
        console.error("Failed to fetch budgets:", error);
      }
    };

    fetchBudgets();
  }, [user]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex">
        <SideNav />
      </div>
      <div className="ml-64">
        <NavBar />
        <CreateBudget refreshData={() => {}} budgetItems={budgetItems} />
      </div>
    </>
  );
};

export default Page;
