import React from 'react'
import { SignUp } from '@clerk/nextjs'

export default function page(){
   return(
    <div className = " sm:h-8 h-64 grid grid-cols-3 gap-4 content-evenly p-8">
        Sign Up
        <SignUp fallbackRedirectUrl='/dashboard'/>
    </div>
   

   )
}