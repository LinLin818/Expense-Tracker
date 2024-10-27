import { Button } from "@mui/material";
import { Activity, PiggyBankIcon, ReceiptIcon } from "lucide-react";
import Link from "next/link";

import React from 'react'


const SideNav = () => {
  return (

    <div className='fixed top-0 left-0 h-screen w-64 m-0 flex flex-col bg-gray-900 text-white shadow-lg'>
    <div>
        <PiggyBankIcon className='w-8 h-12'/>
        <Link href={'/dashboard'}>
            <Button className='bg-gray-500'>Dashboard</Button>
        </Link>
    </div>
    <div>
        <PiggyBankIcon className='w-8 h-12'/>
        <Link href={'/budget'}>
            <Button className='bg-gray-500'>Budget</Button>
        </Link>
    </div>
    <div>
        <ReceiptIcon className='w-8 h-12'/>
        <Link href={'/income'}>
            <Button className='bg-gray-500'>Income</Button>
        </Link>
    </div>
    <div>
        <Activity className='w-8 h-12'/>
        <Link href={'/expense'}>
            <Button className='bg-gray-500'>Expense</Button>
        </Link>
    </div>
</div>

  )
}

export default SideNav