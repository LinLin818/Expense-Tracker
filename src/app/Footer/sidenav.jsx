import { Button } from "@mui/material";
import { Activity, Goal, PiggyBankIcon, ReceiptIcon } from "lucide-react";
import Link from "next/link";
import React from 'react';
import { UserButton } from '@clerk/nextjs';

function SideNav({ className }) {
  return (
    <div className={`fixed top-0 left-0 h-screen w-64 m-0 flex flex-col bg-gray-900 text-white shadow-lg ${className}`}>
      {/* User button at the top */}
      {/* <div className="flex justify-center items-center p-4">
        <UserButton 
          appearance={{
            base: {
              width: '100%', // Full width
              height: '100px', // Height
              fontSize: '1rem', // Font size
              borderRadius: '8px', // Round corners
              backgroundColor: '#4A5568', // Background color
              color: 'white', // Text color
            },
            // You can customize hover or active states here
          }} 
          style={{
            width: '100%', // Set full width using inline styles
            height: '100px', // Set height
          }}
        />
      </div>
*/}
      {/* Flex-grow to push content to the bottom */}
      <div className="flex-grow" />

      <div className="flex items-center p-4">
        <PiggyBankIcon className="w-8 h-8 mr-2" />
        <Link href={'/dashboard'}>
          <Button className='w-full text-left'>Dashboard</Button>
        </Link>
      </div>
      <div className="flex items-center p-4">
        <PiggyBankIcon className="w-8 h-8 mr-2" />
        <Link href={'/budget'}>
          <Button className='w-full text-left'>Budget</Button>
        </Link>
      </div>
      <div className="flex items-center p-4">
        <ReceiptIcon className="w-8 h-8 mr-2" />
        <Link href={'/income'}>
          <Button className='w-full text-left'>Income</Button>
        </Link>
      </div>
      <div className="flex items-center p-4">
        <Activity className="w-8 h-8 mr-2" />
        <Link href={'/expense'}>
          <Button className='w-full text-left'>Expense</Button>
        </Link>
      </div>
      <div className="flex items-center p-4">
        <Goal className="w-8 h-8 mr-2" />
        <Link href={'/goal'}>
          <Button className='w-full text-left'>Goals</Button>
        </Link>
      </div>

      <div className="mb-4" /> {/* Optional margin at the bottom */}
    </div>
  );
}

export default SideNav;
