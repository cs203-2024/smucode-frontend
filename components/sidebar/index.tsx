"use client";
import {
  LucideIcon,
  LayoutDashboard,
  Braces,
  Users,
  Settings,
} from "lucide-react";
import SidebarItem from "./item";

interface ISidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const items: ISidebarItem[] = [
  {
    name: "Overview",
    path: "overview",
    icon: LayoutDashboard,
  },
  {
    name: "Brackets",
    path: "brackets",
    icon: Braces,
  },
  {
    name: "Participants",
    path: "participants",
    icon: Users,
  },
  {
    name: "Settings",
    path: "settings",
    icon: Settings,
    // items: [
    //   {
    //     name: "General",
    //     path: "settings",
    //   },
    //   {
    //     name: "Notifications",
    //     path: "settings/notifications",
    //   },
    // ],
  },
];

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-10 p-4 pt-[100px]">
      <div className="flex flex-col space-y-10 w-full">
        <div className="flex flex-col space-y-2">
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;