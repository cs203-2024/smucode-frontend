import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import { TournamentIdProvider } from "@/context/TournamentIdContext"; 
import "../../globals.css";  


type LayoutProps = {
  children: ReactNode;
};

const TournamentLayout = ({ children }: LayoutProps) => {
  return (
    <TournamentIdProvider> 
      <div className="flex h-screen pt-[60px] overflow-hidden w-full bg-slate-50">
        <Sidebar />
        <div className="flex flex-col w-full h-full ml-64 p-4">
          {children}
        </div>
      </div>
    </TournamentIdProvider>
  );
};

export default TournamentLayout;
