import "./globals.css";
import Nav from '@/components/Nav';
import { UserProvider } from '@/context/UserContext';
import { ReactNode } from 'react';
import { Toaster } from "@/components/ui/sonner"
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
          </main>
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
