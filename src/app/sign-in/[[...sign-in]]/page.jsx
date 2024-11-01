import { SignIn } from "@clerk/nextjs";

export default function page(){
 return(
    <>
    <div className = 'flex justify-center w-full h-16 bg-slate-300 '>
        <h2 className = "m-4">Sign In</h2>
     </div> 
    <div className = "sm:h-8 flex justify-center m-4">
    
        <SignIn fallbackRedirectUrl="dashboard"/>
    </div>
    </>
    
 )
}
