import "./globals.css";
import Nav from '@/components/Nav';
import { UserProvider } from '@/context/UserContext';
import { ReactNode } from 'react';
import { Toaster } from "@/components/ui/toaster";

// Metadata
export const metadata = {
    title: "SMUCode",
    description: ""
};


type RootLayoutProps = {
    children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className="">
            <div className="" />
          </div>
          <main className="">
            <Nav />
            {children}
            <Toaster />
          </main>
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
