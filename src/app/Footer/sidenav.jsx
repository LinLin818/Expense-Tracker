import { Button } from "@mui/material";
import { Activity, Goal, PiggyBankIcon, ReceiptIcon } from "lucide-react";
import Link from "next/link";
import React from 'react';

function SideNav({ className }) {
  return (
    <div className={`fixed top-0 left-0 h-screen w-64 m-0 flex flex-col bg-gray-900 text-white shadow-lg ${className}`}>
      <div>

     {/* <PiggyBankIcon className = "w-8 h-12"></PiggyBankIcon>*/}
        <Link href={'/dashboard'}>
          <Button className='left-4 top-80'>Dashboard</Button>
        </Link>
      </div>
      <div>

        <Link href={'/budget'}>
          <Button className='left-4 top-80'>Budget</Button>
        </Link>
      </div>
      <div>
      
        <Link href={'/income'}>
          <Button className='left-4 top-80'>Income</Button>
        </Link>
      </div>
      <div>
      
        <Link href={'/expense'}>
          <Button className='left-4 top-80'>Expense</Button>
        </Link>
      </div>
      <div>

        <Link href={'/goal'}>
        
          <Button className="left-4 top-80">Goals</Button>
        </Link>
      </div>
    </div>
  );
}

export default SideNav;
