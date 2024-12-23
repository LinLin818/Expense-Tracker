'use client'


import { useUser,UserButton} from "@clerk/nextjs"
import Link from "next/link"
import React from 'react'
import { Button } from "../../components/ui/button"


function NavBar(){
    // If the web is not loaded then return Loading...
    const {isSignedIn, isLoaded} = useUser()
    if(!isLoaded){
        return <div>Loading...</div>
    }
   
  return (
    <div className = "bg-cyan-600 flex p-6 items-center justify-center">
        <div className = 'flex flex-row'>Expense Tracker</div>
    
     {isSignedIn ? (

        <UserButton/>
  
      ) : (
        <div className="flex gap-3 items-center">
            <Link href = '/sign-up'>
            <Button className = "rounded-full" >Sign Up</Button>
            </Link>
            <Link href = '/sign-in'>
            <Button className="rounded-full">Sign in</Button>
            </Link>
        </div>
      )}
   
   </div>
  )
}

export default NavBar