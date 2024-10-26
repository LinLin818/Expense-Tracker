import React from 'react'
import NavBar from '../Footer/NavBar'

import { Button } from '../../components/ui/button'
import Link from 'next/link'
const dashboard = () => {
  return (
    <div className = "text-3xl text-violet-400 bg-slate-500">
      
      <NavBar/>
      Welcome to the dashboard
      <Link href = '/budget'>
      <Button className = "bg-lime-400">Budgets</Button>
      </Link>
      </div>
  )
}

export default dashboard