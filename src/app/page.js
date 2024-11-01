'use client'; // Ensure this is a client component

import React, { useEffect } from "react";
import NavBar from "./Footer/NavBar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Use this for the new App Router

const HaveLoggedIn = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard'); // Redirect to the dashboard
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div>Loading...</div>; // Show loading state while checking auth status
  }

  return <NavBar />;
};

export default HaveLoggedIn;
