
import React from "react";
import { Bell, MessageSquare, Wallet } from "lucide-react";

interface HeaderProps {
  title: string; // dynamic prop for the heading text
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#FEFEFF] border-b border-[#DBDBE3] shadow-sm">
      <h1 className="text-2xl font-bold">{title}</h1>

      <div className="flex items-center space-x-4">
        <Bell className="h-5 w-5 text-gray-500 dark:text-gray-500" />
        <MessageSquare className="hidden md:flex h-5 w-5 text-gray-500 dark:text-gray-500" />
      </div>
    </header>
  );
};

export default Header;
