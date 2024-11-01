'use client'
import React from 'react'
import CreateBudget from './createBudgets'
import NavBar from '../Footer/NavBar'
import SideNav from '../Footer/sidenav'
import { useUser } from '@clerk/nextjs'

const Page = () => {
  const { isLoaded } = useUser();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="flex">
      <SideNav/>
      </div>
      <div className="ml-64"> {/* Adjust margin as per SideNav width */}
        <NavBar />
        <CreateBudget />
   
    </div>
    </>
  );
}

export default Page;
