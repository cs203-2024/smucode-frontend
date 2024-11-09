import "./globals.css";
import Nav from '@/components/Nav';
import { UserProvider } from '@/context/UserContext';
import { ReactNode } from 'react';
import { Toaster } from "@/components/ui/sonner"
import { Toaster as Toaster2 } from "@/components/ui/toaster";
import { Poppins } from 'next/font/google'

// Metadata
export const metadata = {
    title: "BrawlCode",
    description: "",
    icons: {
      icon: '/favicon/favicon.png'
    },
};


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
  display: 'swap',
})

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
          <main className={poppins.className}>
            <Nav />
            {children}
            <Toaster richColors closeButton theme="light"/>
          </main>
          <Toaster2 />
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
