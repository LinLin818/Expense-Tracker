
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  title: "Budget Tracker",
  description: "Manage your budget effectively",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey = {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <html lang="en">

      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
